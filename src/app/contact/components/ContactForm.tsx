"use client";

import { ContactFormValues } from "@/types";

import { useAtomValue, useSetAtom } from "jotai";
import { messageAtom } from "@/atoms";
import { trpc } from "@/utils/trpc";

import { useForm, SubmitHandler } from "react-hook-form";

import TextField from "@/app/contact/components/TextField";
import AlertSuccess from "@/app/components/AlertSuccess";
import AlertError from "@/app/components/AlertError";

import { handleContactSubmit } from "@/handlers/contactHandlers";

const ContactForm = () => {
  const message = useAtomValue(messageAtom)
  const setMessageAtom = useSetAtom(messageAtom)

  const renderAlert = () => {
    if (message?.isSuccess && message?.message) {
      return <AlertSuccess />;
    } else if (!message?.isSuccess && message?.message) {
      return <AlertError />;
    }
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm<ContactFormValues>();

  const submitButtonText = message?.isSending ? "Sending..." : "Send";
  const loadingSpinner = message?.isSending ? "loading loading-spinner" : "";

  const contact = trpc.discordContact.useMutation();

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    await handleContactSubmit(data, reset, contact, setMessageAtom);
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

      <label className="form-control">
        <div className="label">
          <span className="label-text">Message*</span>
        </div>
        <textarea
          placeholder="Your message here..."
          className="textarea textarea-bordered h-24 w-full focus:textarea-primary"
          {...register("message", { required: "A message is required" })}
          aria-invalid={errors.message ? "true" : "false"}
          />
        {
        errors.message &&
        <span role="alert" className="text-error">
          {errors.message.message}
        </span>
      }
      </label>

      <button
        type="submit"
        disabled={message?.isSending}
        className="btn btn-outline btn-primary">
        {submitButtonText}
        <span className={loadingSpinner}></span>
      </button>
      {renderAlert()}
    </form>
  );
};

export default ContactForm;