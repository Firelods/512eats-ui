import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Restaurant } from '../../store/restaurant.model';
import { selectAll } from '../../store/restaurant.reducer';
import { RestaurantActions } from '../../store/restaurant.actions';

@Component({
    selector: 'app-restaurant-list',
    templateUrl: './restaurant-list.component.html',
    styleUrl: './restaurant-list.component.scss',
})
export class RestaurantListComponent implements OnInit {
    restaurants$: Observable<Restaurant[]>;

    constructor(private store: Store) {
        this.restaurants$ = this.store.select(selectAll);
    }

    ngOnInit(): void {
        this.store.dispatch(RestaurantActions.loadRestaurants());
    }
}
