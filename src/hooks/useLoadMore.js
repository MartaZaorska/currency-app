import { useState, useCallback } from 'react';

function useLoadMore(total, start, amount = start){
  const [visible, setVisible] = useState(start);

  const collapse = useCallback(() => setVisible(start), [start]);
  const expand = useCallback(() => setVisible(prev => Math.min(prev + amount, total)), [amount, total]);

  return { visible, collapse, expand };
}

export default useLoadMore;