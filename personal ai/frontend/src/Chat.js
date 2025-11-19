import React, { useState } from 'react';

export default function Chat() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hello! How can I help you with coding today?' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { from: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);

    const response = await fetch('http://localhost:3001/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    });

    const data = await response.json();
    setMessages(prev => [...prev, { from: 'bot', text: data.reply }]);
    setInput('');
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', fontFamily: 'sans-serif' }}>
      <div style={{
        border: '1px solid #ddd',
        padding: 10,
        height: 400,
        overflowY: 'scroll',
        marginBottom: 10
      }}>
        {messages.map((m, i) => (
          <div key={i}
            style={{ textAlign: m.from === 'user' ? 'right' : 'left', margin: 8 }}>
            <b>{m.from}:</b> {m.text}
          </div>
        ))}
      </div>
      <input
        style={{ width: '80%', padding: 8 }}
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && sendMessage()}
        placeholder="Ask about coding..."
      />
      <button onClick={sendMessage} style={{ padding: 8 }}>Send</button>
    </div>
  );
}
