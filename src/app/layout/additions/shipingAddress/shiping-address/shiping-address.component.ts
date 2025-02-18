import { Component } from '@angular/core';
import { OrderService } from '../../../../shared/services/order/order.service';
import { shippingAddress  } from '../../../../shares/interfaces/cart';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shiping-address',
  imports: [ReactiveFormsModule],
  templateUrl: './shiping-address.component.html',
  styleUrl: './shiping-address.component.scss'
})

export class ShipingAddressComponent {
  CartId !: string;
  constructor(private _OrderService: OrderService , private _ActivatedRoute:ActivatedRoute){}

  shippingAddressForm: FormGroup = new FormGroup({
    details: new FormControl('', [Validators.required, Validators.minLength(5)]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('^01[0-2,5]{1}[0-9]{8}$')
    ]),
    city: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });




  CheckOut(CartId: string , address : shippingAddress){
    this._OrderService.CheckOut(CartId, address).subscribe({
      next: (res: any)=>{if (res?.session?.url) {
        window.open(res.session.url, '_self');
      } else {
        console.error("Session URL is undefined!");
      }
      }
    })
  }

  submitShipingAddressForm(){
    if(this.shippingAddressForm.valid){
      this._ActivatedRoute.params.subscribe(params =>{
        this.CartId = params['CartId'];
        this.CheckOut(this.CartId!, this.shippingAddressForm.value);
      })
    }
  }
}
