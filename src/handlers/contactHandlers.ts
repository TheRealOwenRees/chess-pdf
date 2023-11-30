import { ChangeEvent } from "react";
import { ContactFormValues, GameProps, Header, MessageAtomState } from "@/types";
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
  contact: any, // TODO fix any
  setMessageAtom: (newValue: (prevState: MessageAtomState) => any) => void
) => {

  try {
    setMessageAtom(prevState => ({
      ...prevState,
      isSending: true
    }));

    reset();  // clear form fields

    const response = await contact.mutateAsync(data);
    if (response) {
      setMessageAtom(prevState => ({
        isSuccess: true,
        isSending: false,
        message: "Message sent!"
      }));

    }
  } catch (error) {
    console.log(error);
    setMessageAtom(prevState => ({
      ...prevState,
      isSuccess: false,
      isSending: false,
      message: "Something went wrong. Please try again later."
    }));
  } finally {
    setTimeout(() => {
      setMessageAtom(prevState => ({
        ...prevState,
        isSuccess: false,
        message: ""
      }));
    }, 10000);
  }
};
