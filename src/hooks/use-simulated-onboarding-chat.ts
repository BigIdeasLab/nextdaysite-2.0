'use client'

import { useState, useEffect } from 'react'
import { fetchOnboardingSteps, createProject } from '@/lib/api/data-service'
import type { OnboardingStepsRow } from '@/types/models'
import { useAuth } from '@/context/auth-context'

// Define the structure for a message in the chat
export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  showAuthButtons?: boolean
}

// Define the structure for the details we are collecting
export interface ProjectDetails {
  projectTitle?: string
  projectType?: string
  hosting?: string
  brandStyle?: string
  projectGoals?: string
  targetAudience?: string
  industry?: string
  pageCount?: string
  budget?: number
  userIntent?: 'ready' | 'need_help'
  confirmation?: boolean
  aiInferredPlan?: string
  aiInferredPaymentType?: string
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
  const [currentStepId, setCurrentStepId] = useState<string | null>(null)
  const [isConversationComplete, setIsConversationComplete] = useState(false)
  const [showAuthButtons, setShowAuthButtons] = useState(false)
  const [authActions, setAuthActions] = useState<string[]>([])
  const [currentStep, setCurrentStep] = useState<OnboardingStepsRow | null>(
    null,
  )
  const [hasChatStarted, setHasChatStarted] = useState(false)
  const { user } = useAuth()

  const suggestions: Record<string, string[]> = {
    ask_project_name: [
      'My Awesome Project',
      'Super Cool Website',
      'Project X',
      'New Venture',
    ],
    ask_project_type: ['New Website', 'Brand Identity', 'Complete Package'],
    ask_hosting: ['Yes', 'No'],
    ask_brand_style: ['Modern', 'Minimalist', 'Playful', 'Elegant'],
    ask_project_goals: [
      'Increase sales',
      'Generate leads',
      'Improve brand awareness',
      'Educate users',
    ],
    ask_target_audience: [
      'General consumers',
      'Businesses (B2B)',
      'A specific niche community',
      'Local customers',
    ],
    ask_industry: [
      'E-commerce',
      'Technology',
      'Healthcare',
      'Real Estate',
      'Food & Beverage',
    ],
    ask_page_count: ['1-5', '5-10', '10-20', '20+'],
    ask_budget: ['$1000-$5000', '$5000-$10000', '$10000+'],
    ask_ready: ['Proceed', 'I need some guidance'],
    review_summary: ['Yes, looks good!', 'No, I need to change something'],
  }

  useEffect(() => {
    const loadConversation = async () => {
      setIsLoading(true)
      try {
        const steps = await fetchOnboardingSteps()
        if (steps && steps.length > 0) {
          setConversationFlow(steps)
        }
      } catch (error) {
        console.error('Failed to load conversation flow:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadConversation()
  }, [])

  const startChat = (initialResponse: string) => {
    if (hasChatStarted || conversationFlow.length === 0) return

    setHasChatStarted(true)
    setIsLoading(true)

    const userMessage: ChatMessage = { role: 'user', content: initialResponse }

    const updatedDetails: Partial<ProjectDetails> = {
      projectType: initialResponse,
    }
    setProjectDetails(updatedDetails)

    const askTypeStep = conversationFlow.find((s) => s.step_id === 'ask_type')
    const nextStepId = askTypeStep?.next_step_id
    const nextStep = conversationFlow.find((s) => s.step_id === nextStepId)

    if (nextStep) {
      setCurrentStepId(nextStep.step_id)
      setCurrentStep(nextStep)
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: nextStep.message,
      }
      setMessages([userMessage, assistantMessage])
    } else {
      setMessages([
        userMessage,
        { role: 'assistant', content: 'Sorry, an error occurred.' },
      ])
    }
    setIsLoading(false)
  }

  const handleUserResponse = async (responseText: string) => {
    if (!hasChatStarted) {
      startChat(responseText)
      return
    }

    if (!currentStepId) return

    const userMessage: ChatMessage = { role: 'user', content: responseText }
    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    const step = conversationFlow.find((s) => s.step_id === currentStepId)
    let updatedProjectDetails = { ...projectDetails }

    if (step && step.stored_key) {
      const key = step.stored_key as keyof ProjectDetails
      const value =
        key === 'budget'
          ? parseInt(responseText.replace(/[^0-9-]/g, '').split('-')[0])
          : responseText
      updatedProjectDetails = { ...updatedProjectDetails, [key]: value }
      setProjectDetails(updatedProjectDetails)
    }

    let nextStepId = step?.next_step_id
    if (step?.step_id === 'ask_ready') {
      if (responseText.toLowerCase().includes('guidance')) {
        nextStepId = 'if_need_help'
      }
    } else if (step?.step_id === 'review_summary') {
      if (responseText.toLowerCase().startsWith('no')) {
        nextStepId = 'restart_flow'
      }
    }

    setTimeout(async () => {
      const nextStep = conversationFlow.find((s) => s.step_id === nextStepId)

      if (nextStep?.is_last_step) {
        const finalDetails = {
          ...updatedProjectDetails,
          confirmation: true,
          userIntent: responseText.toLowerCase().includes('proceed')
            ? 'ready'
            : 'need_help',
        }
        localStorage.setItem(
          'onboardingProjectDetails',
          JSON.stringify(finalDetails),
        )

        if (user) {
          await createProject(finalDetails as ProjectDetails)
          const finishMessage: ChatMessage = {
            role: 'assistant',
            content:
              'Excellent! We have saved your project. You can now proceed to your dashboard.',
          }
          setMessages((prev) => [...prev, finishMessage])
          setAuthActions(['Proceed to Dashboard'])
        } else {
          const finishMessage: ChatMessage = {
            role: 'assistant',
            content:
              'Excellent! To save your project and move to the next step, please sign up or log in.',
          }
          setMessages((prev) => [...prev, finishMessage])
          setAuthActions(['Sign Up to Save', 'Log In'])
        }
        setIsConversationComplete(true)
        setShowAuthButtons(true)
        setIsLoading(false)
        setCurrentStepId(null)
        setCurrentStep(null)
        return
      }

      if (nextStep) {
        setCurrentStepId(nextStep.step_id)
        setCurrentStep(nextStep)

        let assistantMessage = nextStep.message

        if (nextStep.step_id === 'review_summary') {
          assistantMessage = `Thanks! Here’s a summary of your project details. Does everything look correct?\n\n- **Project Name:** ${updatedProjectDetails.projectTitle || 'N/A'}\n- **Project Type:** ${updatedProjectDetails.projectType || 'N/A'}\n- **Needs Hosting:** ${updatedProjectDetails.hosting || 'N/A'}\n- **Branding Style:** ${updatedProjectDetails.brandStyle || 'N/A'}\n- **Main Goals:** ${updatedProjectDetails.projectGoals || 'N/A'}\n- **Target Audience:** ${updatedProjectDetails.targetAudience || 'N/A'}\n- **Industry:** ${updatedProjectDetails.industry || 'N/A'}\n- **Estimated Pages:** ${updatedProjectDetails.pageCount || 'N/A'}\n- **Budget:** ${updatedProjectDetails.budget?.toLocaleString() || 'N/A'}`
        }

        if (nextStep.step_id === 'restart_flow') {
          const startStep = conversationFlow.find((s) => s.is_first_step)
          if (startStep) {
            setCurrentStepId(startStep.step_id)
            setCurrentStep(startStep)
            setProjectDetails({})
            setMessages((prev) => [
              ...prev,
              {
                role: 'assistant',
                content:
                  "No problem, let's start over. What should we call your project?",
              },
            ])
          }
        } else {
          setMessages((prev) => [
            ...prev,
            { role: 'assistant', content: assistantMessage },
          ])
        }
      }
      setIsLoading(false)
    }, 500)
  }

  return {
    messages,
    handleUserResponse,
    isLoading,
    projectDetails,
    isConversationComplete,
    showAuthButtons,
    authActions,
    suggestions: isConversationComplete
      ? authActions
      : suggestions[currentStep?.step_id || ''] || [],
    hasChatStarted,
    startChat,
  }
}
