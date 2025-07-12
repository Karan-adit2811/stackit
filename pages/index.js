'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import QuestionCard from '@/components/QuestionCard';
import FilterDropdown from '@/components/FilterDropdown';
import PaginationBar from '@/components/PaginationBar';
import { mockQuestions } from '@/data/mockData';

const filterOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Active', value: 'active' },
  { label: 'Unanswered', value: 'unanswered' },
  { label: 'More', value: 'more' }
];

export default function Home() {
  const router = useRouter();
  const [questions, setQuestions] = useState(mockQuestions);
  const [filteredQuestions, setFilteredQuestions] = useState(mockQuestions);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState('newest');
  const questionsPerPage = 10;

  useEffect(() => {
    let filtered = [...questions];
    const { search } = router.query;

    // Apply search filter
    if (search) {
      filtered = filtered.filter(q => 
        q.title.toLowerCase().includes(search.toLowerCase()) ||
        q.description.toLowerCase().includes(search.toLowerCase()) ||
        q.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
      );
    }

    // Apply selected filter
    switch (selectedFilter) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'active':
        filtered.sort((a, b) => b.votes - a.votes);
        break;
      case 'unanswered':
        filtered = filtered.filter(q => !q.isAnswered);
        break;
      default:
        break;
    }

    setFilteredQuestions(filtered);
    setCurrentPage(1);
  }, [questions, selectedFilter, router.query]);

  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);
  const startIndex = (currentPage - 1) * questionsPerPage;
  const currentQuestions = filteredQuestions.slice(startIndex, startIndex + questionsPerPage);

  return (
    <div className="min-h-screen bg-customPrimary-bg pt-16">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">All Questions</h1>
            <p className="text-text-secondary mt-1">
              {filteredQuestions.length} questions
            </p>
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <FilterDropdown
              label="Filter"
              options={filterOptions}
              value={selectedFilter}
              onChange={setSelectedFilter}
            />
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {currentQuestions.length > 0 ? (
            currentQuestions.map((question) => (
              <QuestionCard key={question.id} question={question} />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-text-muted text-lg">No questions found</p>
              {router.query.search && (
                <p className="text-text-muted mt-2">
                  Try adjusting your search terms or clear the search filter
                </p>
              )}
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <PaginationBar
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}