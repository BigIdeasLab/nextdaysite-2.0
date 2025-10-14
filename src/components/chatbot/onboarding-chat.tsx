'use client'

import { useEffect, useRef } from 'react'
import { useOnboardingChat } from '@/hooks/use-onboarding-chat'

export function OnboardingChat() {
  const { messages, startChat, askNextQuestion, handleAnswer } =
    useOnboardingChat()
  const messagesEndRef = useRef<null | HTMLDivElement>(null)

  useEffect(() => {
    startChat()
  }, [])

  useEffect(() => {
    if (
      messages.length > 0 &&
      messages[messages.length - 1].sender === 'user'
    ) {
      askNextQuestion()
    }
  }, [messages])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const onOptionClick = (option: string) => {
    const lastMessage = messages[messages.length - 1]
    if (lastMessage && lastMessage.onOptionClick) {
      lastMessage.onOptionClick(option)
    }
  }

  return (
    <div className='flex flex-col h-full w-full bg-[#1A1A1A]'>
      <div className='flex-1 p-6 overflow-y-auto'>
        <div className='flex flex-col gap-4'>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${message.sender === 'ai' ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`rounded-2xl px-4 py-2 max-w-[80%] ${message.sender === 'user' ? 'bg-[#FF8C00] text-white' : 'bg-[#2D2D2D] text-white'}`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>
        <div ref={messagesEndRef} />
      </div>
      <div className='p-6 border-t border-white/10'>
        {messages[messages.length - 1]?.options ? (
          <div className='flex flex-wrap gap-2 mb-4'>
            {messages[messages.length - 1].options?.map((option) => (
              <button
                key={option}
                onClick={() => onOptionClick(option)}
                className='rounded-full bg-[#2D2D2D] px-3 py-1 text-sm text-white/80 hover:bg-white/20 transition'
              >
                {option}
              </button>
            ))}
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              const input = e.currentTarget.elements.namedItem(
                'message',
              ) as HTMLInputElement
              if (input.value) {
                handleAnswer('text_input', input.value)
                input.value = ''
              }
            }}
            className='flex gap-2'
          >
            <input
              type='text'
              name='message'
              placeholder='Tell us about your project...'
              className='flex-grow rounded-full bg-[#2D2D2D] px-4 py-2 text-white/80 outline-none focus:ring-2 focus:ring-[#FF8C00]'
            />
            <button
              type='submit'
              className='rounded-full bg-[#FF8C00] px-6 py-2 text-white font-semibold hover:bg-opacity-90 transition'
            >
              Send
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
