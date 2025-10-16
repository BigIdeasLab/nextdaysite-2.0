'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { fetchOnboardingSteps } from '@/lib/api/data-service'
import type { OnboardingStepsRow } from '@/types/models'

// Define the structure for a message in the chat
export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  suggestions?: { label: string; next_step_name?: string; action?: string }[]
}

// Define the structure for the details we are collecting
export interface ProjectDetails {
  projectType?: string
  pageCount?: string
  branding?: string
  action?: string
}

export function useSimulatedOnboardingChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [projectDetails, setProjectDetails] = useState<Partial<ProjectDetails>>(
    {},
  )
  const [isLoading, setIsLoading] = useState(true)
  const [conversationFlow, setConversationFlow] = useState<
    OnboardingStepsRow[]
  >([])
  const [currentStepName, setCurrentStepName] = useState('start')
  const router = useRouter()

  // Fetch the entire conversation flow from the database on mount
  useEffect(() => {
    const loadConversation = async () => {
      try {
        const steps = await fetchOnboardingSteps()
        if (steps && steps.length > 0) {
          setConversationFlow(steps)
          // Find the starting step and display its message
          const startStep = steps.find((s) => s.step_name === 'start')
          if (startStep) {
            setMessages([
              {
                role: 'assistant',
                content: startStep.message,
                suggestions: startStep.responses as ChatMessage['suggestions'],
              },
            ])
          }
        }
      } catch (error) {
        console.error('Failed to load conversation flow:', error)
        setMessages([
          {
            role: 'assistant',
            content:
              "Sorry, I'm having trouble starting the chat right now. Please try again later.",
          },
        ])
      } finally {
        setIsLoading(false)
      }
    }

    loadConversation()
  }, [])

  const handleUserResponse = useCallback(
    (responseText: string, nextStepName?: string, action?: string) => {
      if (!nextStepName && !action) return

      // 1. Add user's message to chat
      const userMessage: ChatMessage = { role: 'user', content: responseText }
      setMessages((prev) => [...prev, userMessage])
      setIsLoading(true)

      // 2. Store the user's answer
      const currentStep = conversationFlow.find(
        (s) => s.step_name === currentStepName,
      )
      if (
        currentStep &&
        currentStep.question_key &&
        currentStep.question_key !== 'action'
      ) {
        setProjectDetails((prev) => ({
          ...prev,
          [currentStep.question_key as keyof ProjectDetails]: responseText,
        }))
      }

      // If there's an action, handle it (e.g., redirect)
      if (action) {
        localStorage.setItem(
          'onboardingProjectDetails',
          JSON.stringify(projectDetails),
        )
        if (action === 'signup') {
          router.push('/signup')
        } else if (action === 'login') {
          router.push('/login')
        }
        setIsLoading(false)
        return
      }

      // 3. Find and display the next step
      setTimeout(() => {
        const nextStep = conversationFlow.find(
          (s) => s.step_name === nextStepName,
        )
        if (nextStep) {
          setCurrentStepName(nextStep.step_name)
          const assistantMessage: ChatMessage = {
            role: 'assistant',
            content: nextStep.message,
            suggestions: nextStep.responses as ChatMessage['suggestions'],
          }
          setMessages((prev) => [...prev, assistantMessage])
        }
        setIsLoading(false)
      }, 500) // Simulate "thinking"
    },
    [conversationFlow, currentStepName, projectDetails, router],
  )

  return {
    messages,
    handleUserResponse,
    isLoading,
    projectDetails,
  }
}
