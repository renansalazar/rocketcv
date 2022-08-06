import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import Split from 'split-grid'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../../styles/Preview.module.css'
import {FormProvider} from '../../context/FormContext'
import { Formularios } from '../../components/Forms'
import dynamic from 'next/dynamic'
import Loader from '../../components/Loader'
import {LoadProvider} from '../../context/LoadContext'
import { forms } from '../../constants/forms'
import useSWR from 'swr'
import { fetcher } from '../../constants/fetcher'
import Image from 'next/image'
import iconPersonal from '../../public/img/personal.svg'
import iconExperiencia from '../../public/img/experience.svg'
import iconEducacion from '../../public/img/education.svg'
import iconCursos from '../../public/img/courses.svg'
import logo from '../../public/img/logo.png'
const ButtonDownload = dynamic(() => import('../../components/ButtonDownload'), { ssr: false })
const LienzoContainer = dynamic(() => import('../../components/LienzoContainer'), { ssr: false })
const Themes = dynamic(() => import('../../components/Themes'), { ssr: false })

export default function DeployEditor () {
  const router = useRouter()
  const { data, error, isValidating } = useSWR(`/api/cv/${router.query.slug}`, fetcher)
  const [formu, setFormu] = useState('personal')
  useEffect(() => {
    if(data && !isValidating){
      Split({
        columnGutters: [{
          track: 1,
          element: document.querySelector('.' + styles.gutterColumn)
        }]
      })
    }
  }, [data, isValidating])
  if (error) return (<span>¡Ocurrio un error inesperado!😞</span>)
  if (!data && !error) return (<div className={styles.loadingContainer}>
    <h4>
      <Loader infinito/>
    </h4>
  </div>)
  
  const handleDownload = (str) => {
    const urlHash = window.location.pathname.slice(8)
    window.open(`/share/pdf/${urlHash}`, '_blank')
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Deploy CV</title>
        <meta name='description' content='App para crear un CV' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <LoadProvider>
        <FormProvider cv={data}>
          <header>
            <div>
              <Link href='/'>
                <a className={styles.linkHome}>
                  <Image
                    alt="logo"
                    src={logo}
                    width={30}
                    height={30}
                  />
                </a>
              </Link>
            </div>
            <div className={styles.options}>
              <Themes />
              <ButtonDownload onDownload={handleDownload}/>
            </div>
          </header>
          <main className={styles.main}>
            <div className={styles.menuLateral}>
              <ul>
                <li>
                  <button className={formu === forms.personal && styles.active} onClick={() => { setFormu(forms.personal) }}>
                    <Image
                      alt="icono button personal"
                      src={iconPersonal}
                      width={30}
                      height={30}
                    />
                    Personal
                  </button>
                </li>
                <li>
                  <button className={formu === forms.experience && styles.active} onClick={() => { setFormu(forms.experience) }}>
                    <Image
                      alt="icono button experiencia"
                      src={iconExperiencia}
                      width={30}
                      height={30}
                    />
                    Experiencia
                  </button>
                </li>
                <li>
                  <button className={formu === forms.education && styles.active} onClick={() => { setFormu(forms.education) }}>
                    <Image
                      alt="icono button educacion"
                      src={iconEducacion}
                      width={30}
                      height={30}
                    />
                    Educación
                  </button>
                </li>
                <li>
                  <button className={formu === forms.courses && styles.active} onClick={() => { setFormu(forms.courses) }}>
                    <Image
                      alt="icono button cursos"
                      src={iconCursos}
                      width={30}
                      height={30}
                    />
                    Cursos
                  </button>
                </li>
              </ul>
              <div className={styles.formulario}>
                <Formularios name={formu}/>
              </div>
            </div>
            <div className={styles.gutterColumn} />
            <div className={styles.containerLienzo}>
              <Loader />
              <div className={styles.contentLienzo}>
                <LienzoContainer />
              </div>
            </div>
          </main>
        </FormProvider>
      </LoadProvider>
    </div>
  )
}
