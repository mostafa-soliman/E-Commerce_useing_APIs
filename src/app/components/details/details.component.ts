import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  id: any;
  data: any = {};
  loading: boolean = false; //off spinner

  constructor(private route: ActivatedRoute, private service: ProductsService) {
    this.id = this.route.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
    this.getProduct();
  }
  getProduct() {
    this.loading = true; //on spinner
    this.service.getPrdById(this.id).subscribe(
      (res) => {
        this.loading = false; //off spinner
        this.data = res;
      },
      (error) => {
        this.loading = false; //off spinner
        alert(error);
      }
    );
  }
}
