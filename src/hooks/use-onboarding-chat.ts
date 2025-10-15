'use client'

import { useCallback, useState } from 'react'
import { useAuth } from '@/context/auth-context'

export interface Message {
  role: 'user' | 'assistant'
  content: string
}

export function useOnboardingChat() {
  const { client } = useAuth()
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const addMessage = (role: 'user' | 'assistant', content: string) => {
    setMessages((prev) => [...prev, { role, content }])
  }

  const getAIResponse = useCallback(
    async (userMessage: string) => {
      addMessage('user', userMessage)
      setIsLoading(true)

      if (!client) {
        addMessage(
          'assistant',
          'Auth client is not available. Please try again later.',
        )
        setIsLoading(false)
        return
      }

      const newMessages: Message[] = [
        ...messages,
        { role: 'user', content: userMessage },
      ]

      try {
        const { data, error } = await client.functions.invoke('deepseek-chat', {
          body: { messages: newMessages },
        })

        if (error) {
          throw new Error(`Function invocation error: ${error.message}`)
        }

        if (data.choices && data.choices.length > 0) {
          const aiMessage = data.choices[0].message.content
          addMessage('assistant', aiMessage)
        } else {
          addMessage('assistant', 'Sorry, I could not generate a response.')
        }
      } catch (e: unknown) {
        const error = e as Error
        addMessage('assistant', `Sorry, something went wrong: ${error.message}`)
      } finally {
        setIsLoading(false)
      }
    },
    [client, messages],
  )

  const startChat = useCallback(() => {
    setMessages([
      {
        role: 'assistant',
        content:
          "Hi! I'm here to help you plan your new website. To start, what type of site are you thinking about building?",
      },
    ])
  }, [])

  return { messages, startChat, getAIResponse, isLoading }
}
