'use client';

import { useTheme } from 'next-themes';
import { useEffect } from 'react';

export default function DarkTheme({ children }: {children: React.ReactNode}) {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme('dark'); //set your theme here after component mounts
  }, []);

  return <div>{children}</div>;
}