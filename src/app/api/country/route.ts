import { ICountryDetails, ICurrency } from '@/app/model/country';
import { NextResponse } from 'next/server';
const countryUrl: string = `https://restcountries.com/v3.1/all`;

function countryDetailsMapper(CountryDataList: Array<Record<string, never>>): Array<ICountryDetails> {
  const countries: Array<ICountryDetails> = [];
  for (const country of CountryDataList) {
    const countryLanguage = (country.languages) ? country.languages : {},
      currencyData = (country.currencies) ? country.currencies : {},
      countryCurrency: ICurrency = { name: String(), symbol: String() },
      spokenLanguages: Array<string> = [];
    for (const key in currencyData) {
      const currency = currencyData[key];
      countryCurrency.name = currency['name'] || String();
      countryCurrency.symbol = currency['symbol'] || String();
    }
    for (const key in countryLanguage) {
      spokenLanguages.push(countryLanguage[key]);
    }
    const details: ICountryDetails = {
      name: country['name']['official'] || String(),
      capitals: country['capital'] || [],
      currency: countryCurrency,
      languages: spokenLanguages,
      flag: country['flags']['svg'] || String(),
      population: country['population'] || Number(),
      region: country['region'] || String(),
      timezones: country['timezones'] || Array<string>
    };
    countries.push(details);
  }
  return countries;
}

export async function GET() {
  const countries = await fetch(countryUrl, { cache: 'force-cache' })
    .then((response) => {
      return (response.ok) ? response.json() : [];
    }).then(data => countryDetailsMapper(data));
  return NextResponse.json(countries);
}; 