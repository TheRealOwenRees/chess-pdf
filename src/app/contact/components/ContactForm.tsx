"use client";

import { ContactFormValues } from "@/types";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import TextField from "@/app/contact/components/TextField";
import { handleContactSubmit } from "@/handlers/contactHandlers";
import { trpc } from "@/utils/trpc";

const ContactForm = () => {
  const [messageStatus, setMessageStatus] = useState({
    isSuccess: false,
    isSending: false,
    message: ""
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm<ContactFormValues>();

  const submitButtonText = messageStatus.isSending ? "Sending..." : "Send";
  const contact = trpc.discordContact.useMutation();

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    await handleContactSubmit(data, reset, contact, setMessageStatus);
  };

  return (
    <form className="grid w-3/4 max-w-lg gap-4 md:col-span-2" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Name*"
        name="name"
        placeholder="John Doe"
        required={"Name is required"}
        minLength={5}
        maxLength={50}
        errors={errors}
        register={register}
      />

      <TextField
        label="Email*"
        name="email"
        placeholder="example@email.com"
        pattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
        required={"Email address is required"}
        minLength={5}
        maxLength={50}
        errors={errors}
        register={register}
      />

      <TextField
        label="Subject"
        name="subject"
        placeholder="Reason for contacting us"
        required={false}
        minLength={5}
        maxLength={50}
        errors={errors}
        register={register}
      />

      <label className="block capitalize text-sm font-medium text-gray-900">Message*</label>
      <textarea
        placeholder="Your message here..."
        className="block p-2.5 border border-gray-500 text-gray-900 text-sm rounded-lg focus:border-primary-500 focus:ring-primary-500 shadow-sm placeholder-gray-500"
        {...register("message", { required: "A message is required" })}
        aria-invalid={errors.message ? "true" : "false"}
      />
      {
        errors.message &&
        <span role="alert" className="text-red-700">
          {errors.message.message}
        </span>
      }

      <input
        type="submit"
        value={submitButtonText}
        disabled={messageStatus.isSending}
        className="max-w-sm disabled:bg-gray-500 w-3/4 place-self-center disabled:pointer-events-none rounded-3xl px-3 py-2 bg-primary-500 text-white text-center text-xl font-bold hover:bg-white hover:text-primary-500 hover:border-primary-500 border-2 transition duration-300 cursor-pointer"
      />

      {
        <span
          role="alert"
          className="text-green-600 font-semibold"
        >
        {messageStatus.message}
      </span>
      }
    </form>
  );
};

export default ContactForm;