import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { DishActions } from '../../features/restaurants/store/restaurant.actions';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    actualOrderId: BehaviorSubject<number> = new BehaviorSubject<number>(-1);

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
}
