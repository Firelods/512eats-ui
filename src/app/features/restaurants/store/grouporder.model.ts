import { SubOrder } from './suborder.model';
import { Dish } from './dish.model';

export interface GroupOrder {
    id: number;
    deliveryLocation: Location;
    status: string;
    deliveryDateTime: string | null;
    suborders: SubOrder[];
}

export interface DishWithQuantity extends Dish {
    quantity: number;
}

interface Location {
    id: number;
    streetNumber: string;
    address: string;
    city: string;
}
