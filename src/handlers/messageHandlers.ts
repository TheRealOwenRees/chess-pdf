export const handleSetMessage = (type: string, message: string, setMessageAtom: any)  => {  // TODO fix any type
  setMessageAtom({
    type: type,
    message: message
  })
  setTimeout(() => {
    setMessageAtom()
  }, 10000)
}