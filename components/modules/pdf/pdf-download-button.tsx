"use client";
import { PDFDownloadLink } from '@react-pdf/renderer';
import { MyDocument } from '@/components/modules/pdf/document';
import { userDataSchema } from "@/utils/schemas";
import { useEffect, useState } from "react";

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
      fileName="cv.pdf"
      className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
    >
      {({ loading }) => (
        <>
          {loading ? 'Generating PDF...' : 'Download PDF'}
        </>
      )}
    </PDFDownloadLink>
  );
};