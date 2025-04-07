'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { kanbanCards as mockData } from '@/lib/mockData';

export default function MainPage() {
  const [cards, setCards] = useState([]);
  const router = useRouter();

  useEffect(() => {
    setCards(mockData);
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>流程列表</h1>
      {cards.map(card => (
        <div
          key={card.id}
          onClick={() => router.push(`/editor/${card.id}`)}
          style={{
            border: '1px solid #ccc',
            padding: '1rem',
            marginBottom: '1rem',
            cursor: 'pointer',
          }}
        >
          <h3>{card.title}</h3>
          <p>{card.description}</p >
          <p>状态：{card.status}</p >
        </div>
      ))}
    </div>
  );
}