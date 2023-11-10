import { publicProcedure } from '../trpc'
import { contactSchema } from "@/schemas"

export const discordContact =
  publicProcedure
    .input(contactSchema)
    .mutation(async ({ input }) => {
      try {
        const { name, email, subject, message } = input
        await fetch(process.env.DISCORD_CONTACT_WEBHOOK as string, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            embeds: [
              {
                title: 'Contact',
                fields: [
                  { name: 'Name', value: name },
                  { name: 'Email', value: email },
                  { name: 'Subject', value: subject },
                  { name: 'Message', value: message }
                ]
              }
            ]
          })
        })
        return true
      } catch {
        return false
      }
})
