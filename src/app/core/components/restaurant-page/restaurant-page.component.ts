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
        dishPictureURLListSample: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWwNz-YV88e3LFP6iisBcZT-loky1VotV4aQ&s', 'https://assets.afcdn.com/recipe/20211214/125831_w1024h1024c1cx866cy866cxt0cyt292cxb1732cyb1732.jpg'],
    }
    dishes = [
        {
            name: 'Margherita Pizza',
            description: 'Classic pizza with tomato sauce, mozzarella, and basil.',
            price: '$9',
            time: '5 min',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWwNz-YV88e3LFP6iisBcZT-loky1VotV4aQ&s',
        },
        {
            name: 'Spaghetti Carbonara',
            description: 'Traditional pasta with eggs, cheese, pancetta, and pepper.',
            price: '$12',
            time: '7 min',
            image: 'https://assets.afcdn.com/recipe/20211214/125831_w1024h1024c1cx866cy866cxt0cyt292cxb1732cyb1732.jpg',
        },
        // Ajouter plus de plats ici
    ];
}
