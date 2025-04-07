'use client';

import { useParams } from 'next/navigation';
import { kanbanCards } from '@/lib/mockData';

export default function EditorPage() {
  const { id } = useParams();
  const card = kanbanCards.find((item) => item.id === id);

  if (!card) {
    return <div style={{ padding: '2rem' }}>未找到对应的流程卡片</div>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>流程详情页</h1>
      <p><strong>ID：</strong>{card.id}</p >
      <p><strong>标题：</strong>{card.title}</p >
      <p><strong>描述：</strong>{card.description}</p >
      <p><strong>状态：</strong>{card.status}</p >
    </div>
  );
}