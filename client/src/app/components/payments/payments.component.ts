import { Subscription } from 'rxjs';
import { PaymentsBridgeService } from './../../services/payments-bridge.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatabridgeService } from './../../services/databridge.service';
import { Component, OnDestroy } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnDestroy{

  constructor
  (
    public dataBridge: DatabridgeService, 
    private paymentsBridge: PaymentsBridgeService,
    private notifier: NotificationsService
  ){
  }

  private paymentSubscription = new Subscription();

  public paymentForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    ammount: new FormControl(null, Validators.required),
  });

  public checkValidation = (control: string) =>
    this.paymentForm.get(control).invalid && this.paymentForm.get(control).touched;

  public onSubmit(): void{
    if (this.validateSubmit()) {
      const payment = {
        name: this.paymentForm.get('name').value,
        ammount: this.paymentForm.get('ammount').value,
        code: this.dataBridge.getCode(),
        grid: this.dataBridge.getGrid(),
      }
      this.dataBridge.addPayment(payment); // Adding payment locally (client)  ♦

      // >>> To use the API is as simple as take de line 39 into the response <<<
      this.paymentSubscription.add(this.paymentsBridge.postPayment(payment).subscribe(
        (res) => this.notifier.success('SUCCESS', 'Payment added successfully'),
        (err) => this.notifier.error('ERROR', 'There was an error adding the payment'),
        ()    => this.paymentForm.reset()));
    }
  }

  private validateSubmit(): boolean {
    const validations = {
      grid: {
        status: this.dataBridge.getGrid().length === 0 || this.dataBridge.getGrid()[0] === null,
        error: "The grid is not loaded, please try generating a new grid"
      },
      name: {
        status: this.paymentForm.get('name').value === null,
        error: "Please, enter a valid name"
      },
      ammount: {
        status: this.paymentForm.get('ammount').value === null,
        error: "Please, enter a valid ammount"
      },
      code: {status: this.dataBridge.getCode() === null || this.dataBridge.getCode() === undefined}
    }
    for (const key in validations) {
      if (validations[key].status) {
        if (validations[key].error)
          this.notifier.error('ERROR', validations[key].error);
        return false;
      }
    }
    return true;
  }

  ngOnDestroy(): void {
    this.paymentSubscription.unsubscribe();
  }

}
