// app/layout.tsx 或 src/app/layout.tsx

'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react'; // 如果使用了 next-auth 来管理用户身份验证

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* 这里可以放一些 meta 标签、SEO 配置等 */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>My Application</title>
      </head>
      <body>
        <SessionProvider>
          {children} {/* 页面内容 */}
        </SessionProvider>
      </body>
    </html>
  );
}