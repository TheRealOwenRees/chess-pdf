import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { ContactFormValues, GameProps, Header } from "@/types";
import { type UseFormReset } from "react-hook-form";
import { toast } from "react-toastify";

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
  setIsSending: Dispatch<SetStateAction<boolean>>,
) => {

  try {
    setIsSending(true);

    const response = await contact.mutateAsync(data);
    if (response) {
      toast.success("Message sent!", {
        toastId: "contact-success"
      });
      reset();  // clear form fields
    }
  } catch (error) {
    toast.error("Something went wrong. Please try again later.", {
      toastId: "contact-error"
    });
  } finally {
    setIsSending(false);
  }
};
