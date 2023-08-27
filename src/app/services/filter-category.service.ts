import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FilterCategoryService {
  constructor(private http: HttpClient) {}
  getPrdByCtgr() {
    return this.http.get(Environment.baseAPI + 'products/categories');
  }
}
