import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { DishActions, RestaurantActions } from './restaurant.actions';
import { RestaurantService } from '../services/restaurant.service';
import { Dish } from './dish.model';
import { OrderService } from '../../../core/services/order.service';

@Injectable()
export class RestaurantEffects {
    loadRestaurants$: Observable<any> = of(null);
    loadAvailableDishes$: Observable<any> = of(null);
    filterRestaurants$: Observable<any> = of(null);
    constructor(
        private actions$: Actions,
        private restaurantService: RestaurantService,
        private orderService: OrderService
    ) {
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
                                catchError((error) => {
                                    console.error('Error fetching available dishes:', error);
                                    this.orderService.openSnackBar(
                                        'Error fetching available dishes',
                                        'Close'
                                    );
                                    return of(DishActions.loadAvailableDishesFailure({ error }));
                                })
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
                                dishes = dishes.sort((a: Dish, b: Dish) =>
                                    a.disabled === b.disabled ? 0 : a.disabled ? 1 : -1
                                );
                                return DishActions.loadAvailableDishesSuccess({
                                    dishes: dishes,
                                    restaurantId: action.restaurantId!,
                                    orderId: action.orderId!,
                                });
                            }),
                            catchError((error) => {
                                console.error('Error fetching available dishes:', error);
                                this.orderService.openSnackBar(
                                    'Error fetching available dishes',
                                    'Close'
                                );
                                return of(DishActions.loadAvailableDishesFailure({ error }));
                            })
                        );
                    }
                })
            );
        });

        this.filterRestaurants$ = createEffect(() =>
            this.actions$.pipe(
                ofType(RestaurantActions.filterRestaurants),
                concatMap((action) => {
                    if (!action.criteria) {
                        return EMPTY;
                    }
                    if (action.criteria.name) {
                        return this.restaurantService
                            .getRestaurantByName(action.criteria.name)
                            .pipe(
                                map((filteredRestaurants) =>
                                    RestaurantActions.filterRestaurantsSuccess({
                                        restaurants: filteredRestaurants,
                                    })
                                ),
                                catchError((error) => {
                                    console.error('Error fetching restaurants by name:', error);
                                    if (error.status === 404) {
                                        return of(
                                            RestaurantActions.filterRestaurantsSuccess({
                                                restaurants: [],
                                            })
                                        );
                                    }
                                    return of(
                                        RestaurantActions.filterRestaurantsFailure({ error })
                                    );
                                })
                            );
                    }
                    if (action.criteria.availability) {
                        return this.restaurantService.getAvailableRestaurants().pipe(
                            map((filteredRestaurants) =>
                                RestaurantActions.filterRestaurantsSuccess({
                                    restaurants: filteredRestaurants,
                                })
                            ),
                            catchError((error) => {
                                console.error('Error fetching restaurants by availability:', error);
                                if (error.status === 404) {
                                    return of(
                                        RestaurantActions.filterRestaurantsSuccess({
                                            restaurants: [],
                                        })
                                    );
                                }
                                return of(RestaurantActions.filterRestaurantsFailure({ error }));
                            })
                        );
                    }
                    if (action.criteria.foodTypes) {
                        return this.restaurantService
                            .getRestaurantByFoodTypes(action.criteria.foodTypes)
                            .pipe(
                                map((filteredRestaurants) =>
                                    RestaurantActions.filterRestaurantsSuccess({
                                        restaurants: filteredRestaurants,
                                    })
                                ),
                                catchError((error) => {
                                    console.error(
                                        'Error fetching restaurants by food types:',
                                        error
                                    );
                                    if (error.status === 404) {
                                        return of(
                                            RestaurantActions.filterRestaurantsSuccess({
                                                restaurants: [],
                                            })
                                        );
                                    }
                                    return of(
                                        RestaurantActions.filterRestaurantsFailure({ error })
                                    );
                                })
                            );
                    }
                    return EMPTY;
                })
            )
        );
    }
}
