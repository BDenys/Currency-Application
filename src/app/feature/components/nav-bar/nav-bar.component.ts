import { Component, Input, OnInit } from '@angular/core';
import { CurrencyStaticValue, ICurrency } from 'src/app/shared/models/currency.model';
import { CurrencyService } from '../../services/currency.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
 private _UAHCurrency!: ICurrency;
 private _USDCurrency!: ICurrency;
 private _EURCurrency!: ICurrency;

 public isLoading$!: Observable<boolean>;

  @Input()
  set UAHCurrency(value: ICurrency) {
    this._UAHCurrency = value;
  }
  @Input()
  set USDCurrency(value: ICurrency) {
    this._USDCurrency = value;
  }
  @Input()
  set EURCurrency(value: ICurrency) {
    this._EURCurrency = value;
  }

  get UAHCurrency() {
    return this._UAHCurrency;
  }
  get USDCurrency() {
    return this._USDCurrency;
  }
  get EURCurrency() {
    return this._EURCurrency;
  }

  constructor(private  currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.isLoading$ = this.currencyService.isLoading;
  }

}
