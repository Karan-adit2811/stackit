'use client';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';
import { useNotifications } from '@/contexts/NotificationContext';
import RichTextEditor from './RichTextEditor';
import TagInput from './TagInput';

const AskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { user } = useAuth();
  const { addNotification } = useNotifications();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim() || tags.length === 0) {
      alert('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // Add a notification for demo purposes
      addNotification({
        type: 'answer',
        message: `Your question "${title}" has been posted successfully!`,
        questionId: Date.now(),
        questionTitle: title
      });
      
      setIsSubmitting(false);
      router.push('/');
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-text-primary font-medium mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Be specific and imagine you're asking a question to another person"
          className="w-full px-4 py-3 bg-customPrimary-bg border border-gray-600 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-customPrimary-accent focus:border-transparent"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-text-primary font-medium mb-2">
          Description
        </label>
        <RichTextEditor
          value={description}
          onChange={setDescription}
          placeholder="Include all the information someone would need to answer your question"
        />
      </div>

      {/* Tags */}
      <div>
        <label className="block text-text-primary font-medium mb-2">
          Tags
        </label>
        <TagInput
          selectedTags={tags}
          onTagsChange={setTags}
          maxTags={5}
        />
        <p className="text-text-muted text-sm mt-2">
          Add up to 5 tags to describe what your question is about
        </p>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3"
        >
          {isSubmitting ? 'Posting...' : 'Post Your Question'}
        </button>
      </div>
    </form>
  );
};

export default AskForm;