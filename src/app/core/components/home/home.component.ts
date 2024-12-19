import { Component, ElementRef, inject, ViewChild, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderService } from '../../services/order.service';
import { MatDialog } from '@angular/material/dialog';
import { DeliveryTimeModalComponent } from '../../../shared/delivery-time-modal/delivery-time-modal.component';
import { GroupOrder } from '../../../features/restaurants/store/grouporder.model';
import { Store } from '@ngrx/store';
import { RestaurantActions } from '../../../features/restaurants/store/restaurant.actions';
import { debounceTime, Subject } from 'rxjs';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent {
    searchQuery: string = '';
    isOpenNow: boolean = true;
    categories: { name: string; icon: string }[] = [
        { name: 'Burger', icon: 'burger-icon.svg' },
        { name: 'Pizza', icon: 'pizza-icon.svg' },
        { name: 'Sushi', icon: 'sushi-icon.svg' },
        { name: 'Salad', icon: 'salad-icon.svg' },
    ];
    selectedCategories: string[] = [];
    isToggled: boolean = false;
    idGroupOrder: string = '';
    @ViewChild('inputGroupId') inputGroupOrder!: ElementRef;
    private _snackBar = inject(MatSnackBar);
    actualOrderId: number = -1;
    private searchSubject = new Subject<string>();
    actualGroupOrder: GroupOrder | undefined;
    constructor(
        private router: Router,
        private orderService: OrderService,
        private dialog: MatDialog,
        private store: Store
    ) {
        this.orderService.actualOrderId.subscribe((orderId) => {
            this.actualOrderId = orderId;
            console.log('Actual order id:', orderId);
        });
        this.orderService.groupOrder.subscribe((groupOrder) => {
            this.actualGroupOrder = groupOrder;
        });
    }

    selectCategory(category: string): void {
        if (this.selectedCategories.includes(category)) {
            this.selectedCategories = this.selectedCategories.filter((c) => c !== category);
        } else {
            this.selectedCategories = [...this.selectedCategories, category];
        }
        this.store.dispatch(
            RestaurantActions.filterRestaurants({
                criteria: { foodTypes: this.selectedCategories },
            })
        );
    }

    ngOnInit() {
        this.searchSubject.pipe(debounceTime(300)).subscribe((searchQuery) => {
            this.store.dispatch(
                RestaurantActions.filterRestaurants({ criteria: { name: searchQuery } })
            );
        });
    }

    onSearchChange() {
        console.log('Search query:', this.searchQuery);
        this.searchSubject.next(this.searchQuery);
    }

    onToggleChange() {
        console.log('Toggle state:', this.isToggled);
        if (this.isToggled) {
            this.store.dispatch(
                RestaurantActions.filterRestaurants({ criteria: { availability: this.isToggled } })
            );
        } else {
            this.store.dispatch(RestaurantActions.loadRestaurants());
        }
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
        this.orderService.actualGroupOrderId.next(parseInt(this.idGroupOrder));
        this.orderService.loadGroupOrder();
        this.openSnackBar('Group order joined : ' + this.idGroupOrder, 'Close');
    }

    deleteGroupOrder() {
        this.idGroupOrder = '';
    }

    createGroupOrder() {
        const dialogRef = this.dialog.open(DeliveryTimeModalComponent);

        dialogRef.afterClosed().subscribe((result) => {
            console.log('Heure sélectionnée:', result);
            this.orderService.createGroupOrder(0, result.time).subscribe({
                next: (groupId) => {
                    this.idGroupOrder = groupId.toString();
                    // this.orderService.switchActualOrder(groupId);
                    this.inputGroupOrder.nativeElement.value = this.idGroupOrder;
                    this.orderService.actualGroupOrderId.next(groupId);
                    this.orderService.loadGroupOrder();
                    this.openSnackBar(
                        'Group order joined and created : ' + this.idGroupOrder,
                        'Close'
                    );
                },
                error: (err) => {
                    console.error('Error creating group order:', err);
                    this.openSnackBar('Failed to create group order. Please try again.', 'Close');
                },
            });
        });
    }

    openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, { duration: 2000 });
    }

    resetOrder() {
        this.orderService.resetOrder();

        this.idGroupOrder = '';
        this.inputGroupOrder.nativeElement.value = '';
    }
}
