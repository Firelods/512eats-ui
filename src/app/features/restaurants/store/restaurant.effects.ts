import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { DishActions, RestaurantActions } from './restaurant.actions';
import { RestaurantService } from '../services/restaurant.service';

@Injectable()
export class RestaurantEffects {
    loadRestaurants$: Observable<any> = of(null);
    loadAvailableDishes$: Observable<any> = of(null);

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

        this.loadAvailableDishes$ = createEffect(() => {
            return this.actions$.pipe(
                ofType(DishActions.loadAvailableDishes),
                concatMap((action) =>
                    this.restaurantService.getAvailableDishes(action.restaurantId).pipe(
                        map((dishes) =>
                            DishActions.loadAvailableDishesSuccess({
                                dishes,
                                restaurantId: action.restaurantId,
                            })
                        ),
                        catchError((error) => of(DishActions.loadAvailableDishesFailure({ error })))
                    )
                )
            );
        });
    }
}
