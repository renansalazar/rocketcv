import { Font, StyleSheet } from '@react-pdf/renderer'

Font.register({
  family: 'Roboto-Bold',
  src: '/fonts/roboto/Roboto-Bold.ttf'
})

Font.register({
  family: 'Roboto-Light',
  src: '/fonts/roboto/Roboto-Regular.ttf'
})

Font.registerHyphenationCallback(word => [word])

export const stylesDocument = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    background: 'red'
  },
  containerPage: {
    width: '100%',
    margin: '40px auto',
    height: '800px',
    padding: '20px',
    display: 'flex'
  },
  page: {
    width: '100%',
    height: '100%'
  },
  pageContent: {
    flex: 1,
    flexDirection: 'row',
    flexGrow: 1,
    display: 'flex',
    gap: '20px'
  },
  sectionOne: {
    color: 'white',
    textAlign: 'center',
    padding: 30,
    paddingLeft: 14,
    paddingRight: 14,
    width: '44%'
  },
  sectionTwo: {
    color: 'white',
    textAlign: 'center',
    padding: 18,
    width: '56%'
  },
  imageContainer: {
    background: 'var(--color3)',
    borderRadius: '50%',
    height: 180,
    width: 180,
    display: 'block',
    margin: 'auto'
  },
  image: {
    borderRadius: '50%',
    objectFit: 'cover',
    width: '100%',
    height: '100%'
  },
  view: {
    display: 'flex',
    textAlign: 'left',
    gap: '6px'
  },
  textTitle: {
    color: 'black',
    fontSize: 28,
    marginTop: 16,
    fontFamily: 'Roboto-Bold',
    textTransform: 'uppercase'
  },
  textSubTitle: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'Roboto-Light',
    marginBottom: 14,
    marginTop: 14,
    textTransform: 'uppercase'
  },
  textTitleItem: {
    fontFamily: 'Roboto-Bold',
    color: 'black',
    fontSize: 13,
    fontWeight: 'bold',
    display: 'block'
  },
  textSubTitleItem: {
    fontFamily: 'Roboto-Light',
    color: 'black',
    fontSize: 9,
    fontWeight: 'bold',
    display: 'block',
    marginBottom: '2px'
  },
  textSubTitleSection: {
    fontFamily: 'Roboto-Bold',
    color: 'black',
    fontSize: 14,
    marginTop: 12,
    marginBottom: 6,
    textTransform: 'uppercase'
  },
  textParagraphSection: {
    fontFamily: 'Roboto-Light',
    color: 'black',
    fontSize: 11,
    display: 'block',
    textAlign: 'justify',
    whiteSpace: 'pre-line',
    marginBottom: '5px',
    hyphens: 'none'
  },
  textAlignLeft: {
    textAlign: 'left',
    hyphens: 'none',
    fontSize: 9
  },
  viewSubTitleSection: {
    padding: 10
  },
  viewCourses: {
    marginBottom: 5
  },
  background1: {
    backgroundColor: '#eff2f8'
  },
  background2: {
    backgroundColor: '#fdfee0'
  },
  background3: {
    backgroundColor: '#b0f2c2'
  }
})

export const stylesDocumentTheme2 = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    background: 'red'
  },
  containerPage: {
    width: '100%',
    margin: '40px auto',
    height: '800px',
    padding: '20px',
    display: 'flex'
  },
  page: {
    width: '100%',
    height: '100%'
  },
  pageContent: {
    flexDirection: 'row',
    display: 'flex',
    flexDirection: 'column',
  },
  sectionOne: {
    color: 'white',
    textAlign: 'center',
    padding: 30,
    paddingBottom: 0,
    width: '100%'
  },
  sectionTwo: {
    color: 'white',
    textAlign: 'center',
    padding: 30,
    paddingTop: 0,
    width: '100%'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    margin: -30,
    marginBottom: 0,
    padding:30,
    paddingBottom:20,
  },
  headerColumnOne: {
    width: '25%'
  },
  headerColumnTwo: {
    width: '75%',
    display: 'flex',
    justifyContent: 'center'
  },
  imageContainer: {
    background: 'var(--color3)',
    height: 100,
    width: 100,
    margin: 'auto',
    marginLeft: 0
  },
  image: {
    objectFit: 'cover',
    width: '100%',
    borderRadius: '50%',
    height: '100%'
  },
  view: {
    display: 'flex',
    textAlign: 'left',
    gap: '6px'
  },
  textTitle: {
    color: 'black',
    fontSize: 28,
    marginTop: 16,
    fontFamily: 'Roboto-Bold',
    textTransform: 'uppercase'
  },
  textSubTitle: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'Roboto-Light',
    marginBottom: 14,
    marginTop: 14,
    textTransform: 'uppercase'
  },
  textTitleItem: {
    fontFamily: 'Roboto-Bold',
    color: 'black',
    fontSize: 13,
    fontWeight: 'bold',
    display: 'block'
  },
  textSubTitleItem: {
    fontFamily: 'Roboto-Light',
    color: 'black',
    fontSize: 9,
    fontWeight: 'bold',
    display: 'block',
    marginBottom: '2px'
  },
  textSubTitleSection: {
    fontFamily: 'Roboto-Bold',
    color: 'black',
    fontSize: 12,
    marginTop: 12,
    marginBottom: 6,
    textTransform: 'uppercase'
  },
  textParagraphSection: {
    fontFamily: 'Roboto-Light',
    color: 'black',
    fontSize: 11,
    display: 'block',
    textAlign: 'justify',
    whiteSpace: 'pre-line',
    marginBottom: '5px',
    hyphens: 'none'
  },
  textAlignLeft: {
    textAlign: 'left',
    hyphens: 'none',
    fontSize: 9
  },
  viewSubTitleSection: {
    padding: 6
  },
  viewCourses: {
    marginBottom: 5
  },
  background1: {
    backgroundColor: '#eff2f8'
  },
  background2: {
    backgroundColor: '#fdfee0'
  },
  background3: {
    backgroundColor: '#b0f2c2'
  }
})
