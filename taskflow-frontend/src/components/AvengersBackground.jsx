import React from 'react';

const AvengersBackground = () => {
  const symbols = [
    // Shield
    <svg viewBox="0 0 100 100" width="80" height="80">
      <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="2" />
      <polygon points="50,25 58,45 78,45 62,58 68,78 50,65 32,78 38,58 22,45 42,45" fill="currentColor" />
    </svg>,
    // Arc Reactor
    <svg viewBox="0 0 100 100" width="80" height="80">
      <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="4" />
      <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M50 5 L50 95 M5 50 L95 50" stroke="currentColor" strokeWidth="1" />
      <circle cx="50" cy="50" r="10" fill="currentColor" />
    </svg>,
    // Hammer (Mjolnir)
    <svg viewBox="0 0 100 100" width="80" height="80">
      <rect x="30" y="20" width="40" height="25" fill="currentColor" />
      <rect x="45" y="45" width="10" height="35" fill="currentColor" />
      <rect x="42" y="80" width="16" height="5" fill="currentColor" />
    </svg>,
    // Black Widow
    <svg viewBox="0 0 100 100" width="80" height="80">
      <path d="M30 20 L70 20 L50 50 L70 80 L30 80 L50 50 Z" fill="currentColor" />
    </svg>,
    // Hulk Fist (simplified)
    <svg viewBox="0 0 100 100" width="80" height="80">
      <rect x="25" y="40" width="50" height="40" rx="10" fill="currentColor" />
      <rect x="30" y="30" width="10" height="20" rx="5" fill="currentColor" />
      <rect x="42" y="25" width="10" height="25" rx="5" fill="currentColor" />
      <rect x="54" y="25" width="10" height="25" rx="5" fill="currentColor" />
      <rect x="66" y="30" width="10" height="20" rx="5" fill="currentColor" />
    </svg>
  ];

  const items = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    symbol: symbols[i % symbols.length],
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 20}s`,
    duration: `${15 + Math.random() * 15}s`,
    size: 40 + Math.random() * 60
  }));

  return (
    <div className="avengers-bg">
      {items.map(item => (
        <div
          key={item.id}
          className="avenger-symbol"
          style={{
            left: item.left,
            animationDelay: item.delay,
            animationDuration: item.duration,
            color: 'var(--primary)',
            width: item.size,
            height: item.size
          }}
        >
          {item.symbol}
        </div>
      ))}
    </div>
  );
};

export default AvengersBackground;
