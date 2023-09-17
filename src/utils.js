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
  const labels = Object.keys(data.rates).map(date => formatDate(date));
  const rates = {};

  const ratesData = Object.values(data.rates);

  Object.entries(currency).filter(([symbol]) => symbol !== data.base).forEach(([symbol, name]) => {
    rates[symbol] = {
      datasets: [{ data: [], label: symbol }],
      symbol,
      name
    };

    ratesData.forEach(ratesItem => 
      rates[symbol].datasets[0].data.push(formatRateValue(ratesItem[symbol], 5))
    );

    const [ prevDay ] = getStartAndEndDates(1, Date.now());
    const currentValue = formatRateValue(data.rates[data.end_date][symbol], 4);
    const prevDayValue = formatRateValue(data.rates[prevDay][symbol], 4);

    rates[symbol].currentValue = currentValue;
    rates[symbol].change = getChangeRate(currentValue, prevDayValue);
  });

  return { 
    labels, 
    rates: Object.values(rates), 
    updatedAt: formatDate(data.end_date), 
    base: data.base 
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