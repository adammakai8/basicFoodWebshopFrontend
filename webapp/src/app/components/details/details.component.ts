import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BuyProductDialogComponent } from 'src/app/dialogs/buy-product-dialog/buy-product-dialog.component';
import { Item } from 'src/app/models/item.model';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  isDisabled: boolean = false;

  product: Product;

  constructor(
    private productService: ProductService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
      this.product = this.productService.getProductData();
   }

  ngOnInit(): void {
  }

  back(): void {
    this.router.navigate(['/products']);
  }

  getImageUrl(): string {
    return this.productService.getProductImageUrl(this.product.category);
  }

  getProductCategory(): string {
    return this.productService.getProductCategoryName(this.product.category);
  }

  openBuyDialog() {
    this.isDisabled = true;
    const dialogRef = this.dialog.open(BuyProductDialogComponent, { data: { amount: 1, accepted: true } });
    dialogRef.afterClosed().subscribe(data => {
      if (!data.accepted) {
        this.isDisabled = false;
        return;
      }
      const item = new Item();
      item.product = this.product;
      item.amount = data.amount;
      this.productService.buyProduct(item).subscribe(next => {
        this.snackBar.open('Sikeresen kosárba helyezve', undefined, { duration: 3000 });
        this.router.navigate(['/products']);
      }, error => {
        console.error(error);
        this.snackBar.open('Sikertelen művelet', undefined, { duration: 3000 });
        this.isDisabled = false;
      });
    });
  }
}
