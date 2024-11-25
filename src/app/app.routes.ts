import { Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { PanierComponent } from './core/components/panier/panier.component';
import { RestaurantPageComponent } from './core/components/restaurant-page/restaurant-page.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' }, // Page d'accueil
    { path: 'panier', component: PanierComponent }, // Page panier
    { path: 'restaurant', component:RestaurantPageComponent}, // Page restaurant
    { path: '**', redirectTo: '' }, // Redirection en cas de route inconnue
    
];
