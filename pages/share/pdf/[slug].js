import { PDFViewer } from '@react-pdf/renderer'
import DocumentRender from '../../../components/Document'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { fetcher } from '../../../constants/fetcher'
import styles from '../../../styles/Preview.module.css'
import Loader from '../../../components/Loader'

export default function SharePDF () {
  const router = useRouter()
  console.log(router.query.slug)
  const { data, error } = useSWR(`/api/cv/${router.query.slug}`, fetcher)

  if (error) return (<span>¡Ocurrio un error inesperado!😞</span>)
  if (!data && !error) {
    return (<div className={styles.loadingContainer}>
      <h4>
        <Loader infinito />
      </h4>
    </div>)
  }

  return (
    <div style={{height: '100%', width: '100%', position: 'absolute'}}>
      <PDFViewer style={{ width: '100%', height: '100%'}} showToolbar={true}>
        <DocumentRender data={data} stylesDoc={data !== null ? data.lienzo.theme : null} />
      </PDFViewer>
    </div>
  )
}
