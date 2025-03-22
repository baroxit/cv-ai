import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import PdfExperienceCard from './cards/pdf-experience-card';
import { EducationSchema, ExperienceSchema, userDataSchema } from '@/utils/schemas';
import PdfPersonalCard from './cards/pdf-personal-card';
import PdfEducationCard from './cards/pdf-education-card';

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    fontFamily: 'Inter',
    color: 'rgb(9, 9, 11)',
    paddingTop: 8
  },
  section: {
    flexGrow: 1,
    flexDirection: 'row',
  },
  sectionTitle: {
    color: '#232529',
    textAlign: 'left',
    fontFamily: 'Inter',
    fontSize: 13,
    lineHeight: 1.33, // 32px / 24px
    letterSpacing: -0.4,
    fontWeight: 500,
    alignSelf: 'stretch',
    marginTop: 8,
    marginBottom: 4
  },
  separator: {
    backgroundColor: '#e9eaec',
    width: 1,
    alignSelf: 'stretch',
    marginTop: 10
  },
});

Font.register({
  family: "Inter",
  fonts: [
    { src: "/inter/Inter_18pt-Thin.ttf", fontWeight: 100 },
    { src: "/inter/Inter_18pt-Light.ttf", fontWeight: 300 },
    { src: "/inter/Inter_18pt-Regular.ttf", fontWeight: 400 },
    { src: "/inter/Inter_18pt-Medium.ttf", fontWeight: 500 },
    { src: "/inter/Inter_18pt-SemiBold.ttf", fontWeight: 600 },
    { src: "/inter/Inter_18pt-Bold.ttf", fontWeight: 700 },
    { src: "/inter/Inter_18pt-ExtraBold.ttf", fontWeight: 800 },
    { src: "/inter/Inter_18pt-Black.ttf", fontWeight: 900 },
  ],
});



// Create Document Component
export const MyDocument = ({userData, cv} : { userData: userDataSchema; cv: any}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <PdfPersonalCard
          personalData={userData.personal}
          cvPersonalData={cv.personal}
        />
      <View style={styles.section}>
        <View style={{ width: '60%', paddingRight: 10, paddingLeft: 15 }}>
          <Text style={styles.sectionTitle}>Working Experiences</Text>
          {cv.experiences.map((experience: ExperienceSchema) => (
            <PdfExperienceCard key={experience.id} experience={experience} />
          ))}
        </View>
        <View style={styles.separator} />
        <View style={{ width: '40%', paddingLeft: 10, paddingRight: 15 }}>
          <Text style={styles.sectionTitle}>Education</Text>
          {cv.education.map((edu: EducationSchema) => (
            <PdfEducationCard key={edu.id} education={edu} />
          ))}
        </View>
      </View>
    </Page>
  </Document>
);