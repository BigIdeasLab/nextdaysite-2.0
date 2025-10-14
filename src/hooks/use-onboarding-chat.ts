'use client'

import { useState } from 'react'
import {
  conversationFlow,
  Question,
} from '@/components/chatbot/conversation-flow'

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

  const askNextQuestion = () => {
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
        setCurrentPhaseIndex(currentPhaseIndex + 1)
        setCurrentQuestionIndex(0)
      } else {
        // End of conversation
        addMessage("Thanks for all the info! I'll be in touch shortly.", 'ai')
      }
    }
  }

  const handleAnswer = (key: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [key]: answer }))
    addMessage(answer, 'user')
    setCurrentQuestionIndex(currentQuestionIndex + 1)
  }

  const startChat = () => {
    setMessages([])
    setCurrentPhaseIndex(0)
    setCurrentQuestionIndex(0)
    setAnswers({})
    askNextQuestion()
  }

  return { messages, startChat, askNextQuestion, handleAnswer, answers }
}
