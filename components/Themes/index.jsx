import React, { useContext, useState } from 'react'
import styles from './Themes.module.css'
import FormContext from '../../context/FormContext'
import Image from 'next/image'
import themeIcon from '../../public/img/theme.svg'

const colors = {
  first: '#eff2f8',
  second: '#fdfee0',
  third: '#b0f2c2'
}

const themes = {
  theme1: 'theme1',
  theme2: 'theme2',
}

export default function Theme () {
  const { form, setForm } = useContext(FormContext)
  const { ...categories } = form
  const [showOptions, setShowOptions] = useState(false)

  const handleColor = (color) => {
    categories.lienzo.colorTheme = color
    setForm(categories)
  }

  const handleTema = (theme) => {
    categories.lienzo.theme = theme
    setForm(categories)
  }

  const handleClick = () => {
    setShowOptions(!showOptions)
  }

  return (
    <div className={styles.containerThemes}>
      <button className={styles.buttonSelect} onClick={handleClick}>
        Editar Diseño
        <Image
          alt="paleta de colores"
          src={themeIcon}
          width={18}
          height={18}
        />
      </button>
      {
        showOptions &&
        <div className={styles.containerOptions}>
          <span>Temas</span>
          <ul>
            <li>
              <button
                className={(categories.lienzo.theme === themes.theme1 ? styles.active : '' ) + ' ' + styles.theme}
                onClick={() => handleTema(themes.theme1)}
              >Tema 1</button>
            </li>
            <li>
              <button
                className={(categories.lienzo.theme === themes.theme2 ? styles.active : '') + ' ' + styles.theme}
                onClick={() => handleTema(themes.theme2)}
              >Tema 2</button>
            </li>
          </ul>
          <hr/>
          <span>Colores</span>
          <ul>
            <li>
              <button
                className={categories.lienzo.colorTheme === colors.first ? styles.active : null}
                style={{ background: colors.first }}
                onClick={() => handleColor(colors.first)}
              />
            </li>
            <li>
              <button
                className={categories.lienzo.colorTheme === colors.second ? styles.active : null}
                style={{ background: colors.second }}
                onClick={() => handleColor(colors.second)}
              />
            </li>
            <li>
              <button
                className={categories.lienzo.colorTheme === colors.third ? styles.active : null}
                style={{ background: colors.third }}
                onClick={() => handleColor(colors.third)}
              />
            </li>
          </ul>
        </div>
      }
    </div>
  )
}
