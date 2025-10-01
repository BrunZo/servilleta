import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/globals.css';
import ContentsNavbar from '@/components/layout/ContentsNavbar';
import { getSections } from '@/lib/dataLoader';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Servilleta',
  description: '',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sections = await getSections();
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col lg:flex-row min-h-screen">
          <ContentsNavbar sections={sections}/>
          <main className="flex-grow bg-gray-50">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
