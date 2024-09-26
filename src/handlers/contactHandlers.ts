import { Dispatch, SetStateAction } from "react";

import { type UseFormReset } from "react-hook-form";
import { toast } from "react-toastify";

import { sendContactFormMessage } from "@/server/actions/contact";
import { logError } from "@/server/actions/errorLogging";
import { ContactFormValues } from "@/types";

export const handleContactSubmit = async (
  data: ContactFormValues,
  reset: UseFormReset<ContactFormValues>,
  setIsSending: Dispatch<SetStateAction<boolean>>,
) => {
  try {
    setIsSending(true);

    const response = await sendContactFormMessage(data);
    if (response) {
      toast.success("Message sent!", {
        toastId: "contact-success",
      });
      reset(); // clear form fields
    }
  } catch (error) {
    if (error instanceof Error) {
      await logError(error.message);
    }
    toast.error("Something went wrong. Please try again later.", {
      toastId: "contact-error",
    });
  } finally {
    setIsSending(false);
  }
};
