import { useContext, useState } from 'react'
import styles from './Field.module.css'
import FormContext from '../../context/FormContext'
import Image from 'next/image'
import iconEdit from '../../public/img/edit.svg'

export default function Field ({ nameField, valueField }) {
  const { form, setForm } = useContext(FormContext)
  const [edit, setEdit] = useState(false)
  const [field, setField] = useState(valueField)
  const handleClick = () => setEdit(true)
  const { ...formAuxiliar } = form

  const handleSave = () => {
    formAuxiliar.fields[nameField] = field
    setForm(formAuxiliar)
    setEdit(false)
  }

  const handleCancel = () => setEdit(false)

  if (edit) {
    return (
      <div className={styles.containerFieldEdit}>
        <input type='text' value={field} onChange={(e) => setField(e.target.value)} />
        <button onClick={handleSave} title='Editar' type='button'>Guardar</button>
        <button onClick={handleCancel} title='Editar'>Cancelar</button>
      </div>
    )
  }

  return (
    <div className={styles.containerEdit}>
      <label className={styles.labelEdit}>
        {valueField}:
        <button className={styles.buttonEdit} onClick={handleClick} title='editar'>
          <Image
            alt="icono de editar"
            src={iconEdit}
            width={30}
            height={30}
          />
        </button>
      </label>
    </div>
  )
}
