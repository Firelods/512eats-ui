export interface Dish {
    id: number;
    name: string;
    description: string;
    price: number;
    preparationTime: number;
    pictureURL: string;
    quantity?: number;
}
