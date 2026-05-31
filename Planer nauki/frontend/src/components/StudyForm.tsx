import React, { useState } from 'react';

interface StudyFormProps {
  onSessionAdded: () => void;
}

export const StudyForm: React.FC<StudyFormProps> = ({ onSessionAdded }) => {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState(25);
  const [difficulty, setDifficulty] = useState('MEDIUM');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    await fetch('http://localhost:5000/api/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, duration, difficulty }),
    });

    setTitle('');
    onSessionAdded();
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
      <h3>Dodaj nową sesję nauki</h3>
      <input type="text" placeholder="Czego będziesz się uczyć?" value={title} onChange={(e) => setTitle(e.target.value)} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
      <input type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value))} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} min="1" />
      <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
        <option value="LOW">Niski priorytet / Łatwe</option>
        <option value="MEDIUM">Średni priorytet</option>
        <option value="HIGH">Wysoki priorytet / Trudne</option>
      </select>
      <button type="submit" style={{ padding: '10px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Zaplanuj sesję</button>
    </form>
  );
};