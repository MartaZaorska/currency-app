import { useState, useMemo, forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { CgArrowsExchange } from 'react-icons/cg';

import { setChartSymbol } from '../store/currencySlice';
import { fixed } from '../utils';

function Conversion(_, ref) {
  const [value, setValue] = useState(100);

  const { rates, chart, base } = useSelector(state => state.currency);
  const dispatch = useDispatch();

  const conversionValue = useMemo(() => {
    const conversionCurrency = rates.find(item => item.symbol === chart);
    return conversionCurrency ? fixed(value * conversionCurrency.currentValue, 2) : 0;
  }, [value, rates, chart])

  return (
    <section ref={ref} className="conversion">
      <div className='conversion__content'>
        <input
          type='number'
          id="amount"
          className='conversion__value'
          value={value}
          onChange={(e) => setValue(+e.target.value)}
          min='1'
          step='1'
        />
        <div className='conversion__symbol'>
          <select
            className="conversion__select"
            value={chart}
            onChange={(e) => dispatch(setChartSymbol(e.target.value))}
          >
            {rates.map((item) => (
              <option value={item.symbol} key={`conversion-${item.symbol}`}>
                {item.symbol}
              </option>
            ))}
          </select>
        </div>
      </div>
      <label htmlFor="amount">
        <div className='conversion__icon center'>
          <CgArrowsExchange className='icon' />
        </div>
      </label>
      <section className='conversion__content'>
        <p className='conversion__value'>{conversionValue}</p>
        <p className="conversion__symbol"><span>{base}</span></p>
      </section>
    </section>
  )
}

export default forwardRef(Conversion);