import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CurrencyStaticValue, ICurrency, ICurrencyData } from 'src/app/shared/models/currency.model';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss']
})
export class HomeLayoutComponent implements OnInit, OnDestroy {

  public UAHCurrency!: ICurrency;
  public USDCurrency!: ICurrency;
  public EURCurrency!: ICurrency;

  public firstCurrencyAmount = 0;
  public firstCurrencyCode = '';

  public secondCurrencyAmount = 0;
  public secondCurrencyCode = '';

  public currencyData: ICurrency[] = [];

  public  isLoading$!: Observable<boolean>

  private sub!: Subscription;

  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {

    this.isLoading$ = this.currencyService.isLoading;

    this.sub = this.currencyService.fetchCurrency().subscribe((currencyResponse: ICurrencyData[] ) => {
        const firstCurrencyInit = currencyResponse.find((currency: ICurrency) => currency.code === CurrencyStaticValue.USD );
        const secondCurrencyInit = currencyResponse.find((currency: ICurrency) => currency.code === CurrencyStaticValue.UAH );

        currencyResponse.map((currency: ICurrency) => {
          switch(currency.code) {
           // @ts-ignore
            case CurrencyStaticValue.UAH:
              this.UAHCurrency = currency;
              this.firstCurrencyAmount = 1;
              this.firstCurrencyCode = firstCurrencyInit!.code;
              break;

            case CurrencyStaticValue.USD:
              this.USDCurrency = currency;
              this.secondCurrencyAmount = this.fixValue(secondCurrencyInit!.value);
              this.secondCurrencyCode = secondCurrencyInit!.code;
              break;

            case CurrencyStaticValue.EUR:
              this.EURCurrency = currency;
              break;

          }
        });

        this.currencyData = currencyResponse;

    });
  }

  changeHandler(event: any): void {
    let result;
    const { name } = event.target;
    const secondCurrencyAmount = 'secondCurrencyAmount';

    const firstFoundCurrency = this.currencyData.find((currency: ICurrency) => currency.code === this.firstCurrencyCode);
    const secondFoundCurrency = this.currencyData.find((currency: ICurrency) => currency.code === this.secondCurrencyCode);

    if ( name !== secondCurrencyAmount) {
      if ( this.firstCurrencyCode === this.secondCurrencyCode ) {
        this.secondCurrencyAmount = this.firstCurrencyAmount;

      } else {
        if ( firstFoundCurrency!.code !== CurrencyStaticValue.USD ) {
          const amountInAnotherCurrency  = secondFoundCurrency!.value / firstFoundCurrency!.value;
          result = this.fixValue(amountInAnotherCurrency * this.firstCurrencyAmount);
          this.secondCurrencyAmount = result;

        } else   {
          result = this.firstCurrencyAmount * secondFoundCurrency!.value;
          this.secondCurrencyAmount = this.fixValue(result);
        }
      }

    } else {
      if ( this.firstCurrencyCode === this.secondCurrencyCode) {
        this.secondCurrencyCode = this.firstCurrencyCode;

      } else {
        const currency = firstFoundCurrency!.value / secondFoundCurrency!.value;
        result = this.fixValue(currency * this.secondCurrencyAmount);
        this.firstCurrencyAmount = this.fixValue(result);
      }
    }
  }

  fixValue(value: number, characters: number = 2): number {
    return Number(value.toFixed( characters ));
  }

  ngOnDestroy(): void {
    if(this.sub) {
      this.sub.unsubscribe;
    }
  }

}
