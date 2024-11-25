import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { PanierComponent } from './components/panier/panier.component';
import { RestaurantsModule } from '../features/restaurants/restaurants.module';
import { FormsModule } from '@angular/forms';
import { RestaurantPageComponent } from './components/restaurant-page/restaurant-page.component';

@NgModule({
    declarations: [HomeComponent, PanierComponent, RestaurantPageComponent],
    imports: [CommonModule, RestaurantsModule, FormsModule],
})
export class CoreModule {}
