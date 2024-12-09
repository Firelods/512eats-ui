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
        return of([
            {
                id: 1,
                name: 'Margherita Pizza',
                description: 'Classic pizza with tomato sauce, mozzarella, and basil.',
                price: 9,
                preparationTime: 5,
                pictureURL:
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWwNz-YV88e3LFP6iisBcZT-loky1VotV4aQ&s',
            },
            {
                id: 2,
                name: 'Spaghetti Carbonara',
                description: 'Traditional pasta with eggs, cheese, pancetta, and pepper.',
                price: 12,
                preparationTime: 7,
                pictureURL:
                    'https://assets.afcdn.com/recipe/20211214/125831_w1024h1024c1cx866cy866cxt0cyt292cxb1732cyb1732.jpg',
            },
        ]);
    }

    getAllDishesFromRestaurant(restaurantId: number): Observable<Dish[]> {
        return this.http.get<Dish[]>(`${environment.apiUrl}/dishes?restaurant-id=${restaurantId}`);
    }
}
