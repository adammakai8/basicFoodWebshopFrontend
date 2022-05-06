import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BuyProductDialogComponent } from 'src/app/dialogs/buy-product-dialog/buy-product-dialog.component';
import { OrderDialogComponent } from 'src/app/dialogs/order-dialog/order-dialog.component';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  basket: any[] = [];
  isDisabled: boolean;

  constructor(
    private orderService: OrderService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) { this.isDisabled = false; }

  ngOnInit(): void {
    this.orderService.getBasket().subscribe(result => {this.basket = result; console.log(this.basket)});
  }

  modify(item: any): void {
    this.isDisabled = true;
    const dialogRef = this.dialog.open(BuyProductDialogComponent, { data: { amount: item.amount, accepted: true }});
    dialogRef.afterClosed().subscribe(data => {
      if (!data.accepted) {
        this.isDisabled = false;
        return;
      }
      item.amount = data.amount;
      this.orderService.modifyItem(item).subscribe(result => this.basket = result);
      this.isDisabled = false;
    });
  }

  remove(index: number): void {
    this.orderService.removeItem(index).subscribe(result => {
      this.basket = result;
      this.snackBar.open('Termék eltávolítva', undefined, { duration: 3000 });
    });
  }

  getSum(): number{
    var sum = 0;
    this.basket.forEach(item => sum += item.product.price * item.amount);
    return sum;
  }

  order(): void {
    this.isDisabled = true;
    const dialogRef = this.dialog.open(OrderDialogComponent, { data: undefined });
    dialogRef.afterClosed().subscribe(data => {
      const user_id = localStorage.getItem('user');
      if (data && user_id) {
        const newOrder = new Order();
        newOrder.user_id = user_id;
        newOrder.items = this.basket;
        newOrder.shippers = data.shipper;
        newOrder.address = data.address;
        newOrder.payment = data.payment;
        this.orderService.doOrder(newOrder).subscribe(result => {
          console.log(result);
          this.snackBar.open('Rendelés elküldve! :)', undefined, { duration: 3000 });
          this.router.navigate(['/products']);
        });
      } else if (!user_id) {
        this.snackBar.open('Nem található bejelentkezett felhaszáló, kilépés...', undefined, { duration: 3000 });
        this.router.navigate(['/login']);
      }
      this.isDisabled = false;
    });
  }

  back(): void {
    this.router.navigate(['/products']);
  }
}
