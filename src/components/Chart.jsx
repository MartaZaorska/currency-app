import {  
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  defaults
} from 'chart.js';

import { Line } from 'react-chartjs-2';
import { OPTIONS_CHART } from "../data/constants";

import { useMemo } from 'react';
import { useSelector } from 'react-redux';

defaults.color = "#aaa";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip
);

function Chart() {
  const { labels, rates, chart } = useSelector(state => state.currency);

  const chartCurrency = useMemo(() => {
    return rates.find(rateItem => rateItem.symbol === chart);
  }, [rates, chart]);


  return (
    <section className='chart'>
      <header className='chart__header'>
        <p>
          {chartCurrency.symbol} ({chartCurrency.name})
        </p>
        <p>
          {labels[0]} -{' '}
          {labels[labels?.length - 1]}
        </p>
      </header>
      <div className='chart__content'>
        <Line data={{ labels, datasets: chartCurrency.datasets }} options={OPTIONS_CHART} />
      </div>
    </section>
  );
}

export default Chart