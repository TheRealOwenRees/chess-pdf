import { MessageAtomState } from "@/types";
import { toast } from "react-toastify";

const useToast = (message: MessageAtomState, id: string) => {
  if (message?.isSuccess && message?.message) {
    toast.success(message.message, {
      toastId: `${id}-success`
    })
  } else if (!message?.isSuccess && message?.message) {
    toast.error(message.message, {
      toastId: `${id}-error`
    })
  }
}

export default useToast
