"use client";

import React, { useEffect, useState } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { MyDocument } from '@/components/modules/pdf/document'; 
import { useRouter } from 'next/navigation';

const App = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleClick = () => {
    router.push(`dashboard/cv/6`);
  }

  return (
    <>
      <button onClick={handleClick}>Router</button>
      {isClient && (
        <PDFViewer className='w-[1000px] h-[800px]'>
          <MyDocument />
        </PDFViewer>
      )}
    </>
  );
};

export default App;