import Place from './Place';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function PlacesCards({
  places, onRate, onDelete, favorites,
}) {

  console.log(favorites);
  if (places.length === 0) {
    return (
      <div className="alert alert-info">
        There are no places yet.
      </div>
    );
  }

  return (

    <Row className="g-3" xs={1} md={2} lg={3} >
      {places
        .sort((a, b) => a.name.toUpperCase().localeCompare(b.name.toUpperCase()))
        .map((p) => {
          console.log(favorites);
          const favorite = favorites.some((f) => f.id == p.id);
          console.log(favorite, p.id);
          return (
            <Col key={p.id} className="mb-3">
              <Place {...p} onRate={onRate} onDelete={onDelete} favorite={favorite} />
            </Col>
          );
        })}
    </Row>

  );
}