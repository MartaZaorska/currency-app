import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { fetchCurrency } from './store/currencySlice';

import Main from './containers/Main';

function App() {
  const { loading, error, base } = useSelector(state => state.currency);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrency(base))
  }, [base]);
  
  return <Main loading={loading} error={error} />
}

export default App