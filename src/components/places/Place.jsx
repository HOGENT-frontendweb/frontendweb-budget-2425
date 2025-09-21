// src/components/places/Place.jsx
import StarRating from './StarRating';
import {Link} from 'react-router-dom';
import {IoTrashOutline} from 'react-icons/io5';
import {memo, useCallback} from 'react';
import {useThemeColors} from '../../contexts/theme';

const PlaceMemoized = memo(function Place({id, name, rating, onDelete, onRate}) {
  const {theme, textTheme} = useThemeColors();

  const handleRate = useCallback((newRating) => {
    onRate({id, name, rating: newRating});
  }, [id, name, onRate]);

  const handleDelete = useCallback(() => {
    onDelete(id);
  }, [id, onDelete]);

  return (
    <div className="p-3 border rounded-md mb-4">
      <h5 className="text-xl mb-1"><Link className="text-blue-600 underline" to={`/places/${id}`}>{name}</Link></h5>
      <StarRating selectedStars={rating} onRate={handleRate}/>
      <button className='mt-6 py-2 px-2.5 rounded-md bg-blue-600' onClick={handleDelete}>
        <IoTrashOutline/>
      </button>
    </div>
  );
});

export default PlaceMemoized;
