"use client";
import { PDFDownloadLink } from '@react-pdf/renderer';
import { MyDocument } from '@/components/modules/pdf/document';
import { userDataSchema } from "@/utils/schemas";
import { useEffect, useState } from "react";
import { Download } from 'lucide-react';
import { cn } from '@/lib/utils';

export const PdfDownloadButton = ({ userData, cv }: { userData: userDataSchema; cv: any }) => {
  const [user, setUser] = useState(userData);
  const [cvData, setCvData] = useState(cv);
  
  useEffect(() => {
    setUser(userData);
    setCvData(cv);
  }, [userData, cv]);

  return (
    <PDFDownloadLink
      document={<MyDocument userData={user} cv={cvData} />}
      fileName={`${user.personal.name}_${cvData.job_role}_${cvData.company_name}`.replace(/\s+/g, '_').toLowerCase()}
      className="relative hover:bg-muted flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
    >
      
      {({ loading }) => (
        <span className={cn('flex items-center', loading && 'opacity-50')}>
          <Download className='size-4 mr-2' />
          {loading ? 'Generating PDF...' : 'Download PDF'}
        </span>
      )}
    </PDFDownloadLink>
  );
};