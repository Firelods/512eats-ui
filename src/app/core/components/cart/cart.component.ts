import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
    constructor(private router: Router) {}
    cartItems = [
        {
            name: 'Margherita Pizza',
            price: 12,
            quantity: 1,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWwNz-YV88e3LFP6iisBcZT-loky1VotV4aQ&s',
        },
        {
            name: 'Spaghetti Carbonara',
            price: 24,
            quantity: 1,
            image: 'https://assets.afcdn.com/recipe/20211214/125831_w1024h1024c1cx866cy866cxt0cyt292cxb1732cyb1732.jpg',
        },
        {
            name: 'Caesar Salad',
            price: 10,
            quantity: 1,
            image: 'https://img.cuisineaz.com/1024x576/2022/07/18/i184733-shutterstock-95710738.webp',
        },
        {
          name: 'Margherita Pizza',
          price: 12,
          quantity: 1,
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWwNz-YV88e3LFP6iisBcZT-loky1VotV4aQ&s',
      },
      {
          name: 'Spaghetti Carbonara',
          price: 24,
          quantity: 1,
          image: 'https://assets.afcdn.com/recipe/20211214/125831_w1024h1024c1cx866cy866cxt0cyt292cxb1732cyb1732.jpg',
      },
      {
          name: 'Caesar Salad',
          price: 10,
          quantity: 1,
          image: 'https://img.cuisineaz.com/1024x576/2022/07/18/i184733-shutterstock-95710738.webp',
      },
      {
        name: 'Margherita Pizza',
        price: 12,
        quantity: 1,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWwNz-YV88e3LFP6iisBcZT-loky1VotV4aQ&s',
    },
    {
        name: 'Spaghetti Carbonara',
        price: 24,
        quantity: 1,
        image: 'https://assets.afcdn.com/recipe/20211214/125831_w1024h1024c1cx866cy866cxt0cyt292cxb1732cyb1732.jpg',
    },
    {
        name: 'Caesar Salad',
        price: 10,
        quantity: 1,
        image: 'https://img.cuisineaz.com/1024x576/2022/07/18/i184733-shutterstock-95710738.webp',
    },
    ];

    increaseQuantity(item: any) {
        item.quantity++;
    }

    decreaseQuantity(item: any) {
        if (item.quantity > 1) {
            item.quantity--;
        }
    }

    removeItem(item: any) {
        this.cartItems = this.cartItems.filter((i) => i !== item);
    }

    calculateTotal(): number {
        return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    }

    payOrder() {
        alert('Order placed successfully!');
    }

    goToRestaurants() {
        this.router.navigate(['/restaurant']);
    }
}
