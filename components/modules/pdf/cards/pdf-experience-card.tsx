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
    width: '44pt',
    height: '44pt',
    borderRadius: '4pt',
  },
  cardTitle: {
    fontSize: '12pt',
    fontWeight: 600,
    letterSpacing: '-0.5pt',
    paddingLeft: '4pt',
    marginBottom: '2pt',
  },
  cardDescription: {
    fontSize: '11pt',
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

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(`https://cdn.brandfetch.io/${experience.company?.domain}/w/400/h/400?c=${process.env.NEXT_PUBLIC_BRANDFETCH_API_KEY}`);
        const arrayBuffer = await response.arrayBuffer();
        const base64 = Buffer.from(arrayBuffer).toString('base64');
        setImageSrc(`data:image/png;base64,${base64}`);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    if (experience.company.brandId) {
      fetchImage();
    }
  }, [experience.company.brandId, experience.company.domain]);

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
            <Image
              style={styles.avatar}
              src={imageSrc}
            />
          )}
          <View>
            <Text style={styles.cardTitle}>
              {experience.role}
            </Text>
            <Text style={styles.cardDescription}>
              {experience.company.name}
            </Text>
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