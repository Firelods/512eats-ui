import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
@Component({
    selector: 'app-delivery-time-modal',
    standalone: true,
    imports: [
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        MatDialogModule,
        MatDatepickerModule,
        MatNativeDateModule,
    ],
    templateUrl: './delivery-time-modal.component.html',
    styleUrl: './delivery-time-modal.component.scss',
})
export class DeliveryTimeModalComponent {
    deliveryDate: Date | null = new Date();
    deliveryTime: string | null = null;

    constructor(public dialogRef: MatDialogRef<DeliveryTimeModalComponent>) {}

    onCancel(): void {
        this.dialogRef.close();
    }

    onConfirm(): void {
        if (!this.deliveryDate || !this.deliveryTime) {
            return;
        }
        let dateWithTime = new Date(this.deliveryDate);
        // set time of dateWithTime to deliveryTime
        dateWithTime.setHours(parseInt(this.deliveryTime.split(':')[0]));
        dateWithTime.setMinutes(parseInt(this.deliveryTime.split(':')[1]));

        this.dialogRef.close({
            time: dateWithTime,
        });
    }
}
