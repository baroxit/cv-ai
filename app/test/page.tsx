"use client";

import React from 'react';
import ReactDOM from 'react-dom';
import { PDFViewer } from '@react-pdf/renderer';
import { MyDocument } from '@/components/modules/pdf/document'; 
import { useRouter } from 'next/navigation';

const App = () => {

  const router = useRouter();

  const handleClick = () => {
    router.push(`dashboard/cv/6`);
  }

  return (
    <>
    <button onClick={handleClick}>Router</button>
    <PDFViewer className='w-500'>
      <MyDocument />
    </PDFViewer>
  </>
  )
};

export default App;