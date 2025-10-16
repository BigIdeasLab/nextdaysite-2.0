'use client'

import { useEffect, useRef, useState } from 'react'
import { useSimulatedOnboardingChat } from '@/hooks/use-simulated-onboarding-chat'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export function OnboardingChat() {
  const { messages, handleUserResponse, isLoading } =
    useSimulatedOnboardingChat()
  const messagesEndRef = useRef<null | HTMLDivElement>(null)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const lastMessage = messages[messages.length - 1]
  const suggestions =
    lastMessage?.role === 'assistant' ? lastMessage.suggestions : []

  return (
    <div
      className={`flex flex-col bg-gradient-to-b from-[#FF8C00] to-black ${
        isExpanded ? 'fixed inset-0 z-50 h-screen w-screen' : 'h-full w-full'
      }`}
    >
      {/* Header */}
      <div className='flex items-center justify-between rounded-t-[30px] px-5 py-2 '>
        <h2 className='text-[20px] font-medium leading-[31.471px] text-[#F7F6FF]'>
          Your AI Assistant
        </h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className='flex items-center gap-2.5 transition-opacity hover:opacity-90'
        >
          {isExpanded ? (
            <svg
              width='26'
              height='26'
              viewBox='0 0 26 26'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M4.33398 17.333H8.66732M8.66732 17.333V21.6663M8.66732 17.333L3.25098 22.7497M17.334 21.6663H21.6673M21.6673 21.6663V17.333M21.6673 21.6663L16.2507 16.2497M4.33398 8.66634H8.66732M8.66732 8.66634V4.33301M8.66732 8.66634L3.25098 3.24967M17.334 4.33301H21.6673M21.6673 4.33301V8.66634M21.6673 4.33301L16.2507 9.74967'
                stroke='#F7F6FF'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          ) : (
            <svg
              width='26'
              height='26'
              viewBox='0 0 26 26'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M8.66732 4.33301H4.33398M4.33398 4.33301V8.66634M4.33398 4.33301L9.75065 9.74967M17.334 4.33301H21.6673M21.6673 4.33301V8.66634M21.6673 4.33301L16.2507 9.74967M8.66732 21.6663H4.33398M4.33398 21.6663V17.333M4.33398 21.6663L9.75065 16.2497M17.334 21.6663H21.6673M21.6673 21.6663V17.333M21.6673 21.6663L16.2507 16.2497'
                stroke='#F7F6FF'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          )}
          <span className='text-[20px] font-medium leading-[31.471px] text-[#F7F6FF]'>
            {isExpanded ? 'Close Chat' : 'Expand Chat'}
          </span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className='flex flex-1 flex-col justify-between overflow-hidden rounded-[30px] bg-[#131313] p-5'>
        {/* Message History */}
        <div className='flex-1 space-y-4 overflow-y-auto p-4'>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 text-[18px] ${
                message.role === 'assistant' ? 'justify-start' : 'justify-end'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-[20px] px-6 py-4 ${
                  message.role === 'user'
                    ? 'bg-[#472700] text-white'
                    : 'bg-[#202020] text-white'
                }`}
              >
                <div className='markdown'>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {message.content}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className='flex justify-start'>
              <div className='max-w-[80%] rounded-[20px] bg-[#2D2D2D] px-6 py-4 text-white'>
                Typing...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Action Buttons */}
        {!isLoading && suggestions && suggestions.length > 0 && (
          <div className='flex w-full flex-col items-center gap-2 p-4'>
            <div className='flex flex-wrap items-center justify-center gap-2'>
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion.label}
                  onClick={() =>
                    handleUserResponse(
                      suggestion.label,
                      suggestion.next_step_name,
                      suggestion.action,
                    )
                  }
                  className='flex items-center justify-center gap-2.5 rounded-[30px] bg-[#202020] px-[15px] py-[16px] transition-colors hover:bg-[#2A2A2A]'
                >
                  <span className='text-[21px] font-normal leading-5 text-[#F7F6FF]'>
                    {suggestion.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
