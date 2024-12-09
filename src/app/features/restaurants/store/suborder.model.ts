import { Dish } from './dish.model';

export interface SubOrder {
    id: number;
    price: number;
    restaurantId: number;
    userId: number;
    dishes: DishWithQuantity[];
    status: string;
    placedDate: string | null;
    deliveryDateTime: string | null;
    payment: any | null;
}

export interface DishWithQuantity extends Dish {
    quantity: number;
}
