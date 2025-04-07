import { useEffect, useState } from 'react';
import { Grid } from 'gridjs-react';
import 'gridjs/dist/theme/mermaid.css';

export default function ViewData() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch('https://muscle-cars-api.onrender.com/api/v1/muscle-cars')
      .then((res) => res.json())
      .then(setCars)
      .catch(console.error);
  }, []);

  const rows = cars.map(car => [car.id, car.make, car.model, car.horsepower, car.year]);

  return (
    <div>
      <h2>Muscle Cars</h2>
      <Grid
        data={rows}
        columns={['ID', 'Make', 'Model', 'Horsepower', 'Year']}
        search
        pagination={{ enabled: true, limit: 5 }}
        sort
      />
    </div>
  );
}
