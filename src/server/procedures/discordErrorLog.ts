import { publicProcedure } from "@/server/trpc";
import { errorSchema } from "@/schemas";

export const discordErrorLog =
  publicProcedure
    .input(errorSchema)
    .mutation(async ({ input }) => {
      try {
        const { timestamp, error } = input
        await fetch(process.env.DISCORD_ERROR_LOG_WEBHOOK as string, {
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