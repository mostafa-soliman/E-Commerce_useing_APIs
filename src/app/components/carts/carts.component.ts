import { ProductsService } from 'src/app/services/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.scss'],
})
export class CartsComponent implements OnInit {
  items: any[] = [];
  cartPrdct: any[] = [];
  total: any = 0;
  success: boolean = false;

  constructor(private serivce: ProductsService) {}
  ngOnInit(): void {
    this.upDateCart();
    this.getCartPrdcts();
    this.getCartTotal();
  }
  upDateCart() {
    this.items = this.serivce.getCartItems();
  }
  getCartPrdcts() {
    if ('cart' in localStorage) {
      this.cartPrdct = JSON.parse(localStorage.getItem('cart')!);
      console.log(this.cartPrdct);
    }
  }
  getCartTotal() {
    this.total = 0;
    for (let x in this.cartPrdct) {
      this.total += this.cartPrdct[x].event.price * this.cartPrdct[x].quantity;
    }
  }

  minsAmount(index: number) {
    if (this.cartPrdct[index].quantity > 1) {
      this.cartPrdct[index].quantity--;
      this.getCartTotal();
      localStorage.setItem('cart', JSON.stringify(this.cartPrdct));
    }
  }
  plasAmount(index: number) {
    this.cartPrdct[index].quantity++;
    this.getCartTotal();

    localStorage.setItem('cart', JSON.stringify(this.cartPrdct));
  }
  changeInput() {
    this.getCartTotal();
    localStorage.setItem('cart', JSON.stringify(this.cartPrdct));
  }
  deleteItem(index: number) {
    this.cartPrdct.splice(index, 1);

    this.getCartTotal();
    localStorage.setItem('cart', JSON.stringify(this.cartPrdct));
  }
  clearItems() {
    this.cartPrdct = [];

    this.getCartTotal();
    localStorage.setItem('cart', JSON.stringify(this.cartPrdct));
  }
  addCartToApi() {
    let products = this.cartPrdct.map((item) => {
      return { productId: item.event.id, quantity: item.event.quantity };
    });
    let Model = {
      userId: 5,
      date: new Date(),
      products: products,
    };
    this.serivce.postFromCartToApi(Model).subscribe((res) => {
      this.success = true;
    });
  }
}
