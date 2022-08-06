import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useRef, useState } from 'react'
import styles from '../../styles/Dev.module.css'
import { cvEmpty } from '../../constants/cv'
import { encode } from 'js-base64';
import Image from 'next/image'
import logo from '../../public/img/logo.png'

export default function Deploy () {
  const router = useRouter()
  const nameRef = useRef(null)
  const lastNameRef = useRef(null)
  const titleRef = useRef(null)
  const [show, setShow] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleContinue = () => {
    const firstName = nameRef.current.value
    const lastName = lastNameRef.current.value
    const title = titleRef.current.value
    if (firstName !== '' && lastName !== '' && title !== '') {
      const startData = {
        firstName,
        lastName,
        title
      }
      const cvCopy = {...cvEmpty}
      cvCopy.personal = {...cvCopy.personal, ...startData}
      router.push(`/deploy/${encode(JSON.stringify(cvCopy))}`)
    } else {
      setShow(true)
    }
  }

  return (
    <div>
      <Head>
        <title>Construcción</title>
        <meta name='description' content='App for Create Portafolio' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <header className={styles.header}>
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
      </header>
      <main className={styles.main}>
        <div className={styles.content}>
          {
            show &&
              <div className={styles.message}>
                <h3>Complete todos los campos ✍️</h3>
              </div>
          }
          <form onSubmit={handleSubmit} className={styles.formulario}>
            <div>
              <label htmlFor='name'>Nombre(s)</label>
              <input id='name' className={styles.input} ref={nameRef} type='text' placeholder='Ingrese Nombre(s)' />
            </div>
            <div>
              <label htmlFor='lastname'>Apellido(s)</label>
              <input id='lastname' className={styles.input} ref={lastNameRef} type='text' placeholder='Ingrese Apellido(s)' />
            </div>
            <div>
              <label htmlFor='title'>Titulo</label>
              <input id='title' className={styles.input} ref={titleRef} type='text' placeholder='Por ejemplo: Full Stack Developer' />
            </div>
            <button onClick={handleContinue} className={styles.button}>Continuar</button>
          </form>
        </div>
      </main>
    </div>
  )
}
