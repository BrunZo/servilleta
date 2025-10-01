import React from 'react';
import Link from 'next/link';

interface TimelineItemProps {
  title: string;
  description: string;
  link: string;
  index: number;
}

function TimelineItem({ title, description, link, index } : TimelineItemProps) {
  return (
    <div key={index} className="relative">
      <div 
        className={`absolute left-4 top-6 md:left-0 transform -translate-x-[50%] -translate-y-[50%] 
                    w-6 h-6 rounded-full bg-white border-2 border-blue-600 z-10 shadow-sm`}
      />
      
      <div className='relative ml-12 md:ml-0 md:pl-8 text-left'>
        <Link 
          href={link}
          className='group inline-block rounded-lg hover:bg-blue-50 hover:text-blue-800 w-full p-3 transition-all duration-200 border border-transparent hover:border-blue-200'
        >
          <h3 className="text-lg font-medium">{title}</h3>
          <p className="text-sm text-gray-600 group-hover:text-blue-700 transition-colors mt-1">{description}</p>
        </Link>
      </div>
    </div>
  );
};

interface TimelineProps {
  items: Array<{
    title: string;
    sectionIndex?: number;
    subitems?: Array<{
      title: string;
      description: string;
      link: string;
    }>;
  }>;
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative max-w-3xl mx-auto">
      <div 
        id='timeline-skeleton'
        className={`absolute left-4 md:left-1/2 transform md:-translate-x-1/2 
                    top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-blue-400`}
      />
      
      <div className="space-y-12">
        {items.map((item, index) => (
          <div 
            key={index} 
            className="flex flex-col md:flex-row items-start justify-between"
          >
            <div className='flex-1'>
              <div className='text-right ml-12 md:mr-12 mt-2'>
                <div className="flex items-center justify-end mb-4">
                  {item.sectionIndex && (
                    <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold mr-4 shadow-md">
                      {item.sectionIndex}
                    </div>
                  )}
                  <h1 className='text-2xl font-semibold text-gray-800'>{item.title}</h1>
                </div>
              </div>
            </div> 
            <div className='flex flex-col flex-1 gap-2'>
              {item.subitems?.map((subitem, subindex) => (
                <TimelineItem
                  key={subindex}
                  index={subindex}
                  title={subitem.title}
                  description={subitem.description}
                  link={subitem.link}
                />
              ))}  
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};