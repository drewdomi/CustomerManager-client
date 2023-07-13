function maskCpf(Numcpf: string) {
  return Numcpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export default maskCpf;