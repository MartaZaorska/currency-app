import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { CgArrowDown, CgArrowUp } from 'react-icons/cg';
import { setChartSymbol } from '../store/currencySlice';

function CurrencyItem({ symbol, name, change, value }) {
  const dispatch = useDispatch();

  return (
    <article
      className="currency__item"
      onClick={() => dispatch(setChartSymbol(symbol))}
    >
      <div className="currency__rate"> 
        <h2>
          <span className='value'>{value}</span>{' '}
          <span className='symbol'>{symbol}</span>
        </h2>
        <p
          className={change < 0 ? 'change low' : 'change high'}
        >
          {change < 0 && <CgArrowDown className='icon' />}
          {change > 0 && <CgArrowUp className='icon' />}
          {change !== 0 && `${Math.abs(change)}%`}
        </p>
      </div>
      <p className='currency__name'>{name}</p>
    </article>  
  );
}

export default memo(CurrencyItem)