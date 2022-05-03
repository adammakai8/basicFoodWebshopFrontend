import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-buy-product-dialog',
  templateUrl: './buy-product-dialog.component.html',
  styleUrls: ['./buy-product-dialog.component.css']
})
export class BuyProductDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<BuyProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {amount: number, accepted: boolean},
  ) { }

  ngOnInit(): void {
  }

  close(): void {
    this.data.accepted = false;
    this.dialogRef.close();
  }

}
