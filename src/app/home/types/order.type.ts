export interface OrderItem {
    productId: string;
    qty: number;
    price: number;
    amount: number;
  }
  
  export interface Order {
    userName: string;
    address: string;
    city: string;
    state: string;
    pin: string;
    total: number;
    userEmail: string;
    orderDetails: OrderItem[];
  }
  
export interface PastOrder {
    _id: string;
    userName: string;
    address: string;
    city: string;
    state: string;
    pin: string;
    total: number;
    orderDate: string;
  }
  
  export interface PastOrderProduct {
    productId: string;
    productImage: string;
    qty: number;
    price: number;
    amount: number;
    productName: string;
  }
  