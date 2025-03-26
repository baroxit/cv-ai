import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { EducationSchema } from '@/utils/schemas';

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
    marginBottom: 4
  },
  header: {
    borderBottomStyle: 'solid',
    borderBottomColor: '#e9eaec',
    borderBottomWidth: 1,
    padding: '10px 14px',
    display: 'flex',
    flexDection: 'column',
    gap: 0,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
  },
  title: {
    color: '#232529',
    textAlign: 'left',
    fontFamily: 'Inter',
    fontSize: 12,
    lineHeight: 1.4,
    letterSpacing: -0.3,
    fontWeight: 500,
    alignSelf: 'stretch',
  },
  school: {
    color: '#5c5e63',
    textAlign: 'left',
    fontFamily: 'Inter',
    fontSize: 10,
    lineHeight: 1.4,
    fontWeight: 400,
    alignSelf: 'stretch',
  },
  contentContainer: {
    padding: '10px 14px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
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
  strongText: {
    fontWeight: 600,
  }
});

// Helper function to process description text with bold and newlines
const processDescription = (text: string | null | undefined) => {
  if (!text) return null;
  
  const parts = text.split(/(\*\*.*?\*\*)/g);
  
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const boldText = part.slice(2, -2);
      return <Text key={index} style={styles.strongText}>{boldText}</Text>;
    }
    return <Text key={index}>{part.replace(/\r\n|\n|\r/g, '\n')}</Text>;
  });
};

const PdfEducationCard: React.FC<{ education: EducationSchema }> = ({ education }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {education.degree} - {education.field_of_study}
        </Text>
        <Text style={styles.school}>{education.school}</Text>
      </View>
      
      {education.description && (
        <View style={styles.contentContainer}>
          <Text style={styles.description}>
            {processDescription(education.description)}
          </Text>
        </View>
      )}
    </View>
  );
};

export default PdfEducationCard;