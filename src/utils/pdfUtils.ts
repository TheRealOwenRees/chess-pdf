// export const openPDFInNewTab = (pdf: Blob) => {
//     const fileURL = URL.createObjectURL(pdf)
//     const newTab = window.open(fileURL, '_blank')
//     if (newTab) newTab.focus()
// }

export const downloadPDF = (pdf: Blob) => {
    const fileName = 'game.pdf'
    const fileURL = URL.createObjectURL(pdf)
    const a = document.createElement('a')
    a.href = fileURL
    a.download = fileName
    a.click()
}
