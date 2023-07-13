function maskDate(date: string){
  return date.split('-').reverse().join('/')
}

export default maskDate