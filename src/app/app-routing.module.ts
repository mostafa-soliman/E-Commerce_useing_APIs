import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { CartsComponent } from './components/carts/carts.component';
import { DetailsComponent } from './components/details/details.component';

const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: 'cart', component: CartsComponent },
  { path: 'details/:id', component: DetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
