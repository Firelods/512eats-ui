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

    constructor(private http: HttpClient, private snackBar: MatSnackBar, private store: Store) {}

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
                console.log(
                    'Dispatching loadAvailableDishes action with restaurantId: and orderId:',
                    restaurantId,
                    orderId
                );

                this.store.dispatch(DishActions.loadAvailableDishes({ restaurantId, orderId }));

                this.openSnackBar('Sub-order created id :' + orderId, 'Close');
            });
    }

    openSnackBar(message: string, action: string = 'OK', duration: number = 3000): void {
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
                this.subOrder.next({
                    ...response,
                    dishes: this.groupDishesWithQuantity(response.dishes),
                });
            },
            error: (err) => {
                // this.error = 'Failed to load suborder';
                console.error(err);
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
        this.http
            .post(`${environment.apiUrl}/orders/add-dish`, {
                orderId: this.subOrder.value.id,
                dishId,
            })
            .subscribe(() => {
                this.loadSubOrder(this.subOrder.value.id);
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
}
