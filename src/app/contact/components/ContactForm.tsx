"use client";

import { ContactFormValues } from "@/types";
import { useForm, SubmitHandler } from "react-hook-form";
import TextField from "@/app/contact/components/TextField";
import { handleContactSubmit } from "@/handlers/contactHandlers";
import { useState } from "react";

const ContactForm = () => {
  const [isSending, setIsSending] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm<ContactFormValues>();

  const submitButtonText = isSending ? "Sending..." : "Send";
  const sendButtonIcons = (
    isSending
      ? <span className="loading loading-spinner"></span>
      : <svg width="24px"
             height="24px"
             viewBox="0 -12 158 158"
             fill="none"
             xmlns="http://www.w3.org/2000/svg"
             className="fill-primary"
        >
          <path d="M6.72129 53.8326C5.22886 54.369 3.79008 55.0461 2.42414 55.8549C1.99492 56.0692 1.62306 56.3841 1.33985 56.7732C1.05664 57.1622 0.870351 57.614 0.796627 58.0907C0.728141 58.9623 1.18429 59.8347 2.14826 60.6823C2.95005 61.3417 3.81412 61.9203 4.72808 62.4099C5.42909 62.8132 6.14303 63.1944 6.85696 63.575C7.87906 64.1201 8.93607 64.6808 9.92071 65.3035C23.2735 73.7162 35.4245 81.1753 48.7508 87.2021C48.7223 87.6822 48.6907 88.1609 48.6584 88.6377C48.5679 89.9855 48.4749 91.3782 48.4729 92.7533C48.4699 94.8297 48.4618 96.9073 48.4484 98.9863C48.4141 105.578 48.3786 112.395 48.5989 119.098C48.6784 121.515 49.5403 123.243 51.0256 123.964C52.5872 124.719 54.5946 124.279 56.6783 122.719C57.4297 122.156 58.1998 121.524 59.032 120.785C62.6824 117.545 66.3277 114.298 70.0078 111.02L73.343 108.049C73.3682 108.068 73.3927 108.087 73.4153 108.107L76.4991 110.778C80.01 113.816 83.6397 116.957 87.1829 120.08C88.1921 120.967 89.2071 121.85 90.2279 122.727C93.3395 125.417 96.5596 128.198 99.4515 131.179C100.984 132.756 102.474 133.498 104.264 133.498C105.036 133.487 105.803 133.372 106.546 133.158C109.158 132.442 110.843 130.835 112.011 127.954C116.411 117.096 120.915 106.068 125.269 95.4041C128.844 86.644 132.416 77.8832 135.985 69.1212C143.674 50.3116 150.308 31.082 155.854 11.5231C156.526 9.25442 156.998 6.93056 157.266 4.57852C157.355 4.03355 157.322 3.47531 157.169 2.945C157.015 2.41468 156.745 1.92589 156.379 1.51476C155.937 1.11363 155.412 0.817045 154.841 0.646857C154.272 0.476668 153.671 0.437215 153.083 0.531243C152.306 0.62523 151.539 0.799482 150.796 1.05151L150.696 1.08216C149.028 1.58303 147.355 2.06949 145.682 2.5567C141.796 3.6879 137.778 4.85757 133.878 6.19107C105.715 15.8287 77.1517 26.3209 48.9821 37.3766C40.8575 40.564 32.5849 43.7787 24.5844 46.8861C18.6266 49.1966 12.6722 51.5121 6.72129 53.8326ZM60.3339 83.5438C61.8845 82.2395 63.3543 81.0069 64.863 79.8484C70.7773 75.3015 76.6975 70.7617 82.6228 66.2304C94.2653 57.3147 106.305 48.0953 118.081 38.9404C121.682 36.1433 125.099 32.9988 128.404 29.9637C129.539 28.9229 130.673 27.8776 131.816 26.8465C132.728 26.0243 134.254 24.6486 133.408 21.9607C133.38 21.8729 133.335 21.7918 133.275 21.7225C133.215 21.6532 133.141 21.5973 133.059 21.5582C132.976 21.5193 132.886 21.4978 132.794 21.4951C132.703 21.4924 132.612 21.5085 132.527 21.5424C132.174 21.6862 131.833 21.8131 131.504 21.9328C130.819 22.1684 130.152 22.4534 129.508 22.7856C107.655 34.7331 88.645 50.3999 70.2617 65.552C66.1042 68.9781 62.1856 72.5122 58.0409 76.2499C56.2809 77.8377 54.5032 79.432 52.7074 81.0335L11.7046 58.6697C11.9409 58.5229 12.189 58.3963 12.4463 58.2911C19.0407 55.791 25.6326 53.2819 32.2218 50.7636C48.3566 44.61 65.0432 38.2463 81.5231 32.1929C96.1997 26.8017 111.219 21.5788 125.743 16.5278C130.572 14.8487 135.401 13.1663 140.228 11.4807C142.099 10.8263 143.986 10.3144 145.986 9.77318C146.515 9.63008 147.047 9.48508 147.581 9.33807C139.534 35.016 129.269 60.2022 119.336 84.5728C114.116 97.3783 108.723 110.61 103.68 123.835C89.9733 112.724 76.6781 100.978 63.8163 89.6134C62.0792 88.077 60.3384 86.5399 58.5939 85.0022C59.187 84.5045 59.7653 84.0193 60.3319 83.5438H60.3339ZM67.952 103.131L56.1931 113.163L55.2608 91.3281L67.952 103.131Z" />
        </svg>
  )

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    await handleContactSubmit(data, reset, setIsSending);
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
        disabled={isSending}
        className="btn btn-outline btn-primary mb-4">
        {submitButtonText}
        {sendButtonIcons}
      </button>
    </form>
  );
};

export default ContactForm;
