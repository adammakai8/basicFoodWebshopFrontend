import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Item } from '../models/item.model';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getBasket(): Observable<any> {
    return this.http.get(environment.serverUrl + '/api/basket');
  }

  modifyItem(item: any): Observable<any> {
    return this.http.post(environment.serverUrl + '/api/buy', { item: item });
  }

  removeItem(item: any): Observable<any> {
    return this.http.delete(environment.serverUrl + '/api/buy', { params: { item: item._id } });
  }

  doOrder(order: Order): Observable<any> {
    return this.http.post(environment.serverUrl + '/api/order', { order: order });
  }
}
