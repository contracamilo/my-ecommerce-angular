# Entrega Actividad 1: Tabla de Productos en Angular

## 📘 Introducción

Este documento describe la implementación de un **componente en Angular 19** que muestra una tabla con productos de un e-commerce. La solución sigue las mejores prácticas del framework y se estructura de manera modular para mejorar la escalabilidad y el mantenimiento del código.

## 🌐 Tecnologías Utilizadas

- **Angular 19** (Standalone Components)
- **TypeScript**
- **SCSS** para estilos
- **RxJS** para la gestión de datos con observables

## 🎮 Objetivo del Proyecto

Desarrollar un componente que:

- Muestre una lista de productos en una tabla.
- Permita iterar sobre los productos con `*ngFor`.
- Aplique estilos modernos y responsivos.
- Cargue correctamente las imágenes desde la carpeta `assets/`.
- Contenga botones para **"Comprar"** y **"Ver detalles"**.
- Calcule el precio total de los productos mediante una función.

---

## 🔧 Estructura del Proyecto

```
.
├── app
│   ├── app.component.html
│   ├── app.component.scss
│   ├── app.component.spec.ts
│   ├── app.component.ts
│   ├── app.config.ts
│   ├── app.routes.ts
│   ├── components
│   │   └── product-list
│   │       ├── product-list.component.html
│   │       ├── product-list.component.scss
│   │       ├── product-list.component.spec.ts
│   │       └── product-list.component.ts
│   ├── models
│   │   └── product.model.ts
│   └── services
│       ├── product.service.spec.ts
│       └── product.service.ts
├── assets
│   └── images
│       ├── flipper.png
│       ├── iphone.png
│       ├── macbook.png
│       ├── raspberrypi.png
│       └── teclado.png
├── index.html
├── main.ts
└── styles.scss
```

---

## 💪 Desarrollo y Explicación

### 1. **Servicio de Productos** (`ProductService`)

Para gestionar la lista de productos, creamos un **servicio centralizado** en `services/product.service.ts` que proporciona los datos de los productos mediante un **observable** (`of()` de RxJS).

```typescript
@Injectable({ providedIn: 'root' })
export class ProductService {
  private products: Product[] = [
    { id: 1, name: 'Laptop Gamer', price: 1500, image: 'assets/images/laptop.jpg' },
    { id: 2, name: 'Auriculares Inalámbricos', price: 200, image: 'assets/images/headphones.jpg' },
    { id: 3, name: 'Smartphone', price: 900, image: 'assets/images/smartphone.jpg' }
  ];

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }
}
```

---

### 2. **Modelo de Producto** (`Product`)

Definimos un modelo **Product** en `models/product.model.ts` para tipar correctamente los datos.

```typescript
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}
```

---

### 3. **Componente de la Tabla** (`ProductListComponent`)

El **componente standalone** `ProductListComponent` carga la lista de productos desde el servicio y muestra los datos en una tabla.

```typescript
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
}
```

---

### 4. **HTML del Componente** (`product-list.component.html`)

```html
<table>
  <thead>
    <tr>
      <th>Imagen</th>
      <th>Nombre</th>
      <th>Precio</th>
      <th>Acciones</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let product of products">
      <td><img [src]="product.image" [alt]="product.name" class="product-image" /></td>
      <td>{{ product.name }}</td>
      <td>${{ product.price }}</td>
      <td>
        <button (click)="buyProduct(product)">Comprar</button>
        <button (click)="viewDetails(product)">Ver Detalles</button>
      </td>
    </tr>
  </tbody>
</table>
```

---



### 🎉 **Conclusiones**

- **Componentes Standalone:** Permiten una estructura modular y escalable.
- **Servicios para separación de lógica:** `ProductService` maneja los datos de los productos.
- **Uso de ****`*ngFor`**** y ****`*ngIf`**** en el HTML:** Para iterar y mostrar datos condicionalmente.



## Servidor de desarrollo

Para levantar el servidor local usa el siguiente comando:

```bash
ng serve
```
