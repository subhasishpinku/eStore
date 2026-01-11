import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StoreItem } from '../../../shared/storeItem';
import { Cart, CartItem } from '../../types/cart.type';
import { Product } from '../../types/products.type';

@Injectable({ providedIn: 'root' })
export class CartStoreItem extends StoreItem<Cart> {

  constructor() {
    const storedCart = sessionStorage.getItem('cart');

    super(
      storedCart
        ? JSON.parse(storedCart)
        : {
            products: [],
            totalAmount: 0,
            totalProducts: 0,
          }
    );
  }

  // -------------------- GETTERS --------------------

  get cart$(): Observable<Cart> {
    return this.value$;
  }

  get cart(): Cart {
    return this.value;
  }

  // -------------------- ACTIONS --------------------

  addProduct(product: Product): void {
    const cart = structuredClone(this.cart);

    const existing = cart.products.find(
      (item) => item.product._id === product._id
    );

    if (existing) {
      existing.quantity += 1;
      existing.amount += Number(product.price);
    } else {
      cart.products.push({
        product,
        quantity: 1,
        amount: Number(product.price),
      });
    }

    cart.totalProducts += 1;
    cart.totalAmount += Number(product.price);

    this.updateCart(cart);
  }

  decreaseProductQuantity(cartItem: CartItem): void {
    const cart = structuredClone(this.cart);

    const item = cart.products.find(
      (p) => p.product._id === cartItem.product._id
    );

    if (!item) return;

    if (item.quantity === 1) {
      this.removeProduct(cartItem);
      return;
    }

    item.quantity -= 1;
    item.amount -= Number(item.product.price);
    cart.totalProducts -= 1;
    cart.totalAmount -= Number(item.product.price);

    this.updateCart(cart);
  }

  removeProduct(cartItem: CartItem): void {
    const cart = structuredClone(this.cart);

    cart.products = cart.products.filter(
      (item) => item.product._id !== cartItem.product._id
    );

    cart.totalProducts -= cartItem.quantity;
    cart.totalAmount -= cartItem.amount;

    if (cart.totalProducts <= 0) {
      this.clearCart();
    } else {
      this.updateCart(cart);
    }
  }

  clearCart(): void {
    const emptyCart: Cart = {
      products: [],
      totalAmount: 0,
      totalProducts: 0,
    };

    this.setValue(emptyCart);
    sessionStorage.removeItem('cart');
  }

  // -------------------- PRIVATE --------------------

  private updateCart(cart: Cart): void {
    this.setValue(cart);
    sessionStorage.setItem('cart', JSON.stringify(cart));
  }
}
