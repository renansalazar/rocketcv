  export const cvEmpty = {
  personal: {
    image: '',
    firstName: '',
    lastName: '',
    title: '',
    aboutMe: '',
    skills: [''],
    extras: [
      { field: 'Email', value: '' },
      { field: 'Linkedin', value: '' }
    ]
  },
  education: [{
    order: 1,
    school: '',
    field: '',
    monthStart: '',
    yearStart: '',
    monthEnd: '',
    yearEnd: '',
    currently: false
  }],
  experience: [{
    order: 1,
    company: '',
    title: '',
    description: '',
    monthStart: '',
    yearStart: '',
    monthEnd: '',
    yearEnd: '',
    currently: false
  }],
  courses: [{
    order: 1,
    school: '',
    field: '',
    monthStart: '',
    yearStart: '',
    monthEnd: '',
    yearEnd: '',
    credential: '',
    currently: false
  }],
  lienzo: {
    theme: 'theme1',
    colorTheme: '#eff2f8'
  },
  fields: {
    aboutMe: 'Acerca de mi',
    skills: 'Skills',
    extras: 'Datos Personales',
    experience: 'Experiencia Laboral',
    education: 'Trayectoria Académica',
    course: 'Cursos'
  }
}