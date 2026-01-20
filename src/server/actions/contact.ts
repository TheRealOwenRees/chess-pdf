"use server";

import { ContactFormValues } from "@/types";

export const sendContactFormMessage = async (formData: ContactFormValues) => {
  try {
    const { name, email, subject, message } = formData;
    await fetch(process.env.DISCORD_CONTACT_WEBHOOK as string, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        embeds: [
          {
            title: "Contact",
            fields: [
              { name: "Name", value: name },
              { name: "Email", value: email },
              { name: "Subject", value: subject },
              { name: "Message", value: message },
            ],
          },
        ],
      }),
    });
    return true;
  } catch {
    throw new Error("Failed to send message from contact form");
  }
};
