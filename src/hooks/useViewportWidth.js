import { useEffect, useState } from "react";
import { debounce } from '../utils';

function useViewportWidth(){
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function resizeHandler(){ setWidth(window.innerWidth); }
    const resizeDebounceHandler = debounce(() => resizeHandler(), 500);
    
    window.addEventListener("resize", resizeDebounceHandler);

    return () => window.removeEventListener("resize", resizeDebounceHandler);
  }, []);

  return width;
}

export default useViewportWidth;