import { createFeature, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Restaurant } from './restaurant.model';
import { RestaurantActions } from './restaurant.actions';

export const restaurantsFeatureKey = 'restaurants';

export interface State extends EntityState<Restaurant> {
    // additional entities state properties
}

export const adapter: EntityAdapter<Restaurant> = createEntityAdapter<Restaurant>();

export const initialState: State = adapter.getInitialState({
    // additional entity state properties
});

export const reducer = createReducer(
    initialState,
    on(RestaurantActions.loadRestaurants, (state) => ({
        ...state,
    })),
    on(RestaurantActions.addRestaurant, (state, action) =>
        adapter.addOne(action.restaurant, state)
    ),
    on(RestaurantActions.upsertRestaurant, (state, action) =>
        adapter.upsertOne(action.restaurant, state)
    ),
    on(RestaurantActions.addRestaurants, (state, action) =>
        adapter.addMany(action.restaurants, state)
    ),
    on(RestaurantActions.upsertRestaurants, (state, action) =>
        adapter.upsertMany(action.restaurants, state)
    ),
    on(RestaurantActions.updateRestaurant, (state, action) =>
        adapter.updateOne(action.restaurant, state)
    ),
    on(RestaurantActions.updateRestaurants, (state, action) =>
        adapter.updateMany(action.restaurants, state)
    ),
    on(RestaurantActions.deleteRestaurant, (state, action) => adapter.removeOne(action.id, state)),
    on(RestaurantActions.deleteRestaurants, (state, action) =>
        adapter.removeMany(action.ids, state)
    ),
    on(RestaurantActions.loadRestaurantsSuccess, (state, { restaurants }) =>
        adapter.setAll(restaurants, state)
    ),
    on(RestaurantActions.loadRestaurantsFailure, (state, { error }) => ({
        ...state,
        error,
    })),

    on(RestaurantActions.clearRestaurants, (state) => adapter.removeAll(state))
);

export const restaurantsFeature = createFeature({
    name: restaurantsFeatureKey,
    reducer,
    extraSelectors: ({ selectRestaurantsState }) => ({
        ...adapter.getSelectors(selectRestaurantsState),
    }),
});

export const { selectIds, selectEntities, selectAll, selectTotal } = restaurantsFeature;
