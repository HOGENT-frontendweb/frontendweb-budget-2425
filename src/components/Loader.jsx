// src/components/Loader.jsx
import Spinner from 'react-bootstrap/Spinner';

export default function Loader() {
  return (
    <div className='d-flex flex-column align-items-center' data-cy="loader">
      <Spinner animation="border" role="status">
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    </div>
  );
}
