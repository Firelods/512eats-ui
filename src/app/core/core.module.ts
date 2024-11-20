import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { PanierComponent } from './components/panier/panier.component';

@NgModule({
  declarations: [HomeComponent, PanierComponent],
  imports: [CommonModule],
})
export class CoreModule {}
