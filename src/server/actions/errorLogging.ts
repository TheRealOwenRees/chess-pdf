"use server"

export const logError = async (error: string) => {
  const date = new Date()
  const timestamp = date.toISOString()
  const formattedTimestamp = date.toString()
  // send error to Discord
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
            { name: 'Timestamp', value: `${timestamp}\n${formattedTimestamp}` },
            { name: 'Error', value: error }
          ]
        }
      ]
    })
  })
  return true
}
