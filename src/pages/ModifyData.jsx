import { useEffect, useState } from 'react';

export default function ModifyData() {
  const [cars, setCars] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    horsepower: '',
    year: ''
  });
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    fetch('https://muscle-cars-api.onrender.com/api/v1/muscle-cars')
      .then((res) => res.json())
      .then(setCars)
      .catch(console.error);
  }, []);

  const handleSelectChange = (e) => {
    const id = e.target.value;
    setSelectedId(id);
    const car = cars.find(c => c.id === parseInt(id));
    if (car) {
      setFormData({
        make: car.make,
        model: car.model,
        horsepower: car.horsepower,
        year: car.year
      });
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`https://muscle-cars-api.onrender.com/api/v1/muscle-cars/${selectedId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then(res => {
        if (!res.ok) throw new Error('Update failed');
        return res.json();
      })
      .then(() => {
        setUpdated(true);
        setTimeout(() => setUpdated(false), 3000);
      })
      .catch(err => {
        console.error('PUT error:', err);
        alert('Failed to update record.');
      });
  };

  return (
    <div>
      <h2>Update a Muscle Car</h2>

      <select value={selectedId} onChange={handleSelectChange}>
        <option value="">Select a car</option>
        {cars.map((car) => (
          <option key={car.id} value={car.id}>
            {car.make} {car.model} ({car.year})
          </option>
        ))}
      </select>

      {selectedId && (
        <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
          <input
            name="make"
            value={formData.make}
            onChange={handleInputChange}
            placeholder="Make"
            required
          />
          <input
            name="model"
            value={formData.model}
            onChange={handleInputChange}
            placeholder="Model"
            required
          />
          <input
            name="horsepower"
            value={formData.horsepower}
            onChange={handleInputChange}
            placeholder="Horsepower"
            required
          />
          <input
            name="year"
            value={formData.year}
            onChange={handleInputChange}
            placeholder="Year"
            required
          />
          <button type="submit">Update Car</button>
        </form>
      )}

      {updated && <p style={{ color: 'green' }}>Record has been updated.</p>}
    </div>
  );
}