export const formatData = (dataIso: string): string => {
  const data = new Date(dataIso)
  const dia = String(data.getUTCDate()).padStart(2, '0')
  const mes = String(data.getUTCMonth() + 1).padStart(2, '0')
  const ano = data.getUTCFullYear()
  return `${dia}/${mes}/${ano}`
}
