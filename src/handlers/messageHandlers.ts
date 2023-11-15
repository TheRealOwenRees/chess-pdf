import { Message } from "@/types";
import { Dispatch, SetStateAction } from "react";

export const handleClearMessage = (setMessage: Dispatch<SetStateAction<Message>>) => {
  setMessage({
      type: '',
      message: ''
      })
  }