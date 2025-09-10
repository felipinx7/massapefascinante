export function formatDate(data: Date | string) {
  const objectData = typeof data === 'string' ? new Date(data) : data
  
  return new Intl.DateTimeFormat('pt-br', {
    dateStyle: 'short',
  }).format(objectData)
}
