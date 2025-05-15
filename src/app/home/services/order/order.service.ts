import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { CartStoreItem } from '../cart/cart.storeItem';
import {
  Order,
  OrderItem,
  PastOrder,
  PastOrderProduct,
} from '../../types/order.type';
import { DeliveryAddress } from '../../types/cart.type';
import { UserService } from '../users/user-service.service';

@Injectable()
export class OrderService {
  constructor(
    private httpClient: HttpClient,
    private cartStore: CartStoreItem,
    private userService: UserService
  ) {}

  saveOrder(deliveryAddress: DeliveryAddress, userEmail: string): Observable<any> {
    const url: string = 'https://estoreproject.glitch.me/api/add';
    const orderDetails: OrderItem[] = [];
  
    this.cartStore.cart.products.forEach((product) => {
      if (!product.product._id) {
        console.error('Invalid productId in cart:', product);
      }
      orderDetails.push({
        productId: product.product._id,
        price: product.product.price,
        qty: product.quantity,
        amount: product.amount,
      });
    });
  
    const order: Order = {
      userName: deliveryAddress.userName,
      address: deliveryAddress.address,
      city: deliveryAddress.city,
      state: deliveryAddress.state,
      pin: deliveryAddress.pin,
      total: this.cartStore.cart.totalAmount,
      userEmail: userEmail,
      orderDetails: orderDetails,
    };
  
    console.log('Token:', this.userService.token); // Debug token
    console.log('Order:', order); // Debug order payload
  
    return this.httpClient.post(url, order, {
      headers: { authorization: `Bearer ${this.userService.token}` },
    });
  }
  

  getOrders(userEmail: string): Observable<PastOrder[]> {
    const url: string = `https://estoreproject.glitch.me/api/allorders?userEmail=${userEmail}`;
    const token = this.userService.token;
  
    console.log('Authorization Token:', token); // Debug log
  
    return this.httpClient.get<PastOrder[]>(url, {
      headers: { authorization: `Bearer ${token}` }, // Ensure 'Bearer' is included
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.error('Unauthorized: Invalid or expired token.');
        }
        return throwError(() => error);
      })
    );
  }
  

  // getOrderProducts1(productId: string): Observable<PastOrderProduct[]> {
  //   const url: string = `https://estoreproject.glitch.me/api/orderproducts?orderId=${productId}`;
  //   console.log(productId)
  //   return this.httpClient.get<PastOrderProduct[]>(url, {
  //     headers: { authorization: this.userService.token },
  //   });
  // }

  getOrderProducts(productId: string): Observable<PastOrderProduct[]> {
    const url: string = `https://estoreproject.glitch.me/api/orderproducts?orderId=${productId}`;
    const token = this.userService.token;
  
    console.log('Authorization Token:', token); // Debug log
  
    return this.httpClient.get<PastOrderProduct[]>(url, {
      headers: { authorization: `Bearer ${token}` }, // Ensure 'Bearer' is included
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.error('Unauthorized: Invalid or expired token.');
        }
        return throwError(() => error);
      })
    );
  }
}
