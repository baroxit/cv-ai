import { View, Text, Image, StyleSheet, Link } from '@react-pdf/renderer';

import { PersonalSchema, CvPersonalSchema } from '@/utils/schemas';

type CvPersonalCardProps = {
  personalData: PersonalSchema;
  cvPersonalData: CvPersonalSchema;
  avatarUrl?: string;
};

const styles = StyleSheet.create({
  card: {
    padding: '8pt',
    border: '1pt solid #e2e8f0',
    borderRadius: '8pt',
    backgroundColor: '#ffffff',
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: '24pt',
    justifyContent: 'space-between',
  },
  leftSection: {
    display: 'flex',
    flexDirection: 'row',
    gap: '24pt',
    flex: 1,
  },
  avatar: {
    width: '128pt',
    height: '128pt',
    borderRadius: '8pt',
  },
  contentContainer: {
    flex: 1,
  },
  name: {
    fontSize: '18pt',
    fontWeight: 600,
    marginBottom: '4pt',
  },
  title: {
    fontSize: '14pt',
    color: 'rgb(113, 113, 122)',
    marginBottom: '6pt',
  },
  description: {
    fontSize: '10pt',
    color: '#374151',
    lineHeight: 1.5,
  },
  contactsCard: {
    padding: '8pt 12pt',
    border: '1pt solid #e2e8f0',
    borderRadius: '8pt',
    backgroundColor: '#ffffff',
  },
  contactsTitle: {
    fontSize: '13pt',
    fontWeight: 600,
    marginBottom: '2pt',
  },
  contactLabel: {
    fontSize: '7pt',
    color: 'rgb(113, 113, 122)',
    marginTop: '2pt',
  },
  contactValue: {
    fontSize: '9pt',
    color: '#374151',
    marginBottom: '2pt',
  },
  strongText: {
    fontWeight: 600,
  }
});

// Function to process description text with bold and newlines
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

const PdfPersonalCard: React.FC<CvPersonalCardProps> = ({
  personalData,
  cvPersonalData
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.mainContainer}>
        <View style={styles.leftSection}>
          <View style={styles.contentContainer}>
            <Text style={styles.name}>{personalData.name}</Text>
            <Text style={styles.title}>{cvPersonalData.title}</Text>
            <Text style={styles.description}>
              {processDescription(cvPersonalData.description)}
            </Text>
          </View>
        </View>

        {((personalData.email && cvPersonalData.showEmail) ||
          (personalData.phone && cvPersonalData.showPhone) ||
          (personalData.linkedin && cvPersonalData.showLinkedin)) && (
          <View style={styles.contactsCard}>
            <Text style={styles.contactsTitle}>Contacts</Text>
            {personalData.email && cvPersonalData.showEmail && (
              <View>
                <Text style={styles.contactLabel}>Email</Text>
                <Text style={styles.contactValue}>
                  {personalData.email.length > 100
                    ? `${personalData.email.substring(0, 90)}...`
                    : personalData.email}
                </Text>
              </View>
            )}
            {personalData.phone && cvPersonalData.showPhone && (
              <View>
                <Text style={styles.contactLabel}>Phone</Text>
                <Text style={styles.contactValue}>{personalData.phone}</Text>
              </View>
            )}
            {personalData.linkedin && cvPersonalData.showLinkedin && (
              <View>
                <Text style={styles.contactLabel}>Linkedin</Text>
                <Link src={personalData.linkedin} style={styles.contactValue}>
                  {personalData.linkedin}
                </Link>
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default PdfPersonalCard;