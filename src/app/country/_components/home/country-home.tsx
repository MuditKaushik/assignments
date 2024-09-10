'use client';
import { ICountryDetails } from '@/app/model/country';
import { useEffect, useMemo, useRef, useState } from 'react';
import CountryCard from '../country-card/country-card';
import CountryFilter from '../filters/country-filter';

interface ICountryData {
  countries: Array<ICountryDetails>;
};

export default function CountryHome(props: ICountryData) {
  const savedCountries = useRef<Array<ICountryDetails>>(props.countries);
  const [sort, setSort] = useState<'asc' | 'desc'>();
  const [countries, setCountries] = useState<Array<ICountryDetails>>(savedCountries.current);

  const countrySortByPopulation = (sort: 'asc' | 'desc') => {
    const sortedCountry = savedCountries.current.toSorted((a, b) => {
      return (sort === 'asc') ? a.population - b.population : b.population - a.population;
    });
    setCountries(sortedCountry);
  };

  const countrySearchByText = (region: string, searchFor: 'region' | 'nameCapital') => {
    if (region.trim().length > 0) {
      switch (searchFor) {
        case 'region':
          setCountries(savedCountries.current.filter(country => country.region.toLowerCase().includes(region.toLowerCase())));
          break
        case 'nameCapital':
          setCountries(savedCountries.current.filter(country => country.capitals.find(item => item.toLowerCase().includes(region.toLowerCase())) || country.name.toLowerCase().includes(region.toLowerCase())));
          break
        default: break
      }
    } else if (sort) {
      countrySortByPopulation(sort);
    } else {
      setCountries(savedCountries.current);
    }
  };

  useMemo(() => {
    if (sort) {
      countrySortByPopulation(sort);
    }
  }, [sort]);

  useEffect(() => {
    const pageScroll = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.boundingClientRect.bottom) {
          // Infinite scroll implementation.
        }
      });
    }, { root: null, rootMargin: '0px', threshold: 0.19 });
    pageScroll.observe(document.body);
  });

  return (
    <div className='row mt-2'>
      <div className='col-3'>
        <div className='position-sticky' style={{ top: '4rem' }}>
          <CountryFilter
            sortHandlerByPopulation={setSort}
            searchByText={countrySearchByText}
          />
        </div>
      </div>
      <div className='col-9'>
        <div className='row'>
          {
            (countries.length > 0) ?
              countries.map((country, index) =>
                <div className='col-3 mb-2' key={index}>
                  <CountryCard country={country} key={country.name} />
                </div>
              ) :
              <div className="alert alert-secondary" role="alert">
                No country found!!!!
              </div>
          }
        </div>
      </div>
    </div>
  );
};