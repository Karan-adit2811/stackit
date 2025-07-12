'use client';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';
import { useNotifications } from '@/contexts/NotificationContext';
import Navbar from '@/components/Navbar';
import Breadcrumb from '@/components/Breadcrumb';
import AnswerCard from '@/components/AnswerCard';
import RichTextEditor from '@/components/RichTextEditor';
import { ChevronUp, ChevronDown, MessageCircle } from 'lucide-react';
import { mockQuestions, mockAnswers } from '@/data/mockData';
import Link from 'next/link';

export default function QuestionDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [newAnswer, setNewAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  
  const question = mockQuestions.find(q => q.id === parseInt(id));
  const answers = mockAnswers[id] || [];

  if (!question) {
    return (
      <div className="min-h-screen bg-customPrimary-bg">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-text-primary">Question not found</h1>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  const handleSubmitAnswer = (e) => {
    e.preventDefault();
    if (!newAnswer.trim()) return;
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      // Add notification for demo
      addNotification({
        type: 'answer',
        message: `You answered the question "${question.title}"`,
        questionId: question.id,
        questionTitle: question.title
      });
      
      setNewAnswer('');
      setIsSubmitting(false);
    }, 1000);
  };

  const breadcrumbItems = [
    { label: question.title }
  ];

  return (
    <div className="min-h-screen bg-customPrimary-bg pt-16">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={breadcrumbItems} />

        {/* Question */}
        <div className="card mb-8">
          <div className="flex gap-6">
            {/* Vote Section */}
            <div className="flex flex-col items-center space-y-2 min-w-0">
              <button className="p-1 hover:bg-customPrimary-bg rounded transition-colors">
                <ChevronUp className="h-6 w-6 text-text-muted hover:text-customPrimary-accent" />
              </button>
              <span className="text-text-primary font-bold text-lg">{question.votes}</span>
              <button className="p-1 hover:bg-customPrimary-bg rounded transition-colors">
                <ChevronDown className="h-6 w-6 text-text-muted hover:text-customPrimary-danger" />
              </button>
            </div>

            {/* Question Content */}
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold text-text-primary mb-4">
                {question.title}
              </h1>
              
              <div className="text-text-secondary mb-6 leading-relaxed">
                {question.description}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {question.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Meta Info */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4 text-text-muted">
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>{answers.length} answers</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-text-muted">asked {formatDate(question.createdAt)}</div>
                  <div className="text-customPrimary-accent font-medium">{question.author}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Answers */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-text-primary mb-6">
            {answers.length} {answers.length === 1 ? 'Answer' : 'Answers'}
          </h2>
          
          <div className="space-y-6">
            {answers.map((answer) => (
              <AnswerCard key={answer.id} answer={answer} />
            ))}
          </div>
        </div>

        {/* Submit Answer */}
        <div className="card">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Your Answer</h3>
          
          {user ? (
            <form onSubmit={handleSubmitAnswer}>
              <div className="mb-6">
                <RichTextEditor
                  value={newAnswer}
                  onChange={setNewAnswer}
                  placeholder="Write your answer here..."
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting || !newAnswer.trim()}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Answer'}
              </button>
            </form>
          ) : (
            <div className="bg-yellow-500 bg-opacity-10 border border-yellow-500 border-opacity-30 rounded-lg p-4">
              <p className="text-yellow-400 text-sm mb-4">
                ⚠️ Please login to submit or vote on answers.
              </p>
              <Link href="/login" className="btn-primary">
                Log In to Answer
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}