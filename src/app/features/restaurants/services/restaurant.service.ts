import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Restaurant } from '../store/restaurant.model';
import { Dish } from '../store/dish.model';
import { environment } from '../../../../environment';
@Injectable({
    providedIn: 'root',
})
export class RestaurantService {
    constructor(private http: HttpClient) {}

    getRestaurants(): Observable<Restaurant[]> {
        return this.http.get<Restaurant[]>(environment.apiUrl + '/restaurants');
    }

    getAvailableDishes(orderId: number): Observable<Dish[]> {
        return this.http.get<Dish[]>(
            `${environment.apiUrl}/orders/available-dishes?order-id=${orderId}`
        );
    }

    getAllDishesFromRestaurant(restaurantId: number): Observable<Dish[]> {
        return this.http.get<Dish[]>(`${environment.apiUrl}/dishes?restaurant-id=${restaurantId}`);
    }
}
