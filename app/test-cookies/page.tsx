// app/test-cookies/page.tsx
"use client";

import { useEffect, useState } from "react";

export default function TestCookies() {
  const [cookies, setCookies] = useState<string>('');

  useEffect(() => {
    // Mostrar todos os cookies
    setCookies(document.cookie);
  }, []);

  const checkAuth = async () => {
    const res = await fetch("/api/auth/me", {
      credentials: "include"
    });
    const data = await res.json();
    console.log("Test /auth/me:", data);
  };

  return (
    <div className="p-8">
      <h1>Teste de Cookies</h1>
      <pre>Cookies: {cookies}</pre>
      <button onClick={checkAuth} className="bg-blue-500 text-white p-2 rounded">
        Testar /auth/me
      </button>
    </div>
  );
}