import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { RestaurantsModule } from '../features/restaurants/restaurants.module';
import { FormsModule } from '@angular/forms';
import { RestaurantPageComponent } from './components/restaurant-page/restaurant-page.component';
import { CartComponent } from './components/cart/cart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
    declarations: [HomeComponent, RestaurantPageComponent, CartComponent],
    imports: [CommonModule, RestaurantsModule, FormsModule, BrowserAnimationsModule],
})
export class CoreModule {}
