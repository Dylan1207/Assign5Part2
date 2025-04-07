import { useState } from 'react';

export default function AddData() {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [horsepower, setHorsepower] = useState('');
  const [year, setYear] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCar = { make, model, horsepower, year };

    fetch('https://muscle-cars-api.onrender.com/api/v1/muscle-cars', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCar),
    })
      .then(async (res) => {
        const text = await res.text();
        console.log(res.status, text);
        if (!res.ok) throw new Error(text);
        return JSON.parse(text);
      })
      .then(() => {
        setSaved(true);
        setMake('');
        setModel('');
        setHorsepower('');
        setYear('');
        setTimeout(() => setSaved(false), 3000);
      })
      .catch((err) => {
        console.error('Error adding car:', err);
        alert('Failed to save record.');
      });
  };

  return (
    <div>
      <h2>Add a New Car</h2>
      <form onSubmit={handleSubmit}>
        <input value={make} onChange={(e) => setMake(e.target.value)} placeholder="Make" required />
        <input value={model} onChange={(e) => setModel(e.target.value)} placeholder="Model" required />
        <input value={horsepower} onChange={(e) => setHorsepower(e.target.value)} placeholder="Horsepower" required />
        <input value={year} onChange={(e) => setYear(e.target.value)} placeholder="Year" required />
        <button type="submit">Submit</button>
      </form>
      {saved && <p style={{ color: 'green' }}>Record has been saved.</p>}
    </div>
  );
}