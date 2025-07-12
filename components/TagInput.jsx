'use client';
import { useState, useRef } from 'react';
import { X, Plus } from 'lucide-react';
import { tagCategories } from '../data/mockData';

const TagInput = ({ selectedTags, onTagsChange, maxTags = 5 }) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  const handleInputChange = (value) => {
    setInputValue(value);
    
    if (value.trim()) {
      const filtered = tagCategories.filter(tag =>
        tag.toLowerCase().includes(value.toLowerCase()) &&
        !selectedTags.includes(tag)
      );
      setSuggestions(filtered.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const addTag = (tag) => {
    if (selectedTags.length < maxTags && !selectedTags.includes(tag)) {
      onTagsChange([...selectedTags, tag]);
    }
    setInputValue('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const removeTag = (tagToRemove) => {
    onTagsChange(selectedTags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (inputValue.trim() && suggestions.length > 0) {
        addTag(suggestions[0]);
      } else if (inputValue.trim()) {
        addTag(inputValue.trim());
      }
    } else if (e.key === 'Backspace' && !inputValue && selectedTags.length > 0) {
      removeTag(selectedTags[selectedTags.length - 1]);
    }
  };

  return (
    <div className="relative">
      <div className="flex flex-wrap gap-2 p-3 bg-customPrimary-bg border border-gray-600 rounded-lg focus-within:ring-2 focus-within:ring-customPrimary-accent focus-within:border-transparent">
        {selectedTags.map((tag) => (
          <span key={tag} className="tag flex items-center space-x-1">
            <span>{tag}</span>
            <button
              onClick={() => removeTag(tag)}
              className="hover:text-customPrimary-danger"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
        
        {selectedTags.length < maxTags && (
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => handleInputChange(inputValue)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder={selectedTags.length === 0 ? "Add tags..." : ""}
            className="flex-1 min-w-24 bg-transparent text-text-primary placeholder-text-muted outline-none"
          />
        )}
      </div>
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-customPrimary-card border border-gray-600 rounded-lg shadow-lg z-10 max-h-40 overflow-y-auto">
          {suggestions.map((tag) => (
            <button
              key={tag}
              onClick={() => addTag(tag)}
              className="w-full text-left px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-customPrimary-bg transition-colors flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>{tag}</span>
            </button>
          ))}
        </div>
      )}
      
      <div className="text-xs text-text-muted mt-2">
        {selectedTags.length}/{maxTags} tags selected
      </div>
    </div>
  );
};

export default TagInput;