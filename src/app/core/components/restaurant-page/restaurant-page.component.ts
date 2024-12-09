import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Restaurant } from '../../../features/restaurants/store/restaurant.model';
import { Store } from '@ngrx/store';
import { filter, map, Observable } from 'rxjs';
import { selectAll } from '../../../features/restaurants/store/restaurant.reducer';
import { ActivatedRoute } from '@angular/router';
import {
    DishActions,
    RestaurantActions,
} from '../../../features/restaurants/store/restaurant.actions';
import { SubOrder } from '../../../features/restaurants/store/suborder.model';
import { OrderService } from '../../services/order.service';
import { Dish } from '../../../features/restaurants/store/dish.model';

@Component({
    selector: 'app-restaurant-page',
    templateUrl: './restaurant-page.component.html',
    styleUrl: './restaurant-page.component.scss',
})
export class RestaurantPageComponent {
    $restaurant: Observable<Restaurant>;
    subOrder: SubOrder | undefined;

    constructor(
        private router: Router,
        private store: Store,
        private route: ActivatedRoute,
        private orderService: OrderService
    ) {
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
        let orderId = localStorage.getItem('orderId');
        if (orderId !== null) {
            this.store.dispatch(RestaurantActions.loadRestaurants());
            this.store.dispatch(
                DishActions.loadAvailableDishes({ orderId: parseInt(orderId), restaurantId: id })
            );
            this.orderService.loadSubOrder(parseInt(orderId));
        }
        this.orderService.subOrder.subscribe((subOrder) => {
            this.subOrder = subOrder;
            console.log('SubOrder:', subOrder);
        });
    }

    getDishQuantity(dishId: number): number {
        if (!this.subOrder || !this.subOrder.dishes) {
            return 0;
        }
        const matchingDish = this.subOrder.dishes.find((dish) => dish.id === dishId);
        return matchingDish ? matchingDish.quantity || 0 : 0;
    }

    goToHomePage() {
        this.router.navigate(['/']);
    }

    goToCartPage() {
        this.router.navigate(['/cart']);
    }

    increaseQuantity(item: Dish) {
        this.orderService.addDishToSubOrder(item.id);
    }

    decreaseQuantity(item: Dish) {
        this.orderService.removeDishFromSubOrder(item.id);
    }
}
