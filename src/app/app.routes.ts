import { Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { CartComponent } from './core/components/cart/cart.component';
import { RestaurantPageComponent } from './core/components/restaurant-page/restaurant-page.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' }, // Page d'accueil
    { path: 'cart', component: CartComponent }, // Page panier
    { path: 'restaurant', component:RestaurantPageComponent}, // Page restaurant
    { path: '**', redirectTo: '' }, // Redirection en cas de route inconnue
    
];
