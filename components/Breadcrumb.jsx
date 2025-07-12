import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumb = ({ items }) => {
  return (
    <nav className="flex items-center space-x-2 text-sm text-text-muted mb-6">
      <Link href="/" className="flex items-center hover:text-text-primary transition-colors">
        <Home className="h-4 w-4 mr-1" />
        Home
      </Link>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <ChevronRight className="h-4 w-4" />
          {item.href ? (
            <Link href={item.href} className="hover:text-text-primary transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-text-primary">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;