'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function WorkflowsPage() {
  const router = useRouter();

  useEffect(() => {
    // 页面加载后立即跳转到 /kanban 页面
    router.push('/kanban');
  }, [router]);

  return (
    <div style={{ padding: '20px' }}>
      <p>正在跳转到流程看板页面...</p >
    </div>
  );
}