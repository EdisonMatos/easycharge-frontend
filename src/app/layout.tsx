import React, { ReactNode } from 'react';
import AppWrappers from './AppWrappers';
import SessionWrappers from './SessionWrappers';
import RootHead from './head';

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <RootHead />
      <body id={'root'}>
        <SessionWrappers>
          <AppWrappers>{children}</AppWrappers>
        </SessionWrappers>
      </body>
    </html>
  );
}
