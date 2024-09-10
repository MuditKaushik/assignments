'use client';
interface ICountryFilter {
  sortHandlerByPopulation: (sort: 'asc' | 'desc') => void;
  searchByText: (text: string, searchFor: 'region' | 'nameCapital') => void;
};
export default function CountryFilter(props: ICountryFilter) {
  return (
    <ul className="list-group">
      <li className="list-group-item">
        Sorted by population:
        <div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" onChange={() => props.sortHandlerByPopulation('asc')} name="population-sort" id="population-asc" />
            <label className="form-check-label" htmlFor="population-asc">
              Ascending
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="population-sort" onChange={() => props.sortHandlerByPopulation('desc')} id="population-desc" />
            <label className="form-check-label" htmlFor="population-desc">
              Descending
            </label>
          </div>
        </div>
      </li>
      <li className="list-group-item">
        <span className="mb-1">Search country by region:</span>
        <input className="form-control" type="text" placeholder="Region" onChange={(e) => { props.searchByText(e.currentTarget.value, 'region') }} aria-label="default input example" />
      </li>
      <li className="list-group-item">
        <span className="mb-1">Search country by Name/Capital:</span>
        <input className="form-control" type="text" placeholder="Name or Capital" onChange={(e) => { props.searchByText(e.currentTarget.value, 'nameCapital') }} aria-label="default input example" />
      </li>
    </ul>
  );
};
