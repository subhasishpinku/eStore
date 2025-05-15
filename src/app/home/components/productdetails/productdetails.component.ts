import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/product/products.service';
import { Product } from '../../types/products.type';
import { Subscription } from 'rxjs';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartStoreItem } from '../../services/cart/cart.storeItem';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss'],
})
export class ProductdetailsComponent implements OnInit, OnDestroy {
  product: Product;
  subscriptions: Subscription = new Subscription();
  faShoppingCart = faShoppingCart;


  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private cart: CartStoreItem
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('_id');
    console.log('Product ID:', id);
    if (id) {
      this.subscriptions.add(
        this.productsService.getProduct(id).subscribe((res) => {
          console.log('Product API Response:', res);
          // Check if it's an array or object
          this.product = Array.isArray(res) ? res[0] : res;
        })
      );
    } else {
      console.error('Product ID is missing');
    }
  }
  
  

  addToCart(){
    this.cart.addProduct(this.product);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
