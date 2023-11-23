'use client'

import { Message } from '@/types'
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { handleClearMessage } from "@/handlers/messageHandlers";
import useAlertColours from "@/hooks/useAlertColours";

const Alert = ({ type, message, setMessage } : {
    type: string
    message: string,
    setMessage: Dispatch<SetStateAction<Message>>
}) => {

  const { alertDiv, alertSvg, setAlertColour } = useAlertColours()

  useEffect(() => {
    if (type === 'success') {
      setAlertColour('green')
    } else if (type === 'error') {
      setAlertColour('red')
    } else {
      setAlertColour('red')
    }
  }, [type, setAlertColour]);

    return (
      type && message &&
        <div className={alertDiv}
             role="alert"
             data-test="alert-div"
        >
            <strong data-test="type" className="font-bold capitalize">{`${type}! `}</strong>
            <span data-test="message" className="block sm:inline">{message}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg data-test="close-button" className={alertSvg}
               onClick={() => handleClearMessage(setMessage)}
               role="button" xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 20 20">
            <title>Close</title>
            <path
                d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
            />
          </svg>
        </span>
        </div>
    )
}

export default Alert