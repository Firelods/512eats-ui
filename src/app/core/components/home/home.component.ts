import { Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent {
    constructor(private router: Router) {}
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
    idGroupOrder: string = '';
    @ViewChild('inputGroupId') inputGroupOrder!: ElementRef;
    @ViewChild('notifGroupOrder') notifGroupOrder!: ElementRef;

    selectCategory(category: string): void {
        this.selectedCategory = category;
    }

    onToggleChange() {
        console.log('Toggle state:', this.isToggled);
    }

    goToCartPage() {
        this.router.navigate(['/cart']);
    }

    joinGroupOrder() {
        if (
            this.inputGroupOrder.nativeElement.value === '' ||
            this.inputGroupOrder.nativeElement.value.length != 6
        ) {
            return;
        }
        this.idGroupOrder = this.inputGroupOrder.nativeElement.value;
        this.notifGroupOrder.nativeElement.style.display = 'block';
        this.notifGroupOrder.nativeElement.innerText =
            'Vous avez bien rejoint la group order #' + this.idGroupOrder;
        setTimeout(() => {
            this.notifGroupOrder.nativeElement.style.display = 'none';
        }, 5000);
    }

    deleteGroupOrder() {
        this.idGroupOrder = '';
    }

    createGroupOrder() {
        this.idGroupOrder = '512512'; // recuperer la groupid depuis le backend
        this.inputGroupOrder.nativeElement.value = this.idGroupOrder;
        this.notifGroupOrder.nativeElement.style.display = 'block';
        this.notifGroupOrder.nativeElement.innerText =
            'Vous avez bien créé et rejoint la group order #' + this.idGroupOrder;
        setTimeout(() => {
            this.notifGroupOrder.nativeElement.style.display = 'none';
        }, 5000);
    }
}
