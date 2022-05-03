import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ObjectId } from 'mongodb';
import { BuyProductDialogComponent } from 'src/app/dialogs/buy-product-dialog/buy-product-dialog.component';
import { OrderDialogComponent } from 'src/app/dialogs/order-dialog/order-dialog.component';
import { Item } from 'src/app/models/item.model';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  basket: any[] = [];

  constructor(
    private orderService: OrderService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.orderService.getBasket().subscribe(result => this.basket = result);
  }

  modify(item: any): void {
    const dialogRef = this.dialog.open(BuyProductDialogComponent, { data: { amount: item.amount, accepted: true }});
    dialogRef.afterClosed().subscribe(data => {
      if (!data.accepted) {
        return;
      }
      item.amount = data.amount;
      this.orderService.modifyItem(item).subscribe(result => this.basket = result);
    });
  }

  remove(item: any): void {
    this.orderService.removeItem(item).subscribe(result => {
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
    const dialogRef = this.dialog.open(OrderDialogComponent, { data: undefined });
    dialogRef.afterClosed().subscribe(data => {
      const user_id = localStorage.getItem('user');
      if (data && user_id) {
        const newOrder = new Order();
        newOrder.user_id = user_id;
        newOrder.items = this.basket;
        newOrder.shipper = data.shipper;
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
    });
  }
}
