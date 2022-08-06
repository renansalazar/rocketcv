import React, { useContext, useState, useEffect } from 'react'
import LoadContext from '../../context/LoadContext'
import {Canva} from '../Document'
import FormContext from '../../context/FormContext'
import { cvEmpty } from '../../constants/cv'
import useTimeOut from '../../hooks/useTimeOut';

var url = 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf';


const LienzoContainer = () => {
  const { form } = useContext(FormContext)
  const { setLoad  } = useContext(LoadContext)
  const { ...categories } = form
  const [start, setStart] = useState(false)
  
  const { ejecutar } = useTimeOut(() => {
    setLoad(false)
    setStart(true)
  })

  useEffect(()=> {
    setLoad(true)
    ejecutar()  
  }, [])

  return (<>
    <Canva dataRender={start ? categories : cvEmpty}/>
  </>
  )
}

export default LienzoContainer
