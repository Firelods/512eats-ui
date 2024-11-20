import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { RestaurantActions } from './restaurant.actions';


@Injectable()
export class RestaurantEffects {

  loadRestaurants$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(RestaurantActions.loadRestaurants),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => RestaurantActions.loadRestaurantsSuccess({ data })),
          catchError(error => of(RestaurantActions.loadRestaurantsFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions) {}
}
