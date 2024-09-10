export interface ICurrency {
  symbol: string;
  name: string;
};

export interface ICountryDetails {
  name: string;
  capitals: Array<string>;
  flag?:string;
  currency: ICurrency;
  languages: Array<string>;
  population: number;
  region: string;
  timezones: Array<string>;
};