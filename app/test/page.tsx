"use client";

import React from 'react';
import ReactDOM from 'react-dom';
import { PDFViewer } from '@react-pdf/renderer';
import { MyDocument } from '@/components/modules/pdf/document'; 

const App = () => (
  <PDFViewer className='w-full h-screen'>
    <MyDocument />
  </PDFViewer>
);

export default App;