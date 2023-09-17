import { useLayoutEffect } from 'react';
import { debounce } from '../utils';

function useScrollUp(buttonRef) {
  useLayoutEffect(() => {
    if(buttonRef.current){
      buttonRef.current.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    }

    function scrollHandler(){
      if(buttonRef.current) buttonRef.current.classList.toggle("active", window.scrollY >= 200);
    }

    const scrollDebounceHandler = debounce(() => scrollHandler(), 200);

    window.addEventListener("scroll", scrollDebounceHandler);

    return () => window.removeEventListener("scroll", scrollDebounceHandler);
  }, [buttonRef]);
}

export default useScrollUp