import { Fragment, useContext, useEffect, useState } from 'react'
import FormContext from '../../context/FormContext'
import LoadContext from '../../context/LoadContext'
import styles from './Forms.module.css'
import { getMonths } from '../../utils/getMonth'
import Field from '../Field'
import useTimeOut from '../../hooks/useTimeOut'
import { forms } from '../../constants/forms'
import Image from 'next/image'
import iconAdd from '../../public/img/add.svg'
import iconRemove from '../../public/img/remove.svg'

export const Formularios = ({name}) => {
  return name === forms.personal
    ? <FormPersonal />
    : name === forms.experience
      ? <FormExperience />
      : name === forms.education
        ? <FormEducation />
        : <FormCourses />
}

export const FormPersonal = () => {
  const { load, setLoad } = useContext(LoadContext)
  const { form, setForm } = useContext(FormContext)
  const { ...categories } = form
  const [formInput, setFormInput] = useState(form)
  const [toggle, setToggle] = useState(false)
  const { ejecutar } = useTimeOut(() => { 
    setLoad(false)
    setForm(categories) 
  })
  const ejecutarCambios = () => {
    setFormInput(categories)
    setLoad(true)
    ejecutar()
  }
  
  useEffect(() => {
    formInput.personal.skills.forEach((sk, i) => {
      const ele = document.querySelector('#skill-' + i)
      ele.value = sk
    })

    formInput.personal.extras.forEach((ex, i) => {
      const eleField = document.querySelector('#field-' + i)
      eleField.value = ex.field
      const eleValue = document.querySelector('#value-' + i)
      eleValue.value = ex.value
    })
  }, [toggle, formInput.personal.skills, formInput.personal.extras])

  const handleChange = (e) => {
    categories.personal[e.target.dataset.field] = e.target.value
    ejecutarCambios()
  }

  const handleChangeSkill = (e) => {
    categories.personal.skills[e.target.dataset.index] = e.target.value
    ejecutarCambios()
  }

  const handleChangeExtra = (e) => {
    const field = e.target.dataset.field
    const index = e.target.dataset.index
    categories.personal.extras[index][field] = e.target.value
    ejecutarCambios()
  }

  const handleAddButton = (field, value) => {
    categories.personal[field].push(value)
    ejecutarCambios()
  }

  const handleClose = (e) => {
    categories.personal.skills.splice(e.target.dataset.index, 1)
    ejecutarCambios()
    setToggle(!toggle)
  }

  const handleCloseExtra = (e) => {
    categories.personal.extras.splice(e.target.dataset.index, 1)
    ejecutarCambios()
    setToggle(!toggle)
  }

  const renderSkills = () => formInput.personal.skills.map((sk, i) => {
    return (
      <div key={i + 'skill'} className={styles.containerInput}>
        <input
          key={'skill' + i}
          id={'skill-' + i}
          type='text'
          onChange={handleChangeSkill}
          data-index={i}
          placeholder='Ingrese Skill'
        />
        <button className={styles.buttonRemove} onClick={handleClose} title='remover' data-index={i} >
          <Image
            alt="icono de eliminar"
            src={iconRemove}
            width={15}
            height={15}
          />
        </button>
      </div>
    )
  })

  const renderExtras = () => formInput.personal.extras.map((ex, i) => {
    return (
      <Fragment key={i + 'extra'}>
        <input
          key={'field' + i}
          id={'field-' + i}
          type='text'
          onChange={handleChangeExtra}
          data-index={i}
          data-field='field'
          placeholder='Ingrese Nombre de Campo'
        />
        <input
          key={'value' + i}
          id={'value-' + i}
          type='text'
          onChange={handleChangeExtra}
          data-index={i}
          data-field='value'
          placeholder='Ingrese Valor de Campo'
        />
        <button className={styles.buttonRemove} onClick={handleCloseExtra} title='remover' data-index={i}>
          <Image
            alt="icono de eliminar"
            src={iconRemove}
            width={15}
            height={15}
          />
        </button>
      </Fragment>
    )
  })

  const handleUploadImage = (e) => {
    const profile = e.target.files[0]
    categories.personal.image = profile
    ejecutarCambios()
  }

  return (
    <div className={styles.formulario}>
      <label>Nombre: </label>
      <input
        type='text'
        value={formInput.personal.firstName}
        onChange={handleChange}
        data-field='firstName'
        placeholder='Ingrese Nombre(s)'
      />
      <label>Apellido: </label>
      <input
        type='text'
        value={formInput.personal.lastName}
        onChange={handleChange}
        data-field='lastName'
        placeholder='Ingrese Apellido(s)'
      />
      <label>Titulo: </label>
      <input
        type='text'
        value={formInput.personal.title}
        onChange={handleChange}
        data-field='title'
        placeholder='Ingrese Titulo'
      />
      <label>Imagen de Perfil: </label>
      <input
        type='text'
        value={formInput.personal.image}
        onChange={handleChange}
        data-field='image'
        placeholder='Ingrese URL de imagen'
      />
      <Field nameField='aboutMe' valueField={formInput.fields.aboutMe} />
      <textarea
        type='text'
        rows='5'
        value={formInput.personal.aboutMe}
        onChange={handleChange}
        data-field='aboutMe'
        placeholder='Ingrese Resumen'
      />
      <Field nameField='skills' valueField={formInput.fields.skills} />
      <button onClick={() => handleAddButton('skills', '')}>
        <Image
          alt="icono de agregar"
          src={iconAdd}
          width={15}
          height={15}
        />
        Agregar Skill
      </button>
      <div className={styles.containerListItems}>
        {
          renderSkills()
        }
      </div>
      <Field nameField='extras' valueField={formInput.fields.extras} />
      <button onClick={() => handleAddButton('extras', { field: '', value: '' })}>
        <Image
          alt="icono de agregar"
          src={iconAdd}
          width={15}
          height={15}
        />
        Agregar Dato
      </button>
      <div className={styles.containerListItems + ' ' + styles.fieldLine}>
        {
          renderExtras()
        }
      </div>
    </div>
  )
}

export const FormExperience = () => {
  const { form, setForm } = useContext(FormContext)
  const { load, setLoad } = useContext(LoadContext)
  const [formInput, setFormInput] = useState(form)
  const { ...categories } = form
  const { ejecutar } = useTimeOut(() => { 
    setLoad(false)
    setForm(formInput) 
  })
  const ejecutarCambios = () => {
    setFormInput(categories)
    setLoad(true)
    ejecutar()
  }

  const handleChange = (e) => {
    const field = e.target.dataset.field
    const order = Number(e.target.dataset.order)
    const target = e.target
    const index = categories.experience.findIndex(edu => edu.order === order)
    if (index >= 0) {
      if (field === 'currently') {
        categories.experience[index][field] = target.checked
        categories.experience[index].monthEnd = ''
        categories.experience[index].yearEnd = ''
      } else {
        categories.experience[index][field] = target.value
      }
      ejecutarCambios()
    }
  }

  const handleClose = (e) => {
    const order = Number(e.target.dataset.order)
    const index = categories.experience.findIndex(exp => exp.order === order)
    categories.experience.splice(index, 1)
    ejecutarCambios()
  }

  const renderList = () => formInput.experience.map((exp, i) => (
    <div key={exp.order + '-education'} className={styles.groupItem}>
      {i !== 0 && <hr />}
      <div className={styles.containerInputRemover}>
        <label>Experiencia<i> {i + 1}</i></label>
        <button
          className={styles.buttonRemove}
          onClick={handleClose}
          data-order={exp.order}
          title='remover'
        >
          <Image
            alt="icono de eliminar"
            src={iconRemove}
            width={15}
            height={15}
          />
        </button>
      </div>

      <label>Puesto: </label>
      <input
        type='text'
        onChange={handleChange}
        value={exp.title}
        placeholder='Ingrese titulo del Puesto'
        data-field='title'
        data-order={exp.order}
      />
      <label>Empresa: </label>
      <input
        type='text'
        onChange={handleChange}
        value={exp.company}
        placeholder='Ingrese nombre de Empresa'
        data-field='company'
        data-order={exp.order}
      />
      <label>Descripción: </label>
      <textarea
        type='text'
        rows='5'
        style={{ whiteSpace: 'pre-line' }}
        value={exp.description}
        onChange={handleChange}
        data-field='description'
        data-order={exp.order}
        placeholder='Ingrese Descripción'
      />
      <label>Ingreso: </label>
      <select
        onChange={handleChange}
        value={exp.monthStart}
        placeholder='Ingrese mes de inicio'
        data-field='monthStart'
        data-order={exp.order}
      >
        <option value='0'>Seleccione mes</option>
        {getMonths.map((m, i) => <option key={'month' + i} value={m.numberMonth}>{m.month}</option>)}
      </select>
      <input
        type='number'
        onChange={handleChange}
        value={exp.yearStart}
        placeholder='Ingrese año de inicio'
        data-field='yearStart'
        data-order={exp.order}
      />
      <label className={styles.checkBox}>
        <input
          type='checkbox'
          checked={exp.currently}
          onChange={handleChange}
          data-field='currently'
          data-order={exp.order}
        />
        Hasta la Actualidad
      </label>
      <label>Fin: </label>
      <select
        onChange={handleChange}
        value={exp.monthEnd}
        placeholder='Ingrese mes de fin'
        disabled={exp.currently}
        data-field='monthEnd'
        data-order={exp.order}
      >
        <option value='0'>Seleccione mes</option>
        {getMonths.map((m, i) => <option key={'month' + i} value={m.numberMonth}>{m.month}</option>)}
      </select>
      <input
        type='number'
        onChange={handleChange}
        value={exp.yearEnd}
        placeholder='Ingrese año de fin'
        data-field='yearEnd'
        disabled={exp.currently}
        data-order={exp.order}
      />
    </div>
  ))

  const handleAddButton = () => {
    const maxOrder = Math.max(...categories.experience.map(exp => exp.order))
    categories.experience.push({
      order: maxOrder + 1, company: '', title: ''
    })
    ejecutarCambios()
  }

  return (
    <div className={styles.formulario}>
      <h2><Field nameField='experience' valueField={formInput.fields.experience} /></h2>
      <button onClick={handleAddButton}>
        <Image
          alt="icono de agregar"
          src={iconAdd}
          width={15}
          height={15}
        />
        Agregar
      </button>
      {
          renderList()
      }
    </div>
  )
}

export const FormEducation = () => {
  const { load, setLoad } = useContext(LoadContext)
  const { form, setForm } = useContext(FormContext)
  const [formInput, setFormInput] = useState(form)
  const { ...categories } = form
  const { ejecutar } = useTimeOut(() => { 
    setLoad(false)
    setForm(formInput) 
  })
  const ejecutarCambios = () => {
    setFormInput(categories)
    setLoad(true)
    ejecutar()
  }

  const handleChange = (e) => {
    const field = e.target.dataset.field
    const order = Number(e.target.dataset.order)
    const target = e.target
    const index = categories.education.findIndex(edu => edu.order === order)
    if (index >= 0) {
      if (field === 'currently') {
        categories.education[index][field] = target.checked
        categories.education[index].monthEnd = ''
        categories.education[index].yearEnd = ''
      } else {
        categories.education[index][field] = target.value
      }
      ejecutarCambios()
    }
  }

  const handleClose = (e) => {
    const order = Number(e.target.dataset.order)
    const index = categories.education.findIndex(edu => edu.order === order)
    categories.education.splice(index, 1)
    ejecutarCambios()
  }

  const renderList = () => formInput.education.map((edu, i) => (
    <div key={edu.order + '-education'} className={styles.groupItem}>
      {i !== 0 && <hr />}
      <div className={styles.containerInputRemover}>
        <label>Educación<i> {i + 1}</i></label>
        <button className={styles.buttonRemove} onClick={handleClose} data-order={edu.order} title='remover'>
          <Image
            alt="icono de eliminar"
            src={iconRemove}
            width={15}
            height={15}
          />
        </button>
      </div>
      <label>Centro de Estudio: </label>
      <input
        type='text'
        onChange={handleChange}
        value={edu.school}
        placeholder='Ingrese Centro de Estudio'
        data-field='school'
        data-order={edu.order}
      />
      <label>Especialidad: </label>
      <input
        type='text'
        onChange={handleChange}
        value={edu.field}
        placeholder='Ingrese Especialidad'
        data-field='field'
        data-order={edu.order}
      />
      <label>Inicio: </label>
      <select
        onChange={handleChange}
        value={edu.monthStart}
        placeholder='Ingrese mes de inicio'
        data-field='monthStart'
        data-order={edu.order}
      >
        <option value='0'>Seleccione mes</option>
        {getMonths.map((m, i) => <option key={'month' + i} value={m.numberMonth}>{m.month}</option>)}
      </select>
      <input
        type='number'
        onChange={handleChange}
        value={edu.yearStart}
        placeholder='Ingrese año de inicio'
        data-field='yearStart'
        data-order={edu.order}
      />
      <label>Fin: </label>
      <label className={styles.checkBox}>
        <input
          type='checkbox'
          checked={edu.currently}
          onChange={handleChange}
          data-field='currently'
          data-order={edu.order}
        />
        Hasta la Actualidad
      </label>
      <select
        onChange={handleChange}
        value={edu.monthEnd}
        placeholder='Ingrese mes de fin'
        disabled={edu.currently}
        data-field='monthEnd'
        data-order={edu.order}
      >
        <option value='0'>Seleccione mes</option>
        {getMonths.map((m, i) => <option key={'month' + i} value={m.numberMonth}>{m.month}</option>)}
      </select>
      <input
        type='number'
        onChange={handleChange}
        value={edu.yearEnd}
        placeholder='Ingrese año de fin'
        data-field='yearEnd'
        disabled={edu.currently}
        data-order={edu.order}
      />
    </div>
  ))

  const handleAddButton = () => {
    const maxOrder = Math.max(...categories.education.map(edu => edu.order))
    categories.education.push({
      order: maxOrder + 1, school: '', field: ''
    })
    ejecutarCambios()
  }

  return (
    <div className={styles.formulario}>
      <h2><Field nameField='education' valueField={formInput.fields.education} /></h2>
      <button onClick={handleAddButton}>
        <Image
          alt="icono de agregar"
          src={iconAdd}
          width={15}
          height={15}
        />
        Agregar
      </button>
      {
          renderList()
      }
    </div>
  )
}

export const FormCourses = () => {
  const { load, setLoad } = useContext(LoadContext)
  const { form, setForm } = useContext(FormContext)
  const [formInput, setFormInput] = useState(form)
  const { ...categories } = form
  const { ejecutar } = useTimeOut(() => { 
    setLoad(false)
    setForm(formInput) 
  })
  const ejecutarCambios = () => {
    setFormInput(categories)
    setLoad(true)
    ejecutar()
  }

  const handleChange = (e) => {
    const field = e.target.dataset.field
    const order = Number(e.target.dataset.order)
    const target = e.target
    const index = categories.courses.findIndex(edu => edu.order === order)
    if (index >= 0) {
      if (field === 'currently') {
        categories.courses[index][field] = target.checked
        categories.courses[index].monthEnd = ''
        categories.courses[index].yearEnd = ''
      } else {
        categories.courses[index][field] = target.value
      }
      ejecutarCambios()
    }
  }

  const handleClose = (e) => {
    const order = Number(e.target.dataset.order)
    const index = categories.courses.findIndex(edu => edu.order === order)
    categories.courses.splice(index, 1)
    ejecutarCambios()
  }

  const renderList = () => formInput.courses.map((edu, i) => (
    <div key={edu.order + '-education'} className={styles.groupItem}>
      {i !== 0 && <hr />}
      <div className={styles.containerInputRemover}>
        <label>Curso<i> {i + 1}</i></label>
        <button className={styles.buttonRemove} onClick={handleClose} data-order={edu.order} title='remover'>
          <Image
            alt="icono de eliminar"
            src={iconRemove}
            width={15}
            height={15}
          />
        </button>
      </div>
      <label>Especialidad: </label>
      <input
        type='text'
        onChange={handleChange}
        value={edu.field}
        placeholder='Ingrese Especialidad'
        data-field='field'
        data-order={edu.order}
      />
      <label>Centro de Estudio: </label>
      <input
        type='text'
        onChange={handleChange}
        value={edu.school}
        placeholder='Ingrese Centro de Estudio'
        data-field='school'
        data-order={edu.order}
      />
      <label>Inicio: </label>
      <select
        onChange={handleChange}
        value={edu.monthStart}
        placeholder='Ingrese mes de inicio'
        data-field='monthStart'
        data-order={edu.order}
      >
        <option value='0'>Seleccione mes</option>
        {getMonths.map((m, i) => <option key={'month' + i} value={m.numberMonth}>{m.month}</option>)}
      </select>
      <input
        type='number'
        onChange={handleChange}
        value={edu.yearStart}
        placeholder='Ingrese año de inicio'
        data-field='yearStart'
        data-order={edu.order}
      />
      <label>Fin: </label>
      <label className={styles.checkBox}>
        <input
          type='checkbox'
          checked={edu.currently}
          onChange={handleChange}
          data-field='currently'
          data-order={edu.order}
        />
        Hasta la Actualidad
      </label>
      <select
        onChange={handleChange}
        value={edu.monthEnd}
        placeholder='Ingrese mes de fin'
        disabled={edu.currently}
        data-field='monthEnd'
        data-order={edu.order}
      >
        <option value='0'>Seleccione mes</option>
        {getMonths.map((m, i) => <option key={'month' + i} value={m.numberMonth}>{m.month}</option>)}
      </select>
      <input
        type='number'
        onChange={handleChange}
        value={edu.yearEnd}
        placeholder='Ingrese año de fin'
        data-field='yearEnd'
        disabled={edu.currently}
        data-order={edu.order}
      />
      <label>Url de Certificado<small>(opcional)</small>: </label>
      <input
        type='text'
        onChange={handleChange}
        value={edu.credential}
        placeholder='Ingrese Credencial'
        data-field='credential'
        data-order={edu.order}
      />
    </div>
  ))

  const handleAddButton = () => {
    const maxOrder = Math.max(...categories.courses.map(edu => edu.order))
    categories.courses.push({
      order: maxOrder + 1, school: '', field: ''
    })
    ejecutarCambios()
  }

  return (
    <div className={styles.formulario}>
      <h2><Field nameField='course' valueField={formInput.fields.course} /></h2>
      <button onClick={handleAddButton}>
        <Image
          alt="icono de agregar"
          src={iconAdd}
          width={15}
          height={15}
        />
        Agregar
      </button>
      {
        renderList()
      }
    </div>
  )
}
