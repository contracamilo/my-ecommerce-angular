import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    { id: 1, name: 'MacBook Pro', price: 3000, image: 'assets/images/macbook.png' },
    { id: 2, name: 'Iphone', price: 1100, image: 'assets/images/iphone.png' },
    { id: 3, name: 'Raspberry pi', price: 900, image: 'assets/images/raspberrypi.png' },
    { id: 4, name: 'Flipper Zero', price: 900, image: 'assets/images/flipper.png' },
    { id: 5, name: 'Teclado Ergonómico', price: 900, image: 'assets/images/teclado.png' }
    
  ];

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }
}
