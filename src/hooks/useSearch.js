import { useState, useTransition } from "react";

function useSearch(data){
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [isPending, startTransition] = useTransition();

  function changeQuery(newValue){
    setQuery(newValue);
    startTransition(() => {
      if(newValue === "") setFilteredData(data);
      else setFilteredData(data.filter(item => 
        [item.symbol, item.name].join('').toLowerCase().includes(newValue.toLowerCase())
      ));
    });
  }

  return { data: filteredData, isPending, query, changeQuery };
}

export default useSearch;