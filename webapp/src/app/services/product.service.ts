import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/enums/category.enum';
import { Tag } from '../models/enums/tag.enum';
import { Item } from '../models/item.model';
import { ProductFilter } from '../models/product-filter.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productData: Product | undefined;

  categories = [
    { value: Category.SOUP, text: 'Levesek', imageUrl: 'assets/images/soup.png' },
    { value: Category.MAIN_DISH, text: 'Főételek', imageUrl: 'assets/images/main_dish.png' },
    { value: Category.DESSERT, text: 'Desszertek', imageUrl: 'assets/images/dessert.png' },
    { value: Category.SANDWICH, text: 'Szendvicsek', imageUrl: 'assets/images/sandwich.png' },
    { value: Category.SNACK, text: 'Nassolni valók', imageUrl: 'assets/images/snack.png' },
    { value: Category.DRINK, text: 'Italok', imageUrl: 'assets/images/drink.svg' }
  ];

  constructor(private http: HttpClient) { }

  getProducts(
    name: string | undefined, 
    categoryList: Category[], 
    min_price: number | undefined, 
    max_price: number | undefined, 
    tagList: Tag[]
    ): Observable<any> {
    var filterParams = new ProductFilter();
    if (name) {
      filterParams.name = name;
    }
    if (categoryList.length > 0) {
      filterParams.categories = categoryList.join(',');
    }
    if (min_price) {
      filterParams.min_price = min_price;
    }
    if (max_price) {
      filterParams.max_price = max_price;
    }
    if (tagList.length > 0) {
      filterParams.tags = tagList.join(',');
    }
    return this.http.get(environment.serverUrl + '/api/products', { params: filterParams as any });
  }

  buyProduct(item: Item): Observable<any> {
    return this.http.put(environment.serverUrl + '/api/buy', { item: item });
  }

  setProductData(product: Product): void {
    this.productData = product;
  }

  getProductData(): Product {
    if (this.productData) {
      return this.productData;
    }
    throw Error('No product given');
  }

  getProductCategoryName(category: Category): string {
    const categoryItem = this.categories.find(item => item.value === category);
    return categoryItem ? categoryItem.text : '';
  }

  getProductImageUrl(category: Category): string {
    const categoryItem = this.categories.find(item => item.value === category);
    return categoryItem ? categoryItem.imageUrl : '';
  }
}
