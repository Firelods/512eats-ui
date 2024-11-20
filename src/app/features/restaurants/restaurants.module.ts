import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromRestaurant from './store/restaurant.reducer';
import { EffectsModule } from '@ngrx/effects';
import { RestaurantEffects } from './store/restaurant.effects';
import { RestaurantListComponent } from './components/restaurant-list/restaurant-list.component';



@NgModule({
  declarations: [
    RestaurantListComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromRestaurant.restaurantsFeatureKey, fromRestaurant.reducer),
    EffectsModule.forFeature([RestaurantEffects])
  ]
})
export class RestaurantsModule { }
