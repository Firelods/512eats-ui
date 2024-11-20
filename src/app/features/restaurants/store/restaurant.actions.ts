import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Restaurant } from './restaurant.model';

export const RestaurantActions = createActionGroup({
  source: 'Restaurant/API',
  events: {
    'Load Restaurants': props<{ restaurants: Restaurant[] }>(),
    'Add Restaurant': props<{ restaurant: Restaurant }>(),
    'Upsert Restaurant': props<{ restaurant: Restaurant }>(),
    'Add Restaurants': props<{ restaurants: Restaurant[] }>(),
    'Upsert Restaurants': props<{ restaurants: Restaurant[] }>(),
    'Update Restaurant': props<{ restaurant: Update<Restaurant> }>(),
    'Update Restaurants': props<{ restaurants: Update<Restaurant>[] }>(),
    'Delete Restaurant': props<{ id: string }>(),
    'Delete Restaurants': props<{ ids: string[] }>(),
    'Clear Restaurants': emptyProps(),
  }
});
