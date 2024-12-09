import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Restaurant } from '../../../features/restaurants/store/restaurant.model';
import { Store } from '@ngrx/store';
import { filter, map, Observable } from 'rxjs';
import { selectAll } from '../../../features/restaurants/store/restaurant.reducer';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-restaurant-page',
    templateUrl: './restaurant-page.component.html',
    styleUrl: './restaurant-page.component.scss',
})
export class RestaurantPageComponent {
    $restaurant: Observable<Restaurant>;
    dishes = [
        {
            quantity: 0,
            name: 'Margherita Pizza',
            description: 'Classic pizza with tomato sauce, mozzarella, and basil.',
            price: '$9',
            time: '5 min',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWwNz-YV88e3LFP6iisBcZT-loky1VotV4aQ&s',
        },
        {
            quantity: 0,
            name: 'Spaghetti Carbonara',
            description: 'Traditional pasta with eggs, cheese, pancetta, and pepper.',
            price: '$12',
            time: '7 min',
            image: 'https://assets.afcdn.com/recipe/20211214/125831_w1024h1024c1cx866cy866cxt0cyt292cxb1732cyb1732.jpg',
        },
        // Ajouter plus de plats ici
    ];

    constructor(private router: Router, private store: Store, private route: ActivatedRoute) {
        const idParam = this.route.snapshot.paramMap.get('id');
        if (idParam === null) {
            this.router.navigate(['/']);
            throw new Error('Restaurant ID is missing in the route parameters');
        }
        const id = parseInt(idParam);
        this.$restaurant = this.store.select(selectAll).pipe(
            map((restaurants) => restaurants.find((restaurant) => restaurant.id === id)),
            filter((restaurant): restaurant is Restaurant => restaurant !== undefined)
        );
    }

    goToHomePage() {
        this.router.navigate(['/']);
    }

    goToCartPage() {
        this.router.navigate(['/cart']);
    }

    increaseQuantity(item: any) {
        item.quantity++;
    }

    decreaseQuantity(item: any) {
        if (item.quantity > 0) {
            item.quantity--;
        }
    }
}
