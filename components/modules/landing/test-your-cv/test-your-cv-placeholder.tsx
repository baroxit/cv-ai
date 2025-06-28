'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChevronDown, Check } from 'lucide-react';
import { ImproveDescriptionSchema } from '@/utils/schemas';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import TestYourCvChart from './test-your-cv-chart';
import TestYourCvScore from './test-your-cv-score';

const aspects: { label: string; key: keyof ImproveDescriptionSchema; tooltip: string }[] = [
    { label: 'Spelling', key: 'spelling', tooltip: 'Ensures there are no typos or misspelled words in the text.' },
    { label: 'Grammar', key: 'grammar', tooltip: 'Verifies proper sentence structure and enhances readability.' },
    { label: 'Metrics', key: 'metrics', tooltip: 'Checks for measurable outcomes, such as percentages, timeframes, or numerical improvements.' },
    { label: 'Keywords', key: 'keywords', tooltip: 'Analyzes the use of impactful action verbs and industry-specific terminology to improve clarity and effectiveness.' }
];

interface TestYourCvPlaceholderProps {
  // Add props as needed
}

const TestYourCvPlaceholder: React.FC<TestYourCvPlaceholderProps> = () => {
  // Mock data - replace with actual data from your CV grading logic
  const mockScore = 75;
  const mockComment = "Your CV shows strong technical skills and relevant experience. The formatting is clean and professional. Consider adding more quantifiable achievements to make your impact more measurable. Your education section is well-presented, but you could benefit from including specific certifications or training programs that are relevant to your target roles.";

  // Mock work experience data
  const workExperiences = [
    {
      company: {
        name: 'Google',
        domain: 'google.com'
      },
      position: 'Senior Software Engineer',
      location: 'Mountain View, CA',
      startDate: '2022-01',
      endDate: '2024-01',
      description: [
        'Led development of scalable microservices architecture, improving system performance by 40%.',
        'Mentored 5 junior developers and implemented CI/CD pipelines that reduced deployment time by 60%.',
        'Collaborated with cross-functional teams to deliver key features for Google Cloud Platform.'
      ]
    },
    {
      company: {
        name: 'Microsoft',
        domain: 'microsoft.com'
      },
      position: 'Full Stack Developer',
      location: 'Redmond, WA',
      startDate: '2020-03',
      endDate: '2022-01',
      description: [
        'Developed and maintained web applications using React, Node.js, and Azure services.',
        'Optimized database queries resulting in 30% faster page load times.',
        'Participated in agile development cycles and contributed to code reviews and technical documentation.'
      ]
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const getScoreTitle = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Can be Improved';
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="mt-14">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Column - CV Grade Card */}
          <div>
            <Card className="h-full">
              <CardContent>

                <TestYourCvScore /> 
                <div className='-mt-[110px]'>
                    <CardTitle className='text-xl mb-1'>Your resume is good</CardTitle>
                    <CardDescription className='text-center text-muted-foreground'>
                        {mockComment}
                    </CardDescription>
                </div>
                

                <TestYourCvChart />

              </CardContent>
            </Card>
          </div>
          
          {/* Right Column - Work Experience Cards */}
          <div className="space-y-2 text-left">
            <CardTitle className='text-xl mb-1'>How can it be improved?</CardTitle>
            {workExperiences.map((experience, index) => (
              <React.Fragment key={index}>
                <Card>
                  <CardHeader className='p-4 pt-3 pb-2'>
                      <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                              <Avatar className="size-10 rounded-md">
                                  <AvatarImage src={`https://cdn.brandfetch.io/${experience.company?.domain}/w/400/h/400?c=${process.env.NEXT_PUBLIC_BRANDFETCH_API_KEY}`} alt="" />
                                  <AvatarFallback className="rounded-lg">
                                      {experience.company?.name?.slice(0, 2).toUpperCase()}
                                  </AvatarFallback>
                              </Avatar>
                              <div>
                                  <CardTitle>{experience.company?.name}</CardTitle>
                                  <CardDescription className='text-[15px] mt-0.5'>{experience.position}</CardDescription>
                              </div>
                          </div>
                      </div>
                  </CardHeader>
                  <CardContent className="space-y-2 p-4 pb-3 pt-0">
                      <Separator/>
                      {experience.description.map((sentence, index) => (
                          <p key={index} className="text-sm opacity-80">
                              {sentence}
                          </p>
                      ))}
                  </CardContent>
                </Card>
                {index === 0 && (
                  <div className="flex flex-col items-center -space-y-1">
                    <ChevronDown className="h-5 w-5 text-muted-foreground animate-pulse" style={{ animationDelay: '0ms' }} />
                    <ChevronDown className="h-5 w-5 text-muted-foreground animate-pulse" style={{ animationDelay: '200ms' }} />
                    <ChevronDown className="h-5 w-5 text-muted-foreground animate-pulse" style={{ animationDelay: '400ms' }} />
                  </div>
                )}
              </React.Fragment>
            ))}
            
            {/* Features Checklist Section */}
            <div className="pt-4">
            <CardTitle className='text-xl mb-3'>Why using promptCv?</CardTitle>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Check className="size-5 text-green-500" />
                  <span className="text-base">Beat ATS bots with perfect formatting and keywords</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="size-5 text-green-500" />
                  <span className="text-base">Create CVs in over 50 languages worldwide</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="size-5 text-green-500" />
                  <span className="text-base">Build once and generate infinite tailored versions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="size-5 text-green-500" />
                  <span className="text-base">Control privacy with public and private variants</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="size-5 text-green-500" />
                  <span className="text-base">Get AI-powered suggestions for improvement</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestYourCvPlaceholder;