import { useSelector, useDispatch } from 'react-redux';
import { CgArrowsExchange } from 'react-icons/cg';

import { setBase } from '../store/currencySlice';

function Base({ conversionRef }) {
  const { rates, base } = useSelector(state => state.currency);
  const dispatch = useDispatch();

  const scrollToConversion = () => {
    if(conversionRef.current){
      window.scrollTo({
        top: conversionRef.current.getBoundingClientRect().top,
        behavior: 'smooth'
      });
    }
  }

  return (
    <section className="base">
      <header className="base__header">
        <h1 className="base__title">Kurs dla </h1>    
        <select className="base__select" value={base} onChange={(e) => dispatch(setBase(e.target.value))}>
          <option value={base} key={base}>{base}</option>
          {rates.map(item => (
            <option value={item.symbol} key={`base-${item.symbol}`}>{item.symbol}</option>
          ))}
        </select>
      </header>
      <button className='mobile conversion__icon center' aria-label="Scroll to conversion" onClick={scrollToConversion}>
        <CgArrowsExchange className='icon' />
      </button>
    </section>
  )
}

export default Base
