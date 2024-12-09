import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    actualOrderId: number = -1;

    constructor() {}
}
