function getChangeRate(currRate, prevRate){
  return fixed((currRate * 100) / prevRate - 100);
}

function formatDate(date){
  const dateObject = new Date(date);
  return `${`${dateObject.getDate()}`.padStart(2, '0')}.${`${dateObject.getMonth() + 1}`.padStart(2, '0')}.${dateObject.getFullYear()}`;
}

function formatRateValue(rate, digits = 5){
  return fixed(1 / rate, digits);
}

export function fixed(value, digits = 3){
  return +value.toFixed(digits);
}

export function getStartAndEndDates(days = 7, endDate = Date.now()){
  const d2 = new Date(endDate).toISOString().slice(0, 10);
  const d1 = new Date(new Date(endDate).getTime() - 86400000 * days).toISOString().slice(0, 10);
  return [d1, d2];
}

export function formatCurrencyData(data, currency){
  const labels = Object.keys(data.quotes).map(date => formatDate(date));
  const rates = {};

  const ratesData = Object.values(data.quotes);
  const [ prev_day ] = getStartAndEndDates(1, Date.now());

  Object.entries(currency).filter(([symbol]) => symbol !== data.source).forEach(([symbol, name]) => {
    rates[symbol] = {
      datasets: [{ data: [], label: symbol }],
      symbol,
      name
    };

    const key = `${data.source}${symbol}`;

    ratesData.forEach(ratesItem => 
      rates[symbol].datasets[0].data.push(formatRateValue(ratesItem[key], 5))
    );

    const currentValue = formatRateValue(data.quotes[data.end_date][key], 4);
    const prevDayValue = formatRateValue(data.quotes[prev_day][key], 4);

    rates[symbol].currentValue = currentValue;
    rates[symbol].change = getChangeRate(currentValue, prevDayValue);
  });
  
  return { 
    labels, 
    rates: Object.values(rates), 
    updatedAt: formatDate(data.end_date), 
    base: data.source
  };
}


//debounce
export function debounce(cb, delay = 1000){
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => cb(...args), delay);
  }
}