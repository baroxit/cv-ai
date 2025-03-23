"use client";

import { useEffect, useState } from 'react';
import { ExperienceSchema } from '@/utils/schemas';
import { View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import PdfTags from './pdf-tags';

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 6,
    borderStyle: 'solid',
    borderColor: '#e9eaec',
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    position: 'relative',
    // Note: box-shadow is not directly supported in react-pdf
  },
  header: {
    borderBottomStyle: 'solid',
    borderBottomColor: '#e9eaec',
    borderBottomWidth: 1,
    padding: '8px 14px',
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    position: 'relative',
  },
  image: {
    borderRadius: 8,
    width: 32,
    height: 32,
    borderStyle: 'solid',
    borderColor: '#e9eaec',
  },
  headerContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flex: 1,
    position: 'relative',
  },
  jobTitle: {
    color: '#232529',
    textAlign: 'left',
    fontFamily: 'Inter',
    fontSize: 12,
    lineHeight: 1.4,
    letterSpacing: -0.3,
    fontWeight: 500,
    alignSelf: 'stretch',
  },
  companyDateContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    position: 'relative',
  },
  companyName: {
    color: '#5c5e63',
    textAlign: 'left',
    fontFamily: 'Inter',
    fontSize: 10,
    lineHeight: 1.4,
    fontWeight: 400,
    flex: 1,
  },
  dateRange: {
    color: '#5c5e63',
    textAlign: 'right',
    fontFamily: 'Inter',
    fontSize: 9,
    lineHeight: 1.4,
    fontWeight: 400,
    flex: 1,
  },
  contentContainer: {
    padding: '8px 14px',
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    position: 'relative',
  },
  description: {
    color: '#5c5e63',
    textAlign: 'left',
    fontFamily: 'Inter',
    fontSize: 10,
    lineHeight: 1.2,
    fontWeight: 400,
    alignSelf: 'stretch',
  },
});

const PdfExperienceCard = ({ experience }: { experience: ExperienceSchema }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const formatDate = (dateString: Date | null | undefined) => {
    if (!dateString) return "Present"; // Handle null/undefined case
    
    // First create a new Date object from the string
    const date = new Date(dateString);
    
    // Now we can use toLocaleDateString
    return date.toLocaleDateString('en-US', { 
      month: 'short',
      year: 'numeric'
    });
  };

  useEffect(() => {
    if(experience.company?.brandId) {
      const fetchImage = async () => {
        try {
          const response = await fetch(`https://api.brandfetch.io/v2/search/${experience.company?.domain}?c=${process.env.NEXT_PUBLIC_BRANDFETCH_API_KEY}`, {
            method: 'GET'
          });
          if (response.ok) {
            const data = await response.json();
            if (data.length > 0 && data[0].icon) {
              const logoUrl = data[0].icon.replace('.webp', '.png').replace('/w/32/h/32', '/w/400/h/400');
              setImageSrc(logoUrl);
            } else {
              console.error('No logos found for the company');
            }
          } else {
            console.error('Failed to fetch image:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching image:', error);
        }
      };
      fetchImage();
    }

  }, [experience.company?.name]);

  const processDescription = (text: string | null | undefined) => {
    if (!text) return null;
    
    const parts = text.split(/(\*\*.*?\*\*)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const boldText = part.slice(2, -2);
        return <Text key={index}>{boldText}</Text>;
      }
      return <Text key={index}>{part.replace(/\r\n|\n|\r/g, '\n')}</Text>;
    });
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        {imageSrc && (
          <Image
            style={styles.image}
            src={imageSrc}
          />
        )}
        <View style={styles.headerContent}>
          <Text style={styles.jobTitle}>{experience.role}</Text>
          <View style={styles.companyDateContainer}>
            <Text style={styles.companyName}>{experience.company.name}</Text>
            <Text style={styles.dateRange}>from {formatDate(experience.start_period)} to {formatDate(experience.end_period)}</Text>
          </View>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.description}>
          {processDescription(experience.description)}
        </Text>
      </View>
    </View>
  );
};

export default PdfExperienceCard;