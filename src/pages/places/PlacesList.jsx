import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import PlacesCards from '../../components/places/PlacesCards';
import { getAll, save, deleteById } from '../../api';
import AsyncData from '../../components/AsyncData';

export default function PlacesList() {
  const { data, error, isLoading } = useSWR('places', getAll);

  const { data: favorites = [], error: errorFavorites, isLoading: isLoadingFavorites } = useSWR('users/me/favoriteplaces', getAll);

  const { trigger: deletePlace, error: deleteError } = useSWRMutation('places', deleteById);

  const { trigger: savePlace, error: saveError } = useSWRMutation('places', save);

  console.log('list', favorites);
  return (
    <>
      <h1 className="mb-4">Places</h1>

      <AsyncData loading={isLoading || isLoadingFavorites} error={error || deleteError || saveError || errorFavorites}>
        <PlacesCards places={data} onRate={savePlace} onDelete={deletePlace} favorites={favorites} />
      </AsyncData>
    </>
  );
}
