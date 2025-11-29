// app/debug-auth/page.tsx
"use client";

import { useState } from "react";

export default function DebugAuth() {
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toISOString()}: ${message}`]);
  };

  const testLogin = async () => {
    addLog("🔐 Iniciando teste de login...");
    
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "teste@gmail.com", // Use o email que você registrou
          password: "SuaSenha123!" // Use a senha que você registrou
        }),
        credentials: "include"
      });

      addLog(`📨 Status do login: ${res.status}`);
      const data = await res.json();
      addLog(`📦 Resposta do login: ${JSON.stringify(data)}`);

      // Verificar cookies
      addLog(`🍪 Cookies após login: ${document.cookie}`);

      if (res.ok) {
        // Testar /auth/me imediatamente após login
        await testAuthMe();
      }
    } catch (error) {
      addLog(`❌ Erro no login: ${error}`);
    }
  };

  const testAuthMe = async () => {
    addLog("🔍 Testando /api/auth/me...");
    
    try {
      const res = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include"
      });

      addLog(`📨 Status do /auth/me: ${res.status}`);
      const data = await res.json();
      addLog(`📦 Resposta do /auth/me: ${JSON.stringify(data)}`);
    } catch (error) {
      addLog(`❌ Erro no /auth/me: ${error}`);
    }
  };

  const clearCookies = () => {
    document.cookie.split(";").forEach(cookie => {
      const name = cookie.split("=")[0].trim();
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
    addLog("🧹 Todos os cookies foram limpos");
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Debug de Autenticação</h1>
      
      <div className="space-y-4 mb-6">
        <button 
          onClick={testLogin}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Testar Login
        </button>
        
        <button 
          onClick={testAuthMe}
          className="bg-green-500 text-white px-4 py-2 rounded ml-2"
        >
          Testar /auth/me
        </button>
        
        <button 
          onClick={clearCookies}
          className="bg-red-500 text-white px-4 py-2 rounded ml-2"
        >
          Limpar Cookies
        </button>
      </div>

      <div className="border p-4 rounded bg-gray-100">
        <h2 className="text-lg font-semibold mb-2">Logs:</h2>
        <div className="h-96 overflow-y-auto font-mono text-sm">
          {logs.map((log, index) => (
            <div key={index} className="mb-1">{log}</div>
          ))}
        </div>
      </div>
    </div>
  );
}