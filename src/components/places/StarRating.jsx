// src/components/places/StarRating.jsx
import {IoStarSharp} from 'react-icons/io5';

const Star = ({index, selected = false, onSelect = (f) => f}) => {
  const handleSelect = () => {
    onSelect(index + 1);
  };

  return (
    <IoStarSharp color={selected ? 'yellow' : 'grey'} onClick={handleSelect}/>
  );
};

export default function StarRating({totalStars = 5, selectedStars = 0, onRate}) {
  const stars = [...new Array(totalStars)];
  return (
    <>
      <div className="flex">
        {stars.map((_, i) => (
          <Star
            key={i}
            index={i}
            selected={selectedStars > i}
            onSelect={onRate}
          />
        ))}
      </div>
      <p>
        {selectedStars} of {totalStars} stars
      </p>
    </>
  );
}
