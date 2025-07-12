'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PaginationBar = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  const maxVisiblePages = 7;
  
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-gray-600 text-text-secondary hover:text-text-primary hover:border-customPrimary-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      
      {startPage > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
           className="px-3 py-2 rounded-lg border border-gray-600 text-text-secondary hover:text-text-primary hover:border-customPrimary-accent transition-colors"
          >
            1
          </button>
          {startPage > 2 && <span className="text-text-muted">...</span>}
        </>
      )}
      
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-2 rounded-lg border transition-colors ${
            page === currentPage
              ? 'bg-customPrimary-accent text-white border-customPrimary-accent'
              : 'border-gray-600 text-text-secondary hover:text-text-primary hover:border-customPrimary-accent'
          }`}
        >
          {page}
        </button>
      ))}
      
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="text-text-muted">...</span>}
          <button
            onClick={() => onPageChange(totalPages)}
           className="px-3 py-2 rounded-lg border border-gray-600 text-text-secondary hover:text-text-primary hover:border-customPrimary-accent transition-colors"
          >
            {totalPages}
          </button>
        </>
      )}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border border-gray-600 text-text-secondary hover:text-text-primary hover:border-customPrimary-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};

export default PaginationBar;