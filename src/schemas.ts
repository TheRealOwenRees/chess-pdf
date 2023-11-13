import { z } from 'zod'

const diagramObjectSchema = z.object({
  fen: z.string(),
  ply: z.number()
})

export const contactSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  subject: z.string(),
  message: z.string()
})

export const errorSchema = z.object({
  timestamp: z.string(),
  error: z.string(),
})

export const gameDetailsSchema = z.object({
  pgn: z.string(),
  diagrams: z.array(diagramObjectSchema)
})
