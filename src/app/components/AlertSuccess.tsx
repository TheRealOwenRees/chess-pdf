import { useAtomValue, useSetAtom } from 'jotai'
import { messageAtom } from "@/atoms";

const AlertSuccess = () => {
  const message = useAtomValue(messageAtom)
  const setMessageAtom = useSetAtom(messageAtom)

  return (
    <div role="alert" className="alert alert-success">
      <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <span>{message?.message}</span>
      <svg xmlns="http://www.w3.org/2000/svg"
           className="h-6 w-6 cursor-pointer"
           fill="none"
           viewBox="0 0 24 24"
           stroke="currentColor"
           data-test="alert-close"
           onClick={() => setMessageAtom({
             type: '',
             message: '',
             isSuccess: false,
             isSending: false,
           })}
      ><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
    </div>
  )
}

export default AlertSuccess