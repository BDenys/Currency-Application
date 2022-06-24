import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable,  } from 'rxjs';
import { ICurrency, ICurrencyResponse, ICurrencyData } from 'src/app/shared/models/currency.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private _isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public get isLoading() {
    return this._isLoading.asObservable();
  }

  private setIsLoading() {
    this._isLoading.next(!this._isLoading.value);
  }

  constructor(private http: HttpClient) { }

  fetchCurrency(): Observable<ICurrencyData[]> {
    this.setIsLoading();
    return this.http.get<ICurrencyResponse>(`https://api.currencyapi.com/v3/latest?apikey=${environment.currencyApiKey}`)
    .pipe(
      map((currencyResponse: ICurrencyResponse): ICurrencyData[] => {
        const data: ICurrency[] = [];
        const keys = Object.keys(currencyResponse.data);
        const values = Object.values(currencyResponse.data);

        for (let index = 0; index < keys.length; index++) {
          const currency = { code: keys[index], value: values[index].value};
          data.push(currency);
        }
        this.setIsLoading();
        return data;
      }),
    )
  }
}
