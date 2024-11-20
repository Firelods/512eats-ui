import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { PanierComponent } from './components/panier/panier.component';
import { RestaurantsModule } from '../features/restaurants/restaurants.module';

@NgModule({
    declarations: [HomeComponent, PanierComponent],
    imports: [CommonModule, RestaurantsModule],
})
export class CoreModule {}
