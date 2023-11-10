export const downloadString = (string: string, filename: string) => {
  try {
    const element = document.createElement('a')
    const file = new Blob([string], { type: 'text/plain' })

    element.href = URL.createObjectURL(file)
    element.download = filename
    document.body.appendChild(element)
    element.click()
  } catch (error) {
    throw new Error("Failed to download file")
  }
}