import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from './core/core.module';
import { provideRouter, RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RestaurantEffects } from './features/restaurants/store/restaurant.effects';
import { routes } from './app.routes';
import { appConfig } from './app.config';

@NgModule({
    declarations: [AppComponent],
    imports: [
        CommonModule,
        CoreModule,
        RouterOutlet,
        BrowserModule,
        StoreDevtoolsModule.instrument({ maxAge: 25 }),
        EffectsModule.forRoot([RestaurantEffects]),
        StoreModule.forRoot({}, {}),
    ],
    bootstrap: [AppComponent],
    providers: [provideRouter(routes), ...appConfig.providers],
})
export class AppModule {}
