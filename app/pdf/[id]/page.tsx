"use client";

import React, { useEffect, useState } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { MyDocument } from '@/components/modules/pdf/document'; 
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { userDataSchema } from "@/utils/schemas";
import { getCv } from "@/api/cv/serverActions";
import { getUserData } from "@/api/about/serverActions";

const App = () => {

    const { id } = useParams();
    const router = useRouter();

    const [userData, setUserData] = useState<userDataSchema>();  
    const [cv, setCv] = useState<any>();
    const [saving, setSaving] = useState<boolean>(false);

    async function fetchData() {
        const userData = await getUserData();
        const cv = await getCv(id as string);
        setUserData(userData);
        setCv(cv);

        console.log(userData);
        console.log(cv);
    }

    useEffect(() => {
        fetchData();
    }, [id]);

    return (
    <>
        { userData && cv && 
            <PDFViewer className='w-[1000px] h-[800px]'>
                <MyDocument userData={userData} cv={cv} />
            </PDFViewer>
        }
    </>
    );
};

export default App;