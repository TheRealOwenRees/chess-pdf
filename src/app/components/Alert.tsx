import {Message} from '@/types'
import {Dispatch, SetStateAction} from "react";

import close from '@/assets/images/close.svg'

const Alert = ({type, message, setMessage} : {
    type: string
    message: string,
    setMessage: Dispatch<SetStateAction<Message>>
}) => {

    const handleClearMessage = () => {
    setMessage({
        type: '',
        message: ''
        })
    }

    if (type === 'success') {
        return (
            <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                 role="alert">
                <strong className="font-bold">Success! </strong>
                <span className="block sm:inline">{message}</span>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg className="fill-green-500 h-6 w-6 text-green-500"
                   onClick={handleClearMessage}
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

    if (type === 'error') {
        return (
            <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error! </strong>
                <span className="block sm:inline">{message}</span>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg className="fill-red-500 h-6 w-6 text-red-500"
                   onClick={handleClearMessage}
                   role="button" xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 20 20">
                <title>Close</title>
                <path
                    d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
              </svg>
            </span>
            </div>
        )
    }
}

export default Alert