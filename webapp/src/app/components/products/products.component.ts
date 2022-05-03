import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/enums/category.enum';
import { Tag } from 'src/app/models/enums/tag.enum';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  categories = [
    { value: Category.SOUP, text: 'Levesek' },
    { value: Category.MAIN_DISH, text: 'Főételek' },
    { value: Category.DESSERT, text: 'Desszertek' },
    { value: Category.SANDWICH, text: 'Szendvicsek' },
    { value: Category.SNACK, text: 'Nassolni valók' },
    { value: Category.DRINK, text: 'Italok' }
  ];

  tags = [
    { value: Tag.GLUTEN_FREE, text: 'Glutén mentes' },
    { value: Tag.SUGAR_FREE, text: 'Cukor mentes' },
    { value: Tag.VEGETARIAN, text: 'Vegetáriánus' },
    { value: Tag.VEGAN, text: 'Vegán' }
  ];
  
  name: string | undefined;
  categoryList: Category[] = [];
  min_price: number | undefined;
  max_price: number | undefined;
  tagList: Tag[] = [];

  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private userService: UserService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.search();
  }

  setCategory(checked: boolean, value: Category): void {
    if (checked) {
      this.categoryList.push(value);
    } else {
      this.categoryList = this.categoryList.filter(item => item !== value);
    }
  }

  setTag(checked: boolean, value: Tag): void {
    if (checked) {
      this.tagList.push(value);
    } else {
      this.tagList = this.tagList.filter(item => item !== value);
    }
  }

  search(): void {
    this.productService.getProducts(this.name, this.categoryList, this.min_price, this.max_price, this.tagList)
    .subscribe(products => this.products = products);
  }

  getImageUrl(category: Category): string {
    return this.productService.getProductImageUrl(category);
  }

  viewProduct(product: Product): void {
    this.productService.setProductData(product);
    this.router.navigate(['/details']);
  }

  basket(): void {
    this.router.navigate(['/basket']);
  }

  logout(): void {
    this.userService.logout().subscribe(next => {
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    })
  }
}
