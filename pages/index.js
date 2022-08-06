import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import iconRocket from '../public/img/rocket.svg'
import logo from '../public/img/logo.png'
import hero from '../public/img/hero.png'
import example1 from '../public/img/example1.png'
import example2 from '../public/img/example2.png'
import example3 from '../public/img/example3.png'
import example4 from '../public/img/example4.png'

export default function Home () {
  return (
    <div className={styles.main}>
      <Head>
        <title>Crea tu CV</title>
        <meta name='description' content='Página web para crear CV online' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <header className={styles.header}>
        <Image
          alt="icono de rocket"
          src={logo}
          width={30}
          height={30}
        />
        <h1>
          Rocket CV
        </h1>
      </header>
      <main>
        <section className={styles.hero}>
          <div className={styles.content} >
            <h1 className={styles.title} >Edita</h1>
            <h1 className={styles.title}>Previsualiza</h1>
            <h1 className={styles.title}>Comparte</h1>
            <p>Con <span>RocketCV</span> puedes completar y tener tu <span>CV</span> listo para enviar en el menor tiempo posible 💻.</p>
            <Link href='/deploy'>
              <a className={styles.button}>Empezar
                <Image
                  alt="icono de rocket"
                  src={iconRocket}
                  width={18}
                  height={18}
                /></a>
            </Link>
          </div>
          <div className={styles.containerImage}>
            <Image
              alt="img principal"
              src={hero}
              width={500}
              height={500}
            />
          </div>
        </section>
        <section className={styles.sectionDemos}>
          <div className={styles.imagesGroup}>
              <Image
                alt="img de demostración"
                src={example1}
                width={220}
                height={300}
              />
              <Image
                alt="img de demostración"
                src={example3}
                width={220}
                height={300}
              />
              <Image
                alt="img de demostración"
                src={example2}
                width={220}
                height={300}
              />
              <Image
                alt="img de demostración"
                src={example4}
                width={220}
                height={300}
              />
          </div>
          <div>
            <h2>Utiliza temas <span>profesionales</span> y <span>minimalistas</span></h2>
            <p>De manera totalmente gratuita y sin necesidad de registrarte</p>
          </div>
        </section>
      </main>
      <footer className={styles.footer}>
        Desarrollado con 💚 por{' '}<a href='https://github.com/renansalazar' target='_blank' rel='noreferrer'> Renan Salazar</a>
      </footer>
    </div>
  )
}
