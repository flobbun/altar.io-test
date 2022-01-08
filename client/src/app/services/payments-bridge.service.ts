import { iPayment } from './../interfaces/payment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentsBridgeService {

  constructor(private http: HttpClient) { }

  postPayment = (payment: iPayment) =>
    this.http.post('http://localhost:3000/api/payments', payment);

  getPayments = () =>
    this.http.get('http://localhost:3000/api/payments');

  getPayment = (id: string) =>
    this.http.get('http://localhost:3000/api/payments/' + id);

  updatePayment = (id: string, payment: iPayment) =>
    this.http.put('http://localhost:3000/api/payments/' + id, payment);

  deletePayment = (id: string) =>
    this.http.delete('http://localhost:3000/api/payments/' + id);
}
