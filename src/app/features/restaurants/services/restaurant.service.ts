import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Restaurant } from '../store/restaurant.model';

@Injectable({
    providedIn: 'root',
})
export class RestaurantService {
    private apiUrl = 'https://api.example.com/restaurants';

    constructor(private http: HttpClient) {}

    getRestaurants(): Observable<Restaurant[]> {
        // return this.http.get<Restaurant[]>(this.apiUrl);
        return of([
            {
                id: 1,
                name: 'La Bella Italia',
                openTime: '11:00',
                closeTime: '22:00',
                foodTypeList: ['Italian'],
                averagePrice: 2,
                description: 'Delicious Italian cuisine with a modern twist.',
                dishPictureURLListSample: [
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWwNz-YV88e3LFP6iisBcZT-loky1VotV4aQ&s',
                    'https://assets.afcdn.com/recipe/20211214/125831_w1024h1024c1cx866cy866cxt0cyt292cxb1732cyb1732.jpg',
                ],
            },
            {
                id: 2,
                name: 'Sushi Palace',
                openTime: '12:00',
                closeTime: '23:00',
                foodTypeList: ['Japanese', 'Sushi'],
                averagePrice: 3,
                description: 'Authentic Japanese sushi made with fresh ingredients.',
                dishPictureURLListSample: [
                    'https://japanathome.fr/cdn/shop/articles/sushi-2853382_1920.jpg?v=1586628738&width=2048',
                    'https://www.academiedugout.fr/images/50789/1200-686/10023-nigiri-sushi.jpg?poix=50&poiy=500',
                    'https://www.kikkoman.fr/fileadmin/_processed_/a/d/csm_945-recipe-page-gunkan-maki-sushi-with-prawn-cucumber_desktop_4f0532822c.jpg',
                ],
            },
        ]);
    }
}
