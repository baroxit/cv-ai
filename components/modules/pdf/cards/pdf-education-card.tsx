import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { EducationSchema } from '@/utils/schemas';

const styles = StyleSheet.create({
  card: {
    marginBottom: '4pt',
    border: '1pt solid #e2e8f0',
    borderRadius: '4pt',
    backgroundColor: '#ffffff',
  },
  cardHeader: {
    padding: '10.5pt',
    paddingTop: '5pt',
    paddingBottom: '4pt',
  },
  headerContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mainInfo: {
    width: '75%',
    paddingRight: '8pt',
  },
  gradeInfo: {
    borderLeft: '1pt solid #e2e8f0',
    paddingLeft: '8pt',
    width: '25%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 'auto',
  },
  title: {
    fontSize: '11pt',
    fontWeight: 600,
    marginBottom: '2pt',
  },
  description: {
    fontSize: '10pt',
    color: '#6b7280',
  },
  gradeLabel: {
    fontSize: '7pt',
    color: 'rgb(113, 113, 122)',
    textAlign: 'center',
  },
  gradeValue: {
    fontSize: '10pt',
    fontWeight: 600,
    textAlign: 'center',
  },
  separator: {
    borderBottom: '1pt solid #e2e8f0',
    marginTop: '4pt',
    marginBottom: '4pt',
  },
  content: {
    padding: '10.5pt',
    paddingTop: 0,
    paddingBottom: 0,
    fontSize: '9.5pt',
  },
  strongText: {
    fontWeight: 600,
  }
});

// Helper function to process description text with bold and newlines
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

const PdfEducationCard: React.FC<{ education: EducationSchema }> = ({ education }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.headerContent}>
          <View style={styles.mainInfo}>
            <Text style={styles.title}>
              {education.degree} - {education.field_of_study}
            </Text>
            <Text style={styles.description}>{education.school}</Text>
          </View>
          
          {education.showGrade && education.grade !== undefined && education.max_grade !== undefined && (
            <View style={styles.gradeInfo}>
              <Text style={styles.gradeLabel}>Grade</Text>
              <Text style={styles.gradeValue}>
                {education.grade} / {education.max_grade}
              </Text>
            </View>
          )}
        </View>
        
        {education.description && (
          <View style={styles.separator} />
        )}
      </View>
      
      {education.description && (
        <View style={styles.content}>
          <Text>
            {processDescription(education.description)}
          </Text>
        </View>
      )}
    </View>
  );
};

export default PdfEducationCard;