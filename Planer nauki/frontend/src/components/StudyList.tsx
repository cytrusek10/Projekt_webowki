import React from 'react';

interface Session {
  id: string;
  title: string;
  duration: number;
  difficulty: string;
  notification: string;
}

interface StudyListProps {
  sessions: Session[];
}

export const StudyList: React.FC<StudyListProps> = ({ sessions }) => {
  return (
    <div>
      <h3>Zaplanowane sesje</h3>
      {sessions.length === 0 ? <p>Brak zaplanowanych sesji nauki.</p> : null}
      <div style={{ display: 'grid', gap: '15px', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
        {sessions.map((session) => (
          <div key={session.id} style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
            <h4>{session.title}</h4>
            <p>Czas trwania: <strong>{session.duration} min</strong> | Poziom: {session.difficulty}</p>
            <div style={{ marginTop: '10px', padding: '8px', backgroundColor: '#E3F2FD', color: '#0D47A1', borderRadius: '4px', fontSize: '0.9rem' }}>
              💡 {session.notification}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};