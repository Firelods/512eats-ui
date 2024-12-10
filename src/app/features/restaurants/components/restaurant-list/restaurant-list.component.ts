import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Restaurant } from '../../store/restaurant.model';
import { selectAll } from '../../store/restaurant.reducer';
import { DishActions, RestaurantActions } from '../../store/restaurant.actions';
import { Router } from '@angular/router';
import { OrderService } from '../../../../core/services/order.service';

@Component({
    selector: 'app-restaurant-list',
    templateUrl: './restaurant-list.component.html',
    styleUrl: './restaurant-list.component.scss',
})
export class RestaurantListComponent implements OnInit {
    restaurants$: Observable<Restaurant[]>;
    @Input() groupOrderId: string = '';

    constructor(private store: Store, private router: Router, private orderService: OrderService) {
        this.restaurants$ = this.store.select(selectAll);
    }

    ngOnInit(): void {
        this.store.dispatch(RestaurantActions.loadRestaurants());
    }

    navigateToRestaurant(restaurantId: number): void {
        if (this.groupOrderId === '') {
            console.log('Dispatching loadAvailableDishes action with restaurantId:', restaurantId);

            this.store.dispatch(DishActions.loadAvailableDishes({ restaurantId }));
            this.router.navigate(['/restaurant', restaurantId]);

            return;
        }

        this.orderService.createSubOrder(parseInt(this.groupOrderId), restaurantId);
        this.router.navigate(['/restaurant', restaurantId]);
    }
}
