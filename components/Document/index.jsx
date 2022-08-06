import { useEffect, useState } from 'react'
import { Page, Text, View, Image, Document, PDFViewer, usePDF } from '@react-pdf/renderer'
import { stylesDocument, stylesDocumentTheme2 } from './styles'
import * as pdfjsLib  from 'pdfjs-dist/build/pdf'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry'
import getDate from '../../utils/getMonth'

const Documento = ({ data, stylesDoc = 'theme1'}) => {
  if(!data) return <Document><Page><View></View></Page></Document>
  const urlImage = data?.personal.image ?? ''
  const styles = stylesDoc === 'theme1' ? stylesDocument : stylesDocumentTheme2
  const existeHeader = stylesDoc === 'theme2'
  return (
    <Document style={styles.container}>
      <Page style={styles.page}>
        <View style={styles.pageContent}>
          <View style={[styles.sectionOne, {backgroundColor: existeHeader ? '#FFFFFF' : data.lienzo.colorTheme}]}>
            <View style={[existeHeader && styles.header, { backgroundColor: data.lienzo.colorTheme}]}>
              <View style={existeHeader && styles.headerColumnOne}>
                {
                  urlImage !== '' &&
                    <View style={styles.imageContainer}>
                      <Image style={styles.image} src={data.personal.image} alt='profile image' />
                    </View>
                }
              </View>
              <View style={existeHeader && styles.headerColumnTwo}>
                <View style={styles.view}>
                  <Text style={styles.textTitle}>{data && data.personal?.firstName + ' ' + data.personal?.lastName}</Text>
                </View>
                <View style={styles.view}>
                  <Text style={styles.textSubTitle}>
                    {data.personal?.title}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.view}>
              <Text style={[styles.textSubTitleSection, existeHeader && styles.viewSubTitleSection, { backgroundColor: data.lienzo.colorTheme }]}>
                {data.fields?.aboutMe}
              </Text>
              <Text style={styles.textParagraphSection}>
                {data.personal?.aboutMe}
              </Text>
            </View>
            <View style={styles.view}>
              <Text style={[styles.textSubTitleSection, existeHeader && styles.viewSubTitleSection, { backgroundColor: data.lienzo.colorTheme }]}>
                {data.fields?.skills}
              </Text>
              <View>
                <Text style={styles.textParagraphSection}>
                  {
                    data.personal?.skills.map((sk, i) => {
                      return sk && '- ' + sk + '\n'
                    })
                  }
                </Text>
              </View>
            </View>
            <View style={styles.view}>
              <Text style={[styles.textSubTitleSection, existeHeader && styles.viewSubTitleSection, { backgroundColor: data.lienzo.colorTheme }]}>
                {data.fields?.extras}
              </Text>
              <View>
                <Text style={[styles.textParagraphSection, styles.textAlignLeft]}>
                  {
                    data.personal?.extras.map((ex, i) => {
                      return `${i !== 0 ? '\n' : ''} ${ex.field}: ${ex.value}`
                    })
                  }
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.sectionTwo}>
            <View style={styles.view}>
              <Text style={[styles.textSubTitleSection, styles.viewSubTitleSection, { backgroundColor: data.lienzo.colorTheme }]}>
                {data && data.fields?.experience}
              </Text>
              {
                data.experience?.map(exp => {
                  return (
                    <View key={exp.order + '-' + exp.company}>
                      <Text style={styles.textTitleItem}>{exp.title}</Text>
                      {
                      exp.company !== '' && <Text style={styles.textSubTitleItem}>{exp.company.toUpperCase() + ' | ' + getDate(exp.monthStart, exp.yearStart) + ' - ' + (exp.currently ? 'Actualidad' : getDate(exp.monthEnd, exp.yearEnd))}</Text>
                    }
                      <Text style={styles.textParagraphSection}>
                        {exp.description}
                      </Text>
                    </View>
                  )
                })
              }
            </View>
            <View style={styles.view}>
              <Text style={[styles.textSubTitleSection, styles.viewSubTitleSection, { backgroundColor: data.lienzo.colorTheme }]}>
                {data && data.fields?.education}
              </Text>
              {
                data.education?.map(edu => {
                  return (
                    <View key={edu.order + '-' + edu.school}>
                      <Text style={styles.textTitleItem}>{edu.school + ' '}</Text>
                      {
                      edu.field !== '' && <Text style={styles.textSubTitleItem}>{edu.field.toUpperCase() + ' | ' + getDate(edu.monthStart, edu.yearStart) + ' - ' + (edu.currently ? 'Actualidad' : getDate(edu.monthEnd, edu.yearEnd))}</Text>
                    }
                    </View>
                  )
                })
              }
            </View>
            {
              data?.courses.length > 0 && data?.courses[0].field !== '' &&
                <View style={styles.view}>
                  {
                    data &&
                      <Text style={[styles.textSubTitleSection, styles.viewSubTitleSection, { backgroundColor: data.lienzo.colorTheme }]}>
                        {data && data.fields?.course}
                      </Text>
                  }
                  {
                    data && data.courses?.map(cou => {
                      return (
                        <View key={cou.order + '-' + cou.field} style={styles.viewCourses}>
                          <Text style={styles.textTitleItem}>{cou.field + ' '}</Text>
                          {
                            cou.school !== '' &&
                              <Text style={styles.textSubTitleItem}>{
                                cou.school.toUpperCase() + ' | ' +
                                getDate(cou.monthStart, cou.yearStart) + (cou.currently ? ' - Actualidad' : getDate(cou.monthEnd, cou.yearEnd) !== '' ? ' - ' + getDate(cou.monthEnd, cou.yearEnd) : '')
                                }
                                {
                                  cou.credential && <>{' | '}<a href={cou.credential} target='_blank' rel='noreferrer'>Credencial</a></>
                                }
                              </Text>
                          }
                        </View>
                      )
                    })
                  }
                </View>
            }
          </View>
        </View>
      </Page>
    </Document>
  )
}

export const Canva = ({dataRender}) => {
  const [instance, update] = usePDF({ document: <Documento data={dataRender} stylesDoc={dataRender !== null ? dataRender.lienzo.theme : null}/> });
  const [renderActive, setRenderActive] = useState(false)
  useEffect(() => {
    update()
  },[dataRender])
  useEffect(() => {
    if (instance.url !== null && !renderActive){
      pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker
      const url = instance.url
      const loadingTask = pdfjsLib.getDocument(url);
      setRenderActive(true)

      loadingTask.promise.then(function(pdf) {
        const pageNumber = 1;
        pdf.getPage(pageNumber).then(function(page) {
          const scale = 1;
          const viewport = page.getViewport({scale: scale})
          const canvas = document.querySelector('#the-canvas')
          canvas.innerHTML = ''
          const context = canvas.getContext('2d')
          canvas.height = viewport.height
          canvas.width = viewport.width
      
          const renderContext = {
            canvasContext: context,
            viewport: viewport
          }
          page.render(renderContext);
          setRenderActive(false)
        });
      });
    }
  }, [instance.url])
  return (
    <canvas id="the-canvas"></canvas>
  )
}

export default Documento
