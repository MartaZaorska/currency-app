import { useSelector } from "react-redux";
import { CgSearch } from 'react-icons/cg';

import useSearch from '../hooks/useSearch';
import useLoadMore from '../hooks/useLoadMore';

import CurrencyItem from './CurrencyItem';

function CurrencyList() {
  const { rates, updatedAt } = useSelector(state => state.currency);
  const { query, changeQuery, data } = useSearch(rates);

  const { visible, collapse, expand } = useLoadMore(data.length, 20);

  return (
    <section className="currency">
      <header className="currency__header">
        <div className='currency__search'>
          <input
            type='text'
            id="search"
            placeholder='Szukaj'
            value={query}
            onChange={(e) => changeQuery(e.target.value)}
          />
          <label htmlFor="search"><CgSearch className='icon' /></label>
        </div>
        <p>Aktualizacja {updatedAt || ''}</p>
      </header>
      <div className="currency__list">
        {data.slice(0, visible).map((item) => (
          <CurrencyItem
            symbol={item.symbol}
            name={item.name}
            change={item.change}
            value={item.currentValue}
            key={item.symbol}
          />
        ))}
      </div>
      {data.length > 20 && (
        <div className="currency__controls center">
          {visible === data.length ? (
            <button className="currency__button" onClick={collapse}>Zwiń</button>
          ) : (
            <button className="currency__button" onClick={expand}>Pokaż więcej</button>
          )}
        </div>
      )}
    </section>
  )
}

export default CurrencyList