import { View, Text, Link, StyleSheet, Svg, Path } from '@react-pdf/renderer';

import { PersonalSchema, CvPersonalSchema } from '@/utils/schemas';

type CvPersonalCardProps = {
  personalData: PersonalSchema;
  cvPersonalData: CvPersonalSchema;
};

const styles = StyleSheet.create({
  container: {
    borderStyle: 'solid',
    borderColor: '#e9eaec',
    borderBottomWidth: 1,
    padding: 18,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  leftSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    paddingRight: 6,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flex: 1,
    width: '60%'
  },
  headerSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
  },
  name: {
    color: '#232529',
    textAlign: 'left',
    fontFamily: 'Inter',
    fontSize: 18,
    lineHeight: 1.11, // 40px / 36px
    letterSpacing: -0.4,
    fontWeight: 600,
    alignSelf: 'stretch',
  },
  title: {
    color: '#5c5e63',
    textAlign: 'left',
    fontFamily: 'Inter',
    fontSize: 14,
    lineHeight: 1.5, // 36px / 24px
    letterSpacing: -0.8,
    fontWeight: 500,
    alignSelf: 'stretch',
  },
  description: {
    color: '#232529',
    textAlign: 'left',
    fontFamily: 'Inter',
    fontSize: 10,
    lineHeight: 1.56, // 28px / 18px
    fontWeight: 400,
    alignSelf: 'stretch',
  },
  separator: {
    backgroundColor: '#e9eaec',
    width: 1,
    alignSelf: 'stretch',
    marginRight: 0.2
  },
  rightSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '40%',
    paddingLeft: 10
  },
  contactsTitle: {
    color: '#232529',
    textAlign: 'left',
    fontFamily: 'Inter',
    fontSize: 13,
    lineHeight: 1.33, // 32px / 24px
    letterSpacing: -0.4,
    fontWeight: 500,
    alignSelf: 'stretch',
  },
  contactsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
  },
  contactRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: '#fbfbfb',
    borderRadius: 4,
    borderStyle: 'solid',
    borderColor: '#e9eaec',
    borderWidth: 1,
    padding: 3,
  },
  contactText: {
    color: '#232529',
    fontFamily: 'Inter',
    fontSize: 10,
    lineHeight: 1.5, // 24px / 16px
    fontWeight: 400,
  },
  strongText: {
    fontWeight: 600,
  }
});

const PdfPersonalCard: React.FC<CvPersonalCardProps> = ({
  personalData,
  cvPersonalData
}) => {

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

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <View style={styles.headerSection}>
          <Text style={styles.name}>{personalData.name}</Text>
          <Text style={styles.title}>{cvPersonalData.title}</Text>
        </View>
        <Text style={styles.description}>
          {processDescription(cvPersonalData.description)}
        </Text>
      </View>

      <View style={styles.separator} />

      <View style={styles.rightSection}>
        <Text style={styles.contactsTitle}>Contacts</Text>
        <View style={styles.contactsContainer}>
          {personalData.email && cvPersonalData.showEmail && (
            <View style={styles.contactRow}>
              <View style={styles.iconContainer}>
                <Svg width={10} height={10} viewBox="0 0 20 20">
                  <Path
                    d="M18.3334 5.83337L10.8584 10.5834C10.6011 10.7446 10.3036 10.83 10 10.83C9.69642 10.83 9.39896 10.7446 9.14169 10.5834L1.66669 5.83337M3.33335 3.33337H16.6667C17.5872 3.33337 18.3334 4.07957 18.3334 5.00004V15C18.3334 15.9205 17.5872 16.6667 16.6667 16.6667H3.33335C2.41288 16.6667 1.66669 15.9205 1.66669 15V5.00004C1.66669 4.07957 2.41288 3.33337 3.33335 3.33337Z"
                    stroke="#75777C"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </View>
              <Text style={styles.contactText}>{personalData.email}</Text>
            </View>
          )}

          {personalData.phone && cvPersonalData.showPhone && (
            <View style={styles.contactRow}>
              <View style={styles.iconContainer}>
              <Svg width={10} height={10} viewBox="0 0 20 20">
                <Path
                    d="M18.3333 14.1V16.6C18.3343 16.8321 18.2867 17.0618 18.1937 17.2745C18.1008 17.4871 17.9644 17.678 17.7934 17.8349C17.6224 17.9918 17.4205 18.1113 17.2006 18.1856C16.9808 18.26 16.7478 18.2876 16.5167 18.2667C13.9523 17.9881 11.4892 17.1118 9.32498 15.7084C7.31151 14.4289 5.60443 12.7219 4.32499 10.7084C2.91663 8.53438 2.04019 6.0592 1.76665 3.48337C1.74583 3.25293 1.77321 3.02067 1.84707 2.80139C1.92092 2.58211 2.03963 2.38061 2.19562 2.20972C2.35162 2.03883 2.54149 1.9023 2.75314 1.80881C2.9648 1.71532 3.1936 1.66692 3.42499 1.66671H5.92499C6.32941 1.66273 6.72148 1.80594 7.02812 2.06965C7.33476 2.33336 7.53505 2.69958 7.59165 3.10004C7.69717 3.9001 7.89286 4.68565 8.17499 5.44171C8.2871 5.73998 8.31137 6.06414 8.24491 6.37577C8.17844 6.68741 8.02404 6.97347 7.79998 7.20004L6.74165 8.25837C7.92795 10.3447 9.65536 12.0721 11.7417 13.2584L12.8 12.2C13.0266 11.976 13.3126 11.8216 13.6243 11.7551C13.9359 11.6887 14.26 11.7129 14.5583 11.825C15.3144 12.1072 16.0999 12.3029 16.9 12.4084C17.3048 12.4655 17.6745 12.6694 17.9388 12.9813C18.203 13.2932 18.3435 13.6914 18.3333 14.1Z"
                    stroke="#75777C"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </View>
              <Text style={styles.contactText}>{personalData.phone}</Text>
            </View>
          )}

          {personalData.linkedin && cvPersonalData.showLinkedin && (
            <View style={styles.contactRow}>
              <View style={styles.iconContainer}>
              <Svg width={10} height={10} viewBox="0 0 20 20">
                <Path
                    d="M13.3334 6.66663C14.6594 6.66663 15.9312 7.19341 16.8689 8.13109C17.8066 9.06877 18.3334 10.3405 18.3334 11.6666V17.5H15V11.6666C15 11.2246 14.8244 10.8007 14.5119 10.4881C14.1993 10.1756 13.7754 9.99996 13.3334 9.99996C12.8913 9.99996 12.4674 10.1756 12.1548 10.4881C11.8423 10.8007 11.6667 11.2246 11.6667 11.6666V17.5H8.33335V11.6666C8.33335 10.3405 8.86014 9.06877 9.79782 8.13109C10.7355 7.19341 12.0073 6.66663 13.3334 6.66663Z M5.00002 7.49996H1.66669V17.5H5.00002V7.49996Z M3.33335 4.99996C4.25383 4.99996 5.00002 4.25377 5.00002 3.33329C5.00002 2.41282 4.25383 1.66663 3.33335 1.66663C2.41288 1.66663 1.66669 2.41282 1.66669 3.33329C1.66669 4.25377 2.41288 4.99996 3.33335 4.99996Z"
                    stroke="#75777C"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </View>
              <Link src={personalData.linkedin} style={styles.contactText}>
                {personalData.linkedin.replace('https://www.linkedin.com/in/', '@')}
              </Link>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default PdfPersonalCard;