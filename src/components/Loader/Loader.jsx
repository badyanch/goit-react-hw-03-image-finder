import { ThreeDots } from 'react-loader-spinner';

export const Loader = () => (
  <ThreeDots
    height="80"
    width="80"
    radius="9"
    color="#4d72a9"
    ariaLabel="three-dots-loading"
    wrapperStyle={{ display: 'flex', justifyContent: 'center' }}
    wrapperClassName=""
    visible={true}
  />
);
