"use client";

import { useEffect, useState } from 'react';
import { ExperienceSchema } from '@/utils/schemas';
import { View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import PdfTags from './pdf-tags';

const styles = StyleSheet.create({
  card: {
    marginBottom: '4pt',
    border: '1pt solid red',
    borderRadius: '4pt',
    borderColor: 'rgb(228, 228, 231)',
    backgroundColor: 'rgb(255, 255, 255)',
    boxShadow: 'rgba(0, 0, 0, 0.1) 0pt 1pt 3pt 0pt, rgba(0, 0, 0, 0.1) 0pt 1pt 2pt -1pt',
  },
  cardHeader: {
    padding: '10.5pt',
    paddingTop: '5pt',
    paddingBottom: '4pt',
  },
  headerContent: {
    display: 'flex',
    flexDirection: 'row',
  },
  avatar: {
    width: '30pt',
    height: '30pt',
    borderRadius: '4pt',
  },
  cardTitle: {
    fontSize: '11pt',
    fontWeight: 600,
    paddingLeft: '4pt',
    marginBottom: '2pt',
  },
  cardDescription: {
    fontSize: '9pt',
    color: 'rgb(113, 113, 122)',
    paddingLeft: '4pt',
  },
  cardDescriptionDate: {
    fontSize: '8pt',
    color: 'rgb(113, 113, 122)',
    paddingLeft: '4pt',
  },
  separator: {
    borderBottom: '1pt solid rgb(228, 228, 231)',
    marginTop: '4pt',
    marginBottom: '4pt',
    width: '100%',
  },
  cardContent: {
    padding: '10.5pt',
    paddingTop: 0,
    paddingBottom: 0,
    fontSize: '9.5pt',
  },
  strongText: {
    fontWeight: 600,
  },
});

const PdfExperienceCard = ({ experience }: { experience: ExperienceSchema }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const formatDate = (dateString: Date) => {
    if (!dateString) return ""; // Handle null/undefined case
    
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
          const response = await fetch(`https://api.brandfetch.io/v2/search/${experience.company?.name}?c=${process.env.NEXT_PUBLIC_BRANDFETCH_API_KEY}`, {
            method: 'GET'
          });
          console.log(response)
          if (response.ok) {
            const data = await response.json();
            console.log(data)
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

  const processDescription = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const boldText = part.slice(2, -2);
        return <Text key={index} style={styles.strongText}>{boldText}</Text>;
      }
      return <Text key={index}>{part.replace(/\r\n|\n|\r/g, '\n')}</Text>;
    });
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.headerContent}>
          {imageSrc && (
            <Image src={imageSrc} style={styles.avatar} />
          )}
          <View>
            <Text style={styles.cardTitle}>
              {experience.role}
            </Text>
            <Text style={styles.cardDescription}>
              {experience.company.name}
            </Text>
            {experience.start_period && experience.end_period && (
              <Text style={styles.cardDescriptionDate}>
                {formatDate(experience.start_period)} - {formatDate(experience.end_period)}
              </Text>
            )}
          </View>
        </View>
        <View style={styles.separator} />
      </View>
      <View style={styles.cardContent}>
        {processDescription(experience.description)}
        <PdfTags tags={experience.skills} />
      </View>
    </View>
  );
};

export default PdfExperienceCard;