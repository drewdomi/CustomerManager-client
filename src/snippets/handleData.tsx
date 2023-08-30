export function isValidCpf(cpf: string) {
  cpf = unMaskCpf(cpf)
  let sum = 0;
  let rest;

  if (!Array.from(cpf).filter(e => e !== cpf[0]).length) {
    return false;
  }

  for (let i = 1; i <= 9; i++) {
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }

  rest = (sum * 10) % 11;

  if ((rest == 10) || (rest == 11)) rest = 0;
  if (rest != parseInt(cpf.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }

  rest = (sum * 10) % 11;
  if ((rest == 10) || (rest == 11)) rest = 0;
  if (rest != parseInt(cpf.substring(10, 11))) return false;
  
  return true;
}

export function maskCpf(onlyNumCpf: string) {
  return onlyNumCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export function unMaskCpf(maskCpf: string){
  return maskCpf.replace(/[^0-9]/g, "")
}

export function maskDate(date: string){
  return date.split('-').reverse().join('/')
  // return from yyyy-mm-dd --> dd-mm-yyyy
}