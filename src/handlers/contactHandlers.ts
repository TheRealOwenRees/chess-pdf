import { Dispatch, SetStateAction, ChangeEvent } from "react";
import { ContactFormValues, GameProps, MessageStatus, Header } from "@/types";
import { type UseFormReset } from "react-hook-form";

export const handleInputChange = (
  e: ChangeEvent<HTMLInputElement>,
  gameState: GameProps,
  gameDispatch: any, // TODO fix any
  fieldName: string,
) => {
  e.preventDefault();
  const updatedHeaders = { ...gameState.headers, [fieldName]: e.target.value } as Header;
  gameDispatch({ type: 'SET_HEADERS', payload: updatedHeaders })
};

export const handleContactSubmit = async (
  data: ContactFormValues,
  reset: UseFormReset<ContactFormValues>,
  contact: any,
  setMessageStatus: Dispatch<SetStateAction<MessageStatus>>
) => {

  try {
    setMessageStatus(prevState => ({
      ...prevState,
      isSending: true
    }));

    reset();  // clear form fields

    const response = await contact.mutateAsync(data);
    if (response) {
      setMessageStatus(prevState => ({
        isSuccess: true,
        isSending: false,
        message: "Message sent!"
      }));

    }
  } catch (error) {
    console.log(error);
    setMessageStatus(prevState => ({
      isSuccess: false,
      isSending: false,
      message: "Something went wrong. Please try again later."
    }));
  } finally {
    setTimeout(() => {
      setMessageStatus(prevState => ({
        ...prevState,
        isSuccess: false,
        message: ""
      }));
    }, 5000);
  }
};
