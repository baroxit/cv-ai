import React, { useRef, useState } from 'react';
import toPDF, {Margin} from 'react-to-pdf';
import { Button } from '@/components/ui/button';
import { BellRing, Check, Download } from 'lucide-react';
import CvPageContent from '@/components/modules/cv/cv-page-content';
import { userDataSchema } from '@/utils/schemas';
import A4Page from '@/components/a4page';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Switch } from '@radix-ui/react-switch';

const PDFGenerator = ({userData, cv}: {userData: userDataSchema, cv: any}) => {    
  const contentRef = useRef(null);
  const [show, setShow] = useState(true);
  const notifications = [
    { title: 'Notification 1', description: 'Description 1' },
    { title: 'Notification 2', description: 'Description 2' },
    { title: 'Notification 3', description: 'Description 3' },
  ];

  const handleDownload = () => {
    setShow(true);
    setTimeout(() => { 
      toPDF(contentRef, {
        filename: 'my-document.pdf',
        page: { margin: Margin.NONE }
      }).then(() => setShow(false));
    }, 100);
    ;
  };

  return (
    <>
<Button onClick={handleDownload}>
            <Download /> Download PDF
        </Button>
        {show &&
            <div ref={contentRef} className='light'>
    <A4Page>
          <CvPageContent 
                        cv={cv}
                        userData={userData}
                        download={true}
                        onChangeSaving={(value: boolean) => {}}
                    />
                </A4Page>
                </div>
}
                </>
   
  );
};

export default PDFGenerator;


/*
 <>
        
        {show &&
            <div ref={contentRef} className='light'>
                
                <Card className="w-[380px]">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className=" flex items-center space-x-4 rounded-md border p-4">
          <BellRing />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Push Notifications
            </p>
            <p className="text-sm text-muted-foreground">
              Send notifications to device.
              </p>
          </div>
          <Switch />
        </div>
        <div>
          {notifications.map((notification: { title: string; description: string }, index: number) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {notification.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {notification.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full z-50">
          <Check /> <span style={{marginTop: '-15px'}}>Mark all as read</span>
        </Button>
      </CardFooter>
    </Card>
                
            </div>
        }
        
    </>
          

                */