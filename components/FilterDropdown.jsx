'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FilterDropdown = ({ label, options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-customPrimary-card border border-gray-600 rounded-lg text-text-primary hover:border-customPrimary-accent transition-colors"
      >
        <span>{value || label}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-customPrimary-card border border-gray-600 rounded-lg shadow-lg z-10">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className="w-full text-left px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-customPrimary-bg transition-colors first:rounded-t-lg last:rounded-b-lg"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;