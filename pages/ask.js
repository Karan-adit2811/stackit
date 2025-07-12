import Navbar from '@/components/Navbar';
import AskForm from '@/components/AskForm';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export default function AskQuestion() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-customPrimary-bg">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-text-primary mb-4">Please log in to ask a question</h1>
            <p className="text-text-secondary mb-6">You need to be logged in to post questions</p>
            <Link href="/login" className="btn-primary">
              Log In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-customPrimary-bg pt-16">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary">Ask a Question</h1>
          <p className="text-text-secondary mt-2">
            Get help from millions of developers worldwide
          </p>
        </div>

        <div className="card">
          <AskForm />
        </div>
      </div>
    </div>
  );
}