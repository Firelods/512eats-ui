import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent {
    constructor(private router:Router){}
    searchQuery: string = '';
    isOpenNow: boolean = true;
    categories: { name: string; icon: string }[] = [
        { name: 'Burgers', icon: 'burger-icon.svg' },
        { name: 'Pizza', icon: 'pizza-icon.svg' },
        { name: 'Sushi', icon: 'sushi-icon.svg' },
        { name: 'Salads', icon: 'salad-icon.svg' },
    ];
    selectedCategory: string = 'Burgers';
    isToggled: boolean = false;

    selectCategory(category: string): void {
        this.selectedCategory = category;
    }

    onToggleChange() {
        console.log('Toggle state:', this.isToggled);
    }

    goToCartPage(){
        this.router.navigate(['/cart']);
    }
}
