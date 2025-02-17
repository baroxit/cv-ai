import { View, Text, StyleSheet } from '@react-pdf/renderer';

// Define types
type TagsProps = {
  tags: string[] | undefined;
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '8pt',
    alignItems: 'center',
    paddingTop: '6pt',
    paddingBottom: '6pt',
  },
  tag: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6', // This represents a light gray similar to bg-secondary
    borderRadius: '3.5pt',
  },
  tagText: {
    fontSize: '9pt',
    fontWeight: 500,
    padding: '4pt 8pt',
    color: '#374151', // Default text color
  },
});

const PdfTags: React.FC<TagsProps> = ({ tags = [] }) => {
  return (
    <View style={styles.container}>
      {tags.map((tag, index) => (
        <View key={index} style={styles.tag}>
          <Text style={styles.tagText}>{tag}</Text>
        </View>
      ))}
    </View>
  );
};

export default PdfTags;