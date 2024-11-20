import { Component } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent {
    searchQuery: string = '';
    isOpenNow: boolean = true;
    categories: string[] = ['Burgers', 'Pizza', 'Sushi', 'Salads'];
    selectedCategory: string = 'Burgers';
    isToggled: boolean = false;

    selectCategory(category: string): void {
        this.selectedCategory = category;
    }

    onToggleChange() {
        console.log('Toggle state:', this.isToggled);
    }
}
