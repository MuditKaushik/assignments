import { ICountryDetails } from '@/app/model/country';
import dynamic from 'next/dynamic';

const CountryHome = dynamic(() => import('./_components/home/country-home'), { ssr: false });

async function getCountries(): Promise<ICountryDetails[]> {
  return await fetch('http:localhost:3000/api/country').then(response => response.json());
}

export default async function CountryPage() {
  const countryList: ICountryDetails[] = await getCountries();
  return (
    (countryList.length > 0) && <CountryHome countries={countryList} key={'country_home'} /> 
  );
};