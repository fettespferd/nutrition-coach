import React from 'react';

interface AmountSelectorProps {
  amount: number;
  unit: string;
  onChange: (amount: number) => void;
}

export default function AmountSelector({ amount, unit, onChange }: AmountSelectorProps) {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => onChange(Math.max(0, amount - 10))}
        className="p-1 rounded-full hover:bg-gray-100"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
        </svg>
      </button>
      
      <div className="flex items-center">
        <input
          type="number"
          value={amount}
          onChange={(e) => onChange(Math.max(0, parseInt(e.target.value) || 0))}
          className="w-16 text-center border rounded-lg py-1 px-2"
          min="0"
        />
        <span className="ml-1 text-gray-600">{unit}</span>
      </div>

      <button
        onClick={() => onChange(amount + 10)}
        className="p-1 rounded-full hover:bg-gray-100"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
} 