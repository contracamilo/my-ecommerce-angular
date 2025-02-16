import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  standalone: true,
  selector: 'app-product-list',
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  private productService = inject(ProductService);
  products: Product[] = [];
  totalPrice: number = 0;

  constructor() {
    this.loadProducts();
  }

  private loadProducts() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  calculateTotal() {
    this.totalPrice = this.products.reduce((sum, product) => sum + product.price, 0);
  }

  buyProduct(product: Product) {
    alert(`¡Has comprado ${product.name} por $${product.price}!`);
  }

  viewDetails(product: Product) {
    alert(`Detalles del producto: \n\n${product.name} - $${product.price}`);
  }
}
