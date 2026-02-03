import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Media Gallery - Google Drive',
  description: 'Koleksi video dan foto dari Google Drive',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
