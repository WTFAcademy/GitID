'use client'
import { useEffect, useRef } from 'react'

export default function Code() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code')
    console.log(code);
    window.opener.postMessage({ code }, window.location.origin);
    window.close()
  }, [])
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Done!
    </main>
  );
}
