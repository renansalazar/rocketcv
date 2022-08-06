import { useState } from "react"

const useTimeOut = (funcion) => {
  const [timeOutId, setTimeOutId] = useState(null)

  const ejecutar = () => {
    cancelar()
    const toId = setTimeout(funcion, 2000)
    setTimeOutId(toId)
  }

  const cancelar = () => {
    if(timeOutId !==  null) {
      clearTimeout(timeOutId)
    }
  }

  return { ejecutar }
}

export default useTimeOut