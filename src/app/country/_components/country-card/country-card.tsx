'use client';
import Image from 'next/image';
import countryStyle from './country-card.module.css';
import { ICountryDetails } from '@/app/model/country';
import { useState } from 'react';

interface ICountryCardProps {
  country: ICountryDetails;
};

export default function CountryCard({ country }: ICountryCardProps) {
  const [detailView, setDetailsView] = useState<boolean>(false);
  return (
    <div className="card">
      {country.flag && <Image src={country.flag} width={0} height={0} className={`card-img-top ${countryStyle.countryFlag}`} alt='...' priority />}
      <div className='card-body'>
        <h5 className='card-title'>{country.name}</h5>
        {
          detailView ?
            <a href='#' style={{textDecoration: 'none'}} onClick={(e) => { e.preventDefault(); setDetailsView(false); }}>hide</a> :
            <a href='#' style={{textDecoration: 'none'}} onClick={(e) => { e.preventDefault(); setDetailsView(true); }}>details</a>
        }
      </div>
      <ul className={`list-group list-group-flush ${countryStyle.detailsFontSize}`}>
        <li className="list-group-item">
          <span>Region</span>: <i><strong>{country.region}</strong></i>
        </li>
        <li className="list-group-item">
          <span>Capital{country.capitals.length > 1 && <span>s</span>}</span>: <i><strong>{country.capitals.toString()}</strong></i>
        </li>
        <li className="list-group-item">
          <span>Population</span>: <i><strong>{country.population}</strong></i>
        </li>
        {
          detailView && <>
            <li className="list-group-item d-flex justify-content-between">
              <span>
                Currency: <i><strong>{country.currency.name}</strong></i>
              </span>
              <span>
                Symbol: <i><strong>{country.currency.symbol}</strong></i>
              </span>
            </li>
            <li className="list-group-item">
              <span>Language{country.languages.length > 1 && <span>s</span>}</span>: <i><strong>{country.languages.toString()}</strong></i>
            </li>
            <li className="list-group-item">
              <span>Timezone{country.timezones.length > 1 && <span>s</span>}</span>: <i><strong>{country.timezones.toString()}</strong></i>
            </li>
          </>
        }
      </ul>
    </div>
  );
}