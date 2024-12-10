import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { DishActions } from '../../features/restaurants/store/restaurant.actions';
import { DishWithQuantity, SubOrder } from '../../features/restaurants/store/suborder.model';
import { Dish } from '../../features/restaurants/store/dish.model';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    actualGroupOrderId: BehaviorSubject<number> = new BehaviorSubject<number>(-1);
    actualOrderId: BehaviorSubject<number> = new BehaviorSubject<number>(-1);
    subOrder: BehaviorSubject<SubOrder> = new BehaviorSubject<SubOrder>({
        id: -1,
        restaurantId: -1,
        dishes: [],
        status: 'CREATED',
        userId: -1,
        deliveryDateTime: null,
        placedDate: null,
        price: 0,
        payment: null,
    });

    constructor(private http: HttpClient, private snackBar: MatSnackBar, private store: Store) {
        this.actualGroupOrderId.subscribe((groupOrderId) => {
            if (groupOrderId == -1) {
                return;
            }
            console.log('Saving groupOrderId:', groupOrderId);
            localStorage.setItem('groupOrderId', groupOrderId.toString());
        });
        let groupOrderId = localStorage.getItem('groupOrderId');
        if (groupOrderId !== null) {
            this.actualGroupOrderId.next(parseInt(groupOrderId));
        }
        let orderId = localStorage.getItem('orderId');
        if (orderId !== null) {
            this.actualOrderId.next(parseInt(orderId));
        }
        this.actualOrderId.subscribe((orderId) => {
            if (orderId == -1) {
                return;
            }
            console.log('Saving orderId:', orderId);
            localStorage.setItem('orderId', orderId.toString());
        });
    }

    createIndividualOrder(): void {
        this.actualOrderId.next(1);
    }

    createSubOrder(groupOrderId: number, restaurantId: number): void {
        this.http
            .post<number>(`${environment.apiUrl}/orders/sub-order`, {
                registeredUserID: 1,
                restaurantId,
                groupOrderId,
            })
            .subscribe((orderId) => {
                this.actualOrderId.next(orderId);
                this.actualGroupOrderId.next(groupOrderId);
                console.log(
                    'Dispatching loadAvailableDishes action with restaurantId: and orderId:',
                    restaurantId,
                    orderId
                );
                this.loadSubOrder(orderId);

                this.store.dispatch(DishActions.loadAvailableDishes({ restaurantId, orderId }));

                this.openSnackBar('Sub-order created id :' + orderId, 'Close');
            });
    }

    public openSnackBar(message: string, action: string = 'OK', duration: number = 3000): void {
        this.snackBar.open(message, action, {
            duration: duration, // Durée en millisecondes
            horizontalPosition: 'center', // Position horizontale (start, center, end, left, right)
            verticalPosition: 'bottom', // Position verticale (top, bottom)
        });
    }

    createGroupOrder(deliveryLocationId: number = 0, deliveryDateTime: Date) {
        // must format deliveryDateTime like [2025,1,1,12,50]
        console.log('deliveryDateTime:', deliveryDateTime);

        const formattedDate =
            '[' +
            [
                deliveryDateTime.getFullYear(),
                deliveryDateTime.getMonth() + 1, // Les mois commencent à 0 en JavaScript, donc on ajoute 1
                deliveryDateTime.getDate(),
                deliveryDateTime.getHours(),
                deliveryDateTime.getMinutes(),
            ].join(',') +
            ']';
        return this.http.post<number>(
            `${environment.apiUrl}/group-orders?delivery-location-id=${deliveryLocationId}&delivery-date-time=${formattedDate}`,
            {}
        );
    }

    switchActualOrder(orderId: number): void {
        this.actualOrderId.next(orderId);
    }

    getSubOrder(orderId: number): Observable<SubOrder> {
        return this.http.get<SubOrder>(
            `${environment.apiUrl}/orders/get/sub-order?order-id=${orderId}`
        );
    }

    loadSubOrder(orderId: number) {
        this.getSubOrder(orderId).subscribe({
            next: (response) => {
                console.log('SubOrder:', response);

                response.groupOrderId = this.actualGroupOrderId.value;
                this.subOrder.next({
                    ...response,
                    dishes: this.groupDishesWithQuantity(response.dishes),
                });
            },
            error: (err) => {
                console.error(err);
                this.openSnackBar('Failed to load sub-order. Please try again.', 'Close');
            },
        });
    }
    groupDishesWithQuantity(dishes: Dish[]): DishWithQuantity[] {
        const dishMap: { [id: number]: DishWithQuantity } = {};

        dishes.forEach((dish) => {
            if (dishMap[dish.id]) {
                dishMap[dish.id].quantity++;
            } else {
                dishMap[dish.id] = { ...dish, quantity: 1 };
            }
        });

        return Object.values(dishMap);
    }

    addDishToSubOrder(dishId: number): void {
        if (this.subOrder.value.id === -1) {
            console.error('No sub-order id');
            this.openSnackBar('No sub-order id to add dish', 'Close');
            return;
        }
        this.http
            .post(`${environment.apiUrl}/orders/add-dish`, {
                orderId: this.subOrder.value.id,
                dishId,
            })
            .subscribe({
                next: () => {
                    this.store.dispatch(
                        DishActions.loadAvailableDishes({
                            restaurantId: this.subOrder.value.restaurantId,
                            orderId: this.subOrder.value.id,
                        })
                    );

                    this.loadSubOrder(this.subOrder.value.id);
                },
                error: (err) => {
                    console.error(err);
                    this.openSnackBar(
                        'Failed to add dish to sub-order. Please try again.',
                        'Close'
                    );
                },
            });
    }

    removeDishFromSubOrder(dishId: number): void {
        this.http
            .post(`${environment.apiUrl}/orders/remove-dish`, {
                orderId: this.actualOrderId.value,
                dishId,
            })
            .subscribe(() => {
                this.loadSubOrder(this.actualOrderId.value);
            });
    }

    paySubOrder(userId: number = 1) {
        return this.http.post(`${environment.apiUrl}/orders/pay`, {
            orderId: this.subOrder.value.id,
            registeredUserID: userId,
        });
    }

    placeGroupOrder() {
        if (!this.subOrder.value.groupOrderId) {
            console.error('No group order id');
            this.openSnackBar('No group order id to place', 'Close');
            return;
        }
        return this.http.post<number>(
            `${environment.apiUrl}/group-orders/place/${this.subOrder.value.groupOrderId}`,
            {
                orderId: this.subOrder.value.id,
            }
        );
    }

    resetOrder(): void {
        this.actualOrderId.next(-1);
        this.actualGroupOrderId.next(-1);
        this.subOrder.next({
            id: -1,
            restaurantId: -1,
            dishes: [],
            status: 'CREATED',
            userId: -1,
            deliveryDateTime: null,
            placedDate: null,
            price: 0,
            payment: null,
        });
        localStorage.removeItem('orderId');
        localStorage.removeItem('groupOrderId');
    }
}
