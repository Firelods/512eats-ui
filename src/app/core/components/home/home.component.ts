import { Component, ElementRef, inject, ViewChild, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderService } from '../../services/order.service';
import { MatDialog } from '@angular/material/dialog';
import { DeliveryTimeModalComponent } from '../../../shared/delivery-time-modal/delivery-time-modal.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent {
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
    private _snackBar = inject(MatSnackBar);
    actualOrderId: number = -1;

    constructor(
        private router: Router,
        private orderService: OrderService,
        private dialog: MatDialog
    ) {
        this.orderService.actualOrderId.subscribe((orderId) => {
            this.actualOrderId = orderId;
            console.log('Actual order id:', orderId);
        });
    }

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
