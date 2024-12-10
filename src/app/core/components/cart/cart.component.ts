import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { Dish } from '../../../features/restaurants/store/dish.model';
import { SubOrder } from '../../../features/restaurants/store/suborder.model';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
    subOrder: SubOrder | undefined;

    constructor(private router: Router, private orderService: OrderService) {
        this.orderService.subOrder.subscribe((subOrder) => {
            this.subOrder = subOrder;
        });
        let orderId = localStorage.getItem('orderId');
        if (orderId !== null) {
            this.orderService.loadSubOrder(parseInt(orderId));
        }
    }

    increaseQuantity(item: Dish) {
        this.orderService.addDishToSubOrder(item.id);
    }

    decreaseQuantity(item: Dish) {
        this.orderService.removeDishFromSubOrder(item.id);
    }

    calculateTotal(): number {
        if (!this.subOrder) {
            return 0;
        }
        return this.subOrder.dishes.reduce((total, item) => total + item.price * item.quantity, 0);
    }

    payOrder() {
        this.orderService.paySubOrder().subscribe({
            next: () => {
                this.orderService.openSnackBar('Order paid successfully');
                if (this.subOrder) {
                    this.orderService.loadSubOrder(this.subOrder.id);
                }
            },
            error: (error) => {
                console.error('Error paying order:', error);
                this.orderService.openSnackBar('Error paying order', 'Close');
            },
        });
    }

    closeGroupOrder() {
        this.orderService.placeGroupOrder()?.subscribe({
            next: (response) => {
                this.orderService.openSnackBar('Group order placed successfully');
                if (!this.subOrder) {
                    return;
                }
                this.orderService.loadSubOrder(this.subOrder.id);
                // this.router.navigate(['/group-order', orderId]);
            },
            error: (error) => {
                console.error('Error placing group order:', error);
                this.orderService.openSnackBar('Error placing group order', 'Close');
            },
        });
    }

    goToRestaurants() {
        this.router.navigate(['/restaurant/'+this.subOrder?.restaurantId]);
    }
}
