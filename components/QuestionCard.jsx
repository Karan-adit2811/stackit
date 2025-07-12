'use client';
import Link from 'next/link';
import { ChevronUp, ChevronDown, MessageCircle } from 'lucide-react';

const QuestionCard = ({ question }) => {
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
    <div className="card hover:border-customPrimary-accent hover:border-opacity-50 transition-all duration-200">
      {/* Vote Section */}
      <div className="flex gap-6">
        <div className="flex flex-col items-center space-y-2 min-w-0">
          <button className="p-1 hover:bg-customPrimary-bg rounded transition-colors">
            <ChevronUp className="h-5 w-5 text-text-muted hover:text-customPrimary-accent" />
          </button>
          <span className="text-text-primary font-semibold">{question.votes}</span>
          <button className="p-1 hover:bg-customPrimary-bg rounded transition-colors">
            <ChevronDown className="h-5 w-5 text-text-muted hover:text-customPrimary-danger" />
          </button>
        </div>

        {/* Question Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <Link 
                href={`/question/${question.id}`}
                className="text-lg font-semibold text-text-primary hover:text-customPrimary-accent transition-colors line-clamp-2 block"
              >
                {question.title}
              </Link>
              <p className="text-text-secondary mt-2 line-clamp-2">
                {question.description}
              </p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {question.tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
          </div>

          {/* Meta Info */}
          <div className="flex items-center justify-between mt-4 text-sm">
            <div className="flex items-center space-x-4 text-text-muted">
              <div className="flex items-center space-x-1">
                <MessageCircle className="h-4 w-4" />
                <span>{question.answers} answers</span>
              </div>
              {question.isAnswered && (
                <span className="text-green-400 text-xs bg-green-400 bg-opacity-20 px-2 py-1 rounded">
                  ✓ Answered
                </span>
              )}
            </div>
            <div className="text-right">
              <div className="text-text-muted">asked {formatDate(question.createdAt)}</div>
              <div className="text-customPrimary-accent font-medium">{question.author}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;