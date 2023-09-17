import { Suspense, lazy, useRef } from 'react';
import { FaAngleUp } from 'react-icons/fa';

import withErrorAndLoader from '../hoc/withErrorAndLoader';
import Loader from '../components/Loader';
import useViewportWidth from '../hooks/useViewportWidth';
import useScrollUp from '../hooks/useScrollUp';

const Base = lazy(() => import("../components/Base"));
const CurrencyList = lazy(() => import("../components/CurrencyList"));
const Conversion = lazy(() => import("../components/Conversion"));
const Chart = lazy(() => import("../components/Chart"));

function Main(){
  const width = useViewportWidth();
  const buttonRef = useRef();
  const conversionRef = useRef();

  useScrollUp(buttonRef);

  return (
    <Suspense fallback={<Loader />}>
      <main className="container">
        <div className="wrapper">
          <Base conversionRef={conversionRef} />
          <CurrencyList />
        </div>
        <div className="wrapper fixed">
          <Conversion ref={conversionRef} />
          {width >= 768 && <Chart />}
        </div>
        <button ref={buttonRef} aria-label="Scroll up" className='scroll__button center'>
          <FaAngleUp className='icon' />
        </button>
      </main>
    </Suspense>
  )
}

export default withErrorAndLoader(Main);