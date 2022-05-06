import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Payment } from 'src/app/models/enums/payment.enum';
import { Shippers } from 'src/app/models/enums/shippers.enum';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.css']
})
export class OrderDialogComponent implements OnInit {

  shipperTexts = [
    { value: Shippers.FOOD_PANDA, text: 'Food Panda' },
    { value: Shippers.WOLT, text: 'Wolt' },
    { value: Shippers.CITYFOOD, text: 'Cityfood' }
  ];

  paymentTexts = [
    { value: Payment.BANK_TRANSFER, text: 'Banki átutalás' },
    { value: Payment.CARD, text: 'Kártyás fizetés' },
    { value: Payment.CASH_ON_DELIVERY, text: 'Utánvétel' }
  ];

  orderForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<OrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) {
    this.orderForm = this.fb.group({
      shipper: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      payment: new FormControl('', [Validators.required])
    });
   }

  ngOnInit(): void {
  }

  close(): void {
    this.data = undefined;
    this.dialogRef.close();
  }

  controlHasError(control: string): boolean {
    return this.orderForm.controls[control].invalid;
  }
}
