'use client';
import { ChevronUp, ChevronDown } from 'lucide-react';

const AnswerCard = ({ answer }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="card">
      <div className="flex gap-6">
        {/* Vote Section */}
        <div className="flex flex-col items-center space-y-2 min-w-0">
          <button className="p-1 hover:bg-customPrimary-bg rounded transition-colors">
            <ChevronUp className="h-5 w-5 text-text-muted hover:text-customPrimary-accent" />
          </button>
          <span className="text-text-primary font-semibold">{answer.votes}</span>
          <button className="p-1 hover:bg-customPrimary-bg rounded transition-colors">
            <ChevronDown className="h-5 w-5 text-text-muted hover:text-customPrimary-danger" />
          </button>
        </div>

        {/* Answer Content */}
        <div className="flex-1 min-w-0">
          <div 
            className="prose prose-invert max-w-none text-text-secondary"
            dangerouslySetInnerHTML={{ __html: answer.content.replace(/\n/g, '<br>') }}
          />
          
          {/* Meta Info */}
          <div className="flex justify-end mt-6">
            <div className="text-right text-sm">
              <div className="text-text-muted">answered {formatDate(answer.createdAt)}</div>
              <div className="text-customPrimary-accent font-medium">{answer.author}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnswerCard;