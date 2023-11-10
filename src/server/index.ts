import { router } from './trpc'

import { discordContact } from './procedures/discordContact'

export const appRouter = router({
  discordContact,
})

export type AppRouter = typeof appRouter
