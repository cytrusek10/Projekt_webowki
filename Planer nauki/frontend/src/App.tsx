import { useEffect, useState } from 'react';
import { StudyForm } from './components/StudyForm';
import { StudyList } from './components/StudyList';

export default function App() {
  const [sessions, setSessions] = useState([]);

  const fetchSessions = async () => {
    const res = await fetch('http://localhost:5000/api/sessions');
    const data = await res.json();
    setSessions(data);
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🧠 Inteligentny Planer Nauki</h1>
      <hr />
      <StudyForm onSessionAdded={fetchSessions} />
      <StudyList sessions={sessions} />
    </div>
  );
}