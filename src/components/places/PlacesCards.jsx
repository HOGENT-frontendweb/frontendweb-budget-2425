import Place from './Place';

export default function PlacesCards({places, onRate, onDelete}) {

  if (places.length === 0) {
    return (
      <div className="bg-cyan-100 text-cyan-800 p-3 rounded-lg">
        There are no places yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3">
      {places
        .sort((a, b) => a.name.toUpperCase().localeCompare(b.name.toUpperCase()))
        .map((p) => (
          <div key={p.id}>
            <Place {...p} onRate={onRate} onDelete={onDelete}/>
          </div>
        ))}
    </div>
  );
}