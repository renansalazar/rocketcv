export const getMonths = [
  { numberMonth: '1', month: 'Enero' },
  { numberMonth: '2', month: 'Febrero' },
  { numberMonth: '3', month: 'Marzo' },
  { numberMonth: '4', month: 'Abril' },
  { numberMonth: '5', month: 'Mayo' },
  { numberMonth: '6', month: 'Junio' },
  { numberMonth: '7', month: 'Julio' },
  { numberMonth: '8', month: 'Agosto' },
  { numberMonth: '9', month: 'Setiembre' },
  { numberMonth: '10', month: 'Octubre' },
  { numberMonth: '11', month: 'Noviembre' },
  { numberMonth: '12', month: 'Diciembre' }
]
const getDate = (numberMonth, year) => {
  const month = getMonths.find(m => m.numberMonth === numberMonth)
  const yearAux = year || ''
  return month ? month.month + ' ' + yearAux : yearAux
}

export default getDate
