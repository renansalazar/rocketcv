import { PDFDownloadLink } from '@react-pdf/renderer'
import React, { useContext, useState } from 'react'
import DocumentRender from '../Document'
import FormContext from '../../context/FormContext'
import styles from './ButtonDownload.module.css'
import Image from 'next/image'
import shareIcon from '../../public/img/share.svg'

const ButtonDownload = ({onDownload}) => {
  const { form } = useContext(FormContext)
  const [show, setShow] = useState(false)
  const fileName = `CVdeploy-${form.personal.firstName}-${form.personal.lastName}`

  const handleDownloadJSON = () => {
    const a = document.createElement("a")
    const file = new Blob([JSON.stringify(form)], {type: 'text/plain'})
    const url = URL.createObjectURL(file)
    a.href = url;
    a.download = `${fileName}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className={styles.containerButton}>
      <button type='button' className={styles.buttonSelect} onClick={() => setShow(prev=>!prev)}>
        Compartir
        <Image
          alt="paleta de colores"
          src={shareIcon}
          width={18}
          height={18}
        />
      </button>
      <div className={show ? styles.show : styles.hidden}>
        <div>
          <button onClick={() => onDownload('pdf')}>Online PDF</button>
          <hr/>
        </div>
        <div>
          <button type='button' onClick={handleDownloadJSON}>
            Descargar JSON
          </button>
          <PDFDownloadLink
            document={<DocumentRender data={form} stylesDoc={form !== null ? form.lienzo.theme : null} />}
            fileName={`${fileName}.pdf`}
          >
            {({ blob, url, loading, error }) => (loading ? 'Cargando...' : 'Descargar PDF')}
          </PDFDownloadLink>
        </div>
      </div>
    </div>
  )
}

export default ButtonDownload
