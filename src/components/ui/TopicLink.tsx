import React from 'react';
import Link from 'next/link';

interface TopicLinkProps {
  title: string;
  href: string;
}

const TopicLink: React.FC<TopicLinkProps> = ({ title, href }) => {
  return (
    <Link 
      href={href}
      className="block p-2 rounded bg-gray-100 hover:bg-blue-100 transition-colors text-blue-600 hover:text-blue-800"
    >
      {title}
    </Link>
  );
};

export default TopicLink;