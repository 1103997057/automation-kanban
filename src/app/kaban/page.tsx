'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { kanbanCards } from '@/lib/mockData';

export default function KanbanPage() {
  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`/editor/${id}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>流程看板</h1>
      {kanbanCards.map((card) => (
        <div
          key={card.id}
          style={{
            border: '1px solid #ccc',
            borderRadius: '5px',
            padding: '10px',
            marginBottom: '10px',
            cursor: 'pointer',
          }}
          onClick={() => handleClick(card.id)}
        >
          <h3>{card.title}</h3>
          <p>{card.description}</p >
          <p><strong>状态：</strong>{card.status}</p >
        </div>
      ))}
    </div>
  );
}