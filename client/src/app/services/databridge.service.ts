import { Injectable } from '@angular/core';
import { iPayment } from '../interfaces/payment';

@Injectable({
  providedIn: 'root'
})
export class DatabridgeService {

  constructor() {}

  private currentCode: number;
  private currentGrid: Array<string> = [];
  private payments: Array<iPayment> = [];

  public initGrid = () => this.currentGrid = Array(100).fill(null);

  public setGrid = (grid: Array<string>) => this.currentGrid = grid;
  public setCode = (code: number) => this.currentCode = code;
  public addPayment = (payment: iPayment) => this.payments.push(payment);

  public getGrid = () => this.currentGrid;
  public getCode = () => this.currentCode;
  public getPayments = () => this.payments;
}
