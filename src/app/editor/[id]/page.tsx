'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { kanbanCards } from '@/lib/mockData';

export default function EditorPage({ params }: { params: { id: string } }) {
  const [cardData, setCardData] = useState<any | null>(null);
  const router = useRouter();

  useEffect(() => {
    const card = kanbanCards.find((item) => item.id === params.id);
    if (card) {
      setCardData(card);
    } else {
      router.push('/workflows'); // 跳转回看板页
    }
  }, [params.id]);

  if (!cardData) return <div>加载中...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>流程详情页</h1>
      <p><strong>编号：</strong>{cardData.id}</p >
      <p><strong>标题：</strong>{cardData.title}</p >
      <p><strong>描述：</strong>{cardData.description}</p >
      <p><strong>状态：</strong>{cardData.status}</p >
    </div>
  );
}