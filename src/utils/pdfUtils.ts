export const openPDFInNewTab = (pdf: Blob) => {
    const fileURL = URL.createObjectURL(pdf)
    const newTab = window.open(fileURL, '_blank')
    if (newTab) newTab.focus()
}