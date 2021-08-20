import { Component, OnInit } from '@angular/core';
import { Order } from '../model/order';
import { OrderService } from '../service/order-service.service';
import {Sort} from '@angular/material/sort';
import { UserProfile } from '../model/user-profile';
import { UserService } from '../_services/user.service';
import { mergeMap, map, delay, filter } from 'rxjs/operators';
import { UserControllerService } from '../service/user-controller.service';
import { Basket } from '../model/basket';
import { StoreProfile } from '../model/store-profile';
import { StoreControllerService } from '../service/store-controller.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  
  orders: Order[];
  sortedData: Order[];
  customers: UserProfile[] = [];
  shops: StoreProfile[] = []
  customerRanking: Map<string, number> = new Map();
  isMapChanged = false;
  totalSales = 0
  shopCosts = 100
  driverCosts = 4000
  transactionFee = 0
  transactionFeePerc = 0.035
  profit = 0
  period = 0

  constructor(private orderService: OrderService, 
    private userService: UserControllerService, 
    private storeService: StoreControllerService) { }

  ngOnInit(): void {
    this.storeService.fetchAllStores().subscribe(stores => this.shops = stores)
    this.orderService.getAllOrders()
    .pipe(
      mergeMap(orders => {
        orders = orders.filter(order => order.paymentType == Order.PaymentTypeEnum.PAYFAST)
        this.sortedData = orders.filter(order => order.paymentType == Order.PaymentTypeEnum.PAYFAST)
        this.period =  new Date(orders[orders.length -1].date).getMonth() - new Date(orders[0].date).getMonth()
        this.driverCosts = this.driverCosts * this.period
        this.totalSales = orders.map(order => order.totalAmount).reduce((a,b) => a +b)
        this.shopCosts = orders.map(order => this.totalStorePrice(order.basket)).reduce((a,b) => a+b)
        this.transactionFee = this.totalSales * this.transactionFeePerc
        this.profit = this.totalSales - this.shopCosts - this.transactionFee - this.driverCosts
        return orders
      }),
      mergeMap(order => {
        var customerId = order.customerId
        this.customerRanking.set(customerId, this.customerRanking.get(customerId) != null ? this.customerRanking.get(customerId) + 1 : 1)
        return this.userService.findUser(customerId)
      }
      )
    ).subscribe(customer => {
      this.customers.push(customer)
    }, (error)  => {
        console.error(error)
    }, () => {
      this.isMapChanged = true
      console.log(`${this.customerRanking.size} is size of map`)
    })
  }

  sortData(sort: Sort) {
    const data = this.sortedData.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'shopId': return this.compare(a.shopId, b.shopId, isAsc);
        case 'customerId': return this.compare(a.customerId, b.customerId, isAsc);
        case 'totalAmount': return this.compare(a.totalAmount, b.totalAmount, isAsc);
        case 'shippingFee': return this.compare(a.shippingData.fee, b.shippingData.fee, isAsc);
        case 'driver': return this.compare(a.shippingData.messengerId, b.shippingData.messengerId, isAsc);
        default: return 0;
      }
    });
  }

  sortCustomers(sort: Sort) {
    const data = this.customerRanking;
    if (!sort.active || sort.direction === '') {
      this.customerRanking = data;
      return;
    }

    this.customerRanking = new Map([...data.entries()].sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'orders': return this.compare(a[0], b[0], isAsc);
        default: return 0;
      }
    }));
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  getUser(id) {
    return this.customers.find(c => c.id == id)
  }

  getShop(id) {
    return this.shops.find(c => c.id == id)
  }

  totalStorePrice(basket: Basket): number {
    return basket.items
    .map(item => (item.storePrice != 0 ? item.storePrice: item.price) * item.quantity)
    .reduce((a,b) => a+b);
 }

}
