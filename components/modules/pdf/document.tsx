import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import PdfExperienceCard from './cards/pdf-experience-card';
import { EducationSchema, ExperienceSchema } from '@/utils/schemas';
import PdfPersonalCard from './cards/pdf-personal-card';
import PdfEducationCard from './cards/pdf-education-card';

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    fontFamily: 'Inter',
    color: 'rgb(9, 9, 11)',
    padding: 7
  },
  section: {
    flexGrow: 1,
    flexDirection: 'row',
  },
  sectionTitle: {
    fontSize: '13.5pt',
    marginTop: '4pt',
    marginBottom: '3.5pt',
    fontWeight: 600,
  },
});

Font.register({
  family: "Inter",
  fonts: [
    { src: "inter/Inter_18pt-Thin.ttf", fontWeight: 100 },
    { src: "inter/Inter_18pt-Light.ttf", fontWeight: 300 },
    { src: "inter/Inter_18pt-Regular.ttf", fontWeight: 400 },
    { src: "inter/Inter_18pt-Medium.ttf", fontWeight: 500 },
    { src: "inter/Inter_18pt-SemiBold.ttf", fontWeight: 600 },
    { src: "inter/Inter_18pt-Bold.ttf", fontWeight: 700 },
    { src: "inter/Inter_18pt-ExtraBold.ttf", fontWeight: 800 },
    { src: "inter/Inter_18pt-Black.ttf", fontWeight: 900 },
  ],
});

const experiences: ExperienceSchema[] = [
  {
    id: 20,
    company: {
      name: "Eden Viaggi",
      domain: "edenviaggi.it",
      brandId: "idzDiuIHFf"
    },
    location: "Pesaro",
    role: "Software Developer",
    description: "Led the design and development of scalable payment solutions at Eden Viaggi, focusing on quality and user experience. Collaborated with cross-functional teams to implement innovative features, utilizing technologies such as Java and AWS. Enhanced system performance and reliability through rigorous testing and deployment practice. OK erafdsfsd\n",
    user_id: "ab940a37-b89c-4943-8e03-afa63f5327b9",
    start_period: null,
    end_period: null,
    skills: ["Excel", "Python"]
  },
  {
    id: 19,
    company: {
      name: "Satispay",
      domain: "satispay.com",
      brandId: "idb306-7hk"
    },
    location: "Milano, Italia",
    role: "Software Engineer",
    description: "Responsible for developing and optimizing back-end systems at Satispay, utilizing Java and various DevOps tools. Engaged in the full software development lifecycle, from conception to production, ensuring high-quality deliverables. Contributed to the enhancement of payment products by integrating user feedback and implementing new features.",
    user_id: "ab940a37-b89c-4943-8e03-afa63f5327b9",
    start_period: null,
    end_period: null,
    skills: []
  },
  {
    id: 18,
    company: {
      name: "Lavazza",
      domain: "lavazza.com",
      brandId: "idvTVz4ymt"
    },
    location: "Lakdlskdsd",
    role: "Software Engineer",
    description: "Played a key role in developing robust software solutions at Lavazza, focusing on back-end technologies. Collaborated with teams to streamline processes and improve system efficiency, leveraging skills in Java and database management. Actively participated in code reviews and knowledge sharing to foster a culture of continuous improvement.",
    user_id: "ab940a37-b89c-4943-8e03-afa63f5327b9",
    start_period: null,
    end_period: null
  }
];

const personalData = {
  name: "John Doe",
  email: "john@example.com",
  phone: "+1 234 567 890",
  linkedin: "https://linkedin.com/in/johndoe"
};

const cvPersonalData = {
  title: "Senior Software Engineer",
  description: "Experienced developer with focus on **React** and **TypeScript**",
  showAvatar: false,
  showEmail: true,
  showPhone: true,
  showLinkedin: true
};

const education: EducationSchema[] = [{
  degree: "Bachelor of Science",
  start_date: "2016-09-01",
  end_date: "2020-06-01",
  location: "Sydney, Australia",
  field_of_study: "Computer Science",
  school: "University of Technology",
  grade: '95',
  max_grade: '100',
  showGrade: true,
  description: "Specialized in **Artificial Intelligence** and **Machine Learning**.\nGraduated with honors."
}];

// Create Document Component
export const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <PdfPersonalCard
          personalData={personalData}
          cvPersonalData={cvPersonalData}
        />
      <View style={styles.section}>
        <View style={{ width: 'calc(60%-5pt)', marginRight: '5pt' }}>
          <Text style={styles.sectionTitle}>Working Experiences</Text>
          {experiences.map((experience) => (
            <PdfExperienceCard key={experience.id} experience={experience} />
          ))} 
        </View>
        <View style={{ width: '40%' }}>
          <Text style={styles.sectionTitle}>Education</Text>
          {education.map((edu) => (
            <PdfEducationCard key={edu.id} education={edu} />
          ))}
        </View>
        
      </View>
      
    </Page>
  </Document>
);