import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { DishActions, RestaurantActions } from './restaurant.actions';
import { RestaurantService } from '../services/restaurant.service';
import { Dish } from './dish.model';

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
                concatMap((action) => {
                    if (action.restaurantId && !action.orderId) {
                        console.log('action.restaurantId', action.restaurantId);

                        return this.restaurantService
                            .getAllDishesFromRestaurant(action.restaurantId)
                            .pipe(
                                map((dishes) =>
                                    DishActions.loadAvailableDishesSuccess({
                                        dishes,
                                        restaurantId: action.restaurantId!,
                                    })
                                ),
                                catchError((error) =>
                                    of(DishActions.loadAvailableDishesFailure({ error }))
                                )
                            );
                    } else {
                        console.log('action.orderId', action.orderId);

                        if (action.orderId == undefined || action.restaurantId == undefined) {
                            console.log('No orderId or restaurantId provided, returning EMPTY');
                            console.log('action:', action);

                            return EMPTY;
                        }
                        localStorage.setItem('orderId', action.orderId.toString());
                        console.log('Fetching available dishes for orderId:', action.orderId);
                        return this.restaurantService.getAvailableDishes(action.orderId).pipe(
                            map((dishes) => {
                                console.log('Fetched dishes:', dishes);
                                return DishActions.loadAvailableDishesSuccess({
                                    dishes: dishes,
                                    restaurantId: action.restaurantId!,
                                    orderId: action.orderId!,
                                });
                            }),
                            catchError((error) => {
                                console.error('Error fetching available dishes:', error);
                                return of(DishActions.loadAvailableDishesFailure({ error }));
                            })
                        );
                    }
                })
            );
        });
    }
}
