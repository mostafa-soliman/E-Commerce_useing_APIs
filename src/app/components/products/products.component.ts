import { Component, OnInit } from '@angular/core';
import { Iproduct } from 'src/app/interface/iproduct';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  categories: Iproduct[] = [];
  loading: boolean = false; //off spinner
  added: boolean = false; //off add btn display and non
  amount: number = 1;

  constructor(private serivce: ProductsService) {}
  ngOnInit(): void {
    this.getProducts();
    this.getByctgr();
  }
  // get all product to page
  getProducts() {
    this.loading = true; //on spinner

    this.serivce.getAllProducts().subscribe(
      (test: any) => {
        this.loading = false;
        this.products = test;
        // console.log(test);
      },
      (error) => {
        console.log(error);
        alert(error);
        this.loading = false;
      }
    );
  }

  // get ctgr to selector
  getByctgr() {
    this.loading = true;

    this.serivce.getPrdByCtgrs().subscribe(
      (res: any) => {
        // this.products = res;
        this.loading = false;
        this.categories = res;
      },
      (error) => {
        this.loading = false;

        console.log(error);
      }
    );
  }
  // when select item from selector
  selectCtgr(event: any) {
    let value = event.target.value;
    console.log(value);

    if (value == 0) {
      this.getProducts();
    } else {
      this.getCtgrs(value);
    }
  }

  // get fillter ctgr to page
  getCtgrs(ctgr: any) {
    this.loading = true;

    this.serivce.getOneCtgr(ctgr).subscribe((res: any) => {
      this.loading = false;

      this.products = res;
    });
  }

  addedCart(event: any) {
    console.log(event);

    event.added = true;
  }
  removeCart(event: any) {
    event.added = false;
  }
  addToCart(event: any) {
    // console.log(event);
    // this.added = true;
    this.serivce.addToCart({ event, quantity: this.amount });
  }
}
