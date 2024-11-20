import { Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { PanierComponent } from './core/components/panier/panier.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Page d'accueil
  { path: 'panier', component: PanierComponent }, // Page panier
  { path: '**', redirectTo: '' }, // Redirection en cas de route inconnue
];
