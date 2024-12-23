import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Restaurant } from './restaurant.model';
import { Dish } from './dish.model';

export const RestaurantActions = createActionGroup({
    source: 'Restaurant/API',
    events: {
        'Load Restaurants': emptyProps(),
        'Load Restaurants Success': props<{ restaurants: Restaurant[] }>(),
        'Load Restaurants Failure': props<{ error: any }>(),
        'Add Restaurant': props<{ restaurant: Restaurant }>(),
        'Upsert Restaurant': props<{ restaurant: Restaurant }>(),
        'Add Restaurants': props<{ restaurants: Restaurant[] }>(),
        'Upsert Restaurants': props<{ restaurants: Restaurant[] }>(),
        'Update Restaurant': props<{ restaurant: Update<Restaurant> }>(),
        'Update Restaurants': props<{ restaurants: Update<Restaurant>[] }>(),
        'Delete Restaurant': props<{ id: string }>(),
        'Delete Restaurants': props<{ ids: string[] }>(),
        'Clear Restaurants': emptyProps(),
        'Filter Restaurants': props<{
            criteria: { name?: string; availability?: boolean; foodTypes?: string[] };
        }>(),
        'Filter Restaurants Success': props<{ restaurants: Restaurant[] }>(),
        'Filter Restaurants Failure': props<{ error: any }>(),
    },
});

export const DishActions = createActionGroup({
    source: 'Dish/API',
    events: {
        'Load Available Dishes': props<{ restaurantId?: number; orderId?: number }>(),
        'Load Available Dishes Success': props<{
            dishes: Dish[];
            restaurantId: number;
            orderId?: number;
        }>(),
        'Load Available Dishes Failure': props<{ error: any }>(),
    },
});
