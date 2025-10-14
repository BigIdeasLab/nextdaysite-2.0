'use client'

import { useCallback, useState } from 'react'
import { conversationFlow } from '@/components/chatbot/conversation-flow'

export interface Message {
  text: string
  sender: 'ai' | 'user'
  options?: string[]
  onOptionClick?: (option: string) => void
}

export function useOnboardingChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const addMessage = (text: string, sender: 'ai' | 'user') => {
    setMessages((prev) => [...prev, { text, sender }])
  }

  const handleAnswer = useCallback((key: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [key]: answer }))
    addMessage(answer, 'user')
    setCurrentQuestionIndex((prev) => prev + 1)
  }, [])

  const askNextQuestion = useCallback(() => {
    const currentPhase = conversationFlow[currentPhaseIndex]
    if (!currentPhase) return

    const nextQuestion = currentPhase.questions[currentQuestionIndex]
    if (nextQuestion) {
      const message: Message = {
        text: nextQuestion.text,
        sender: 'ai',
        options: nextQuestion.options,
        onOptionClick: (option: string) =>
          handleAnswer(nextQuestion.key, option),
      }
      setMessages((prev) => [...prev, message])
    } else {
      if (currentPhaseIndex < conversationFlow.length - 1) {
        setCurrentPhaseIndex((prev) => prev + 1)
        setCurrentQuestionIndex(0)
      } else {
        addMessage(
          'Thanks for all the info! I&apos;ll be in touch shortly.',
          'ai',
        )
      }
    }
  }, [currentPhaseIndex, currentQuestionIndex, handleAnswer])

  const startChat = useCallback(() => {
    setMessages([])
    setCurrentPhaseIndex(0)
    setCurrentQuestionIndex(0)
    setAnswers({})
    askNextQuestion()
  }, [askNextQuestion])

  return { messages, startChat, askNextQuestion, handleAnswer, answers }
}
