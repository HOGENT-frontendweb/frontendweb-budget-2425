import StarRating from './StarRating';
import { Link } from 'react-router-dom';
import { IoTrashOutline } from 'react-icons/io5';
import { memo, useCallback } from 'react';
import { useThemeColors } from '../../contexts/theme';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { IoHeart } from 'react-icons/io5';

const PlaceMemoized = memo(function Place({ id, name, rating, onDelete, onRate, favorite }) {
  const { theme } = useThemeColors();

  const handleRate = useCallback((newRating) => {
    onRate({ id, name, rating: newRating });
  }, [id, name, onRate]);

  const handleDelete = useCallback(() => {
    onDelete(id);
  }, [id, onDelete]);

  return (
    <Card
      data-bs-theme={theme}
      bg={theme}
      className="mb-4 position-relative"
    >
      <Button
        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', position: 'absolute', top: 15, right: 15, zIndex: 2 }}
        aria-label="Markeer als favoriet"
      >
        <IoHeart color={favorite ? 'red' : 'white'} size={24} />
      </Button>
      <Card.Body>
        <Card.Title>
          <Link to={`/places/${id}`}>{name}</Link>
        </Card.Title>
        <Card.Text>
          <StarRating selectedStars={rating} onRate={handleRate} />
        </Card.Text>
        <Button variant="primary" onClick={handleDelete}>
          <IoTrashOutline />
        </Button>
      </Card.Body>
    </Card>
  );
});

export default PlaceMemoized;
