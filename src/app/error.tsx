'use client'

import React from 'react'

export default function GlobalError({ error }: { error: Error }) {
  return (
    <html>
      <body>
        <h2>出现错误：</h2>
        <pre>{error.message}</pre>
      </body>
    </html>
  )
}