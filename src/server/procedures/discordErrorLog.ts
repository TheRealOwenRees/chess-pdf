import { publicProcedure } from "@/server/trpc";
import { errorSchema } from "@/schemas";

export const discordErrorLog =
  publicProcedure
    .input(errorSchema)
    .mutation(async ({ input }) => {
      try {
        const { timestamp, error } = input
        // TODO create new channels and webhook for error logging
        await fetch(process.env.DISCORD_CONTACT_WEBHOOK as string, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            embeds: [
              {
                title: 'Error',
                fields: [
                  { name: 'Timestamp', value: timestamp },
                  { name: 'Error', value: error }
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