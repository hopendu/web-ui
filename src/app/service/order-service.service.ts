import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {Order} from '../model/order'

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getAllOrders() {
    return this.http
        .get<Array<Order>>(`${environment.baseUrl}/order`)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            return throwError(error)
          }))
  }
}
