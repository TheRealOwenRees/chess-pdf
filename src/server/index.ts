import { router } from './trpc'

import { discordContact } from './procedures/discordContact'
import { discordErrorLog } from "./procedures/discordErrorLog";

export const appRouter = router({
  discordContact,
  discordErrorLog
})

export type AppRouter = typeof appRouter
