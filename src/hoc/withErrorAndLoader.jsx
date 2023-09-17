import Loader from '../components/Loader';
import Error from '../components/Error';

const withErrorAndLoader = (Component) => {
  return (props) => {
    const { error, loading, ...restProps } = props;

    if(error) return <Error error={error} />
    if(loading) return <Loader />
    
    return <Component {...restProps} />
  }
}

export default withErrorAndLoader;