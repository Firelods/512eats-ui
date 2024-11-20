import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Restaurant } from '../store/restaurant.model';

@Injectable({
    providedIn: 'root',
})
export class RestaurantService {
    private apiUrl = 'https://api.example.com/restaurants';

    constructor(private http: HttpClient) {}

    getRestaurants(): Observable<Restaurant[]> {
        return this.http.get<Restaurant[]>(this.apiUrl);
    }
}
