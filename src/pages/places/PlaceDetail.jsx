// src/pages/places/PlaceDetail.jsx
import { useParams } from 'react-router-dom';
import { getById } from '../../api/index';
import useSWR from 'swr';
import TransactionsTable from '../../components/transactions/TransactionsTable';
import AsyncData from '../../components/AsyncData';

const PlaceDetail = () => {
  const { id } = useParams();
  const idAsNumber = Number(id);

  const {
    data: place,
    error: placeError,
    isLoading: placeLoading,
  } = useSWR(id ? `places/${idAsNumber}` : null, getById);

  if (!place) {
    return (
      <div>
        <h1>Plaats niet gevonden</h1>
        <p>Er is geen plaats met id {id}.</p>
      </div>
    );
  }

  return (
    <>
      <AsyncData loading={placeLoading} error={placeError}>
        <h1 className="mb-4">Place {place.name}</h1>
        <TransactionsTable transactions={place.transactions} />
      </AsyncData>
    </>
  );
};

export default PlaceDetail;
