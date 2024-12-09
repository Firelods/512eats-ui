import { Dish } from './dish.model';

export interface Restaurant {
    id: number;
    name: string;
    openTime: string;
    closeTime: string;
    foodTypeList: string[];
    averagePrice: number;
    description: string;
    dishPictureURLListSample: string[];
    dishes?: Dish[];
}
