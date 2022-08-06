import LoadContext from '../../context/LoadContext'
import { useContext } from 'react'
import styles from './Loader.module.css'

export default function Loader ({infinito = false}) {
  const { load  } = useContext(LoadContext)
  if(!load && !infinito) return <></>

  return (
    <div className={styles.spinner}></div>
  )
}