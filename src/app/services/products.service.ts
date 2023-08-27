import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  items: any[] = [];

  constructor(private http: HttpClient) {}
  getAllProducts() {
    // return this.http.get('https://fakestoreapi.com/products');
    return this.http.get(Environment.baseAPI + 'products');
  }
  getPrdByCtgrs() {
    // return this.http.get('https://fakestoreapi.com/products/categories');
    return this.http.get(Environment.baseAPI + 'products/categories');
    // return this.http.get(`${Environment.baseAPI + 'products'}${categories}`);
  }
  getOneCtgr(ctrgr: string) {
    // return this.http.get(`${Environment.baseAPI + 'products/'}${ctrgr}`);
    return this.http.get('https://fakestoreapi.com/products/category/' + ctrgr);
  }
  postFromCartToApi(model: any) {
    // return this.http.get(`${Environment.baseAPI + 'products/'}${ctrgr}`);
    return this.http.post(Environment.baseAPI + 'carts', model);
  }

  addToCart(item: any) {
    if ('cart' in localStorage) {
      this.items = JSON.parse(localStorage.getItem('cart')!);
      let exist = this.items.find((res) => res.event.id == item.event.id);
      if (exist) {
        alert('added');
      } else {
        this.items.push(item);
        this.addCartToStorage();
      }
    } else {
      this.items.push(item);
      this.addCartToStorage();
    }
  }
  // get data from home to cart
  getCartItems(): any[] {
    return this.items;
  }

  addCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  getPrdById(id: any) {
    return this.http.get(Environment.baseAPI + 'products/' + id);
  }
}
