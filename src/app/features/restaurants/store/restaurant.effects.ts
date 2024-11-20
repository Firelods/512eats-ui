import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { RestaurantActions } from './restaurant.actions';
import { RestaurantService } from '../services/restaurant.service';

@Injectable()
export class RestaurantEffects {
    loadRestaurants$: Observable<any> = of(null);

    constructor(private actions$: Actions, private restaurantService: RestaurantService) {
        this.loadRestaurants$ = createEffect(() => {
            return this.actions$.pipe(
                ofType(RestaurantActions.loadRestaurants),
                concatMap(() =>
                    this.restaurantService.getRestaurants().pipe(
                        map((restaurants) =>
                            RestaurantActions.loadRestaurantsSuccess({ restaurants })
                        ),
                        catchError((error) =>
                            of(RestaurantActions.loadRestaurantsFailure({ error }))
                        )
                    )
                )
            );
        });
    }
}
