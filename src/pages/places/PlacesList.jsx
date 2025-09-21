import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import PlacesCards from '../../components/places/PlacesCards';
import { getAll, save, deleteById } from '../../api';
import AsyncData from '../../components/AsyncData';

export default function PlacesList() {
  const { data, error, isLoading } = useSWR('places', getAll);

  const { trigger: deletePlace, error: deleteError } = useSWRMutation('places', deleteById);

  const { trigger: savePlace, error: saveError } = useSWRMutation('places', save);

  return (
    <>
      <h1 className="text-4xl mb-2">Places</h1>

      <AsyncData loading={isLoading} error={error || deleteError || saveError}>
        <PlacesCards places={data} onRate={savePlace} onDelete={deletePlace} />
      </AsyncData>
    </>
  );
}
