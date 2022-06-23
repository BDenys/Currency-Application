export interface ICurrency {
  code: string,
  value: number
}

export enum CurrencyStaticValue {
  USD = 'USD',
  EUR = 'EUR',
  UAH = 'UAH'
}

export interface ICurrencyResponse {
  data: ICurrencyData,
  meta: IResponseMeta
}

export interface ICurrencyData {
  code: string,
  value: number
}

export interface IResponseMeta {
  last_updated_at: string
}