'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { kanbanCards } from '@/lib/mockData';

export default function HomePage() {
  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`/editor/${id}`);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>流程列表</h1>
      {kanbanCards.map((card) => (
        <div
          key={card.id}
          style={{
            border: '1px solid #ccc',
            padding: '1rem',
            marginBottom: '1rem',
            cursor: 'pointer',
          }}
          onClick={() => handleClick(card.id)}
        >
          <h2>{card.title}</h2>
          <p>{card.description}</p >
          <p>状态：{card.status}</p >
        </div>
      ))}
    </div>
  );
}