import { Component } from '@angular/core';
import { Restaurant } from '../../../features/restaurants/store/restaurant.model';

@Component({
    selector: 'app-restaurant-page',
    templateUrl: './restaurant-page.component.html',
    styleUrl: './restaurant-page.component.scss',
})
export class RestaurantPageComponent {
    restaurant:Restaurant = {
        id: 1,
        name: 'La Bella Italia',
        openTime: '11:00',
        closeTime: '22:00',
        foodTypeList: ['Italian'],
        averagePrice: 2,
        description: 'Delicious Italian cuisine with a modern twist.',
        dishPictureURLListSample: ['pizza-margherita.jpg', 'pates-carbonara.jpg'],
    }
    dishes = [
        {
            name: 'Margherita Pizza',
            description: 'Classic pizza with tomato sauce, mozzarella, and basil.',
            price: '$9',
            time: '5 min',
            image: 'pizza-margherita.jpg',
        },
        {
            name: 'Spaghetti Carbonara',
            description: 'Traditional pasta with eggs, cheese, pancetta, and pepper.',
            price: '$12',
            time: '7 min',
            image: 'pates-carbonara.jpg',
        },
        // Ajouter plus de plats ici
    ];
}
