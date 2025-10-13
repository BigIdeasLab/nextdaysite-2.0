'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const messages = [
  {
    role: 'ai',
    content:
      "Hi there! I'm here to help you get started. What kind of website are you looking for?",
  },
]

const suggestions = [
  'E-commerce store',
  'Portfolio website',
  'SaaS landing page',
  'Restaurant website',
]

export function RedesignedHero() {
  const [chatMessages, setChatMessages] = useState(messages)
  const [userInput, setUserInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [chatMessages])

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return

    setChatMessages((prev) => [...prev, { role: 'user', content: message }])
    setUserInput('')
    setIsTyping(true)

    setTimeout(() => {
      setIsTyping(false)
      setChatMessages((prev) => [
        ...prev,
        {
          role: 'ai',
          content: `That's a great idea! We can definitely build a ${message.toLowerCase()} for you. To get started, you can check out our pricing plans below.`,
        },
      ])
    }, 2000)
  }

  return (
    <section className='relative flex min-h-[500px] w-full flex-col items-center gap-9 px-3 py-16 md:min-h-[600px] md:gap-[50px] md:px-12 lg:px-52'>
      <div className='flex w-full max-w-[684px] flex-col items-center gap-[30px] md:gap-[50px]'>
        <div className='flex w-full flex-col items-center gap-5'>
          <Image
            src='https://api.builder.io/api/v1/image/assets/TEMP/917c003a5d68e225a7b88d8842418e3bf0ce2705?width=1368'
            alt='Own a Stunning Website Without Lifting a Finger'
            width={684}
            height={200}
            className='h-auto w-full'
          />
        </div>

        <div className='flex flex-wrap items-center justify-center gap-[10px]'>
          <Link
            href='/checkout'
            className='flex h-[48px] items-center justify-center rounded-[30px] border border-[#3E3E3E] bg-[#FF8C00] px-5 text-[16px] font-medium text-white transition-transform hover:scale-105 md:h-[54px] md:px-5 md:text-[18px]'
          >
            Get Started
          </Link>
          <Link
            href='#pricing'
            className='flex h-[48px] items-center justify-center rounded-[30px] border border-[#3E3E3E] bg-[#090808] px-[22px] text-[16px] font-medium text-white transition-transform hover:scale-105 md:h-[54px] md:px-[26px] md:text-[18px]'
          >
            See Pricing
          </Link>
        </div>
      </div>

      <div className='h-[500px] w-full max-w-5xl overflow-hidden rounded-[30px] bg-[#1A1A1A] md:h-[500px] flex flex-col'>
        <div ref={chatContainerRef} className='flex-grow p-6 overflow-y-auto'>
          <div className='flex flex-col gap-4'>
            {chatMessages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`rounded-2xl px-4 py-2 max-w-[80%] ${message.role === 'user' ? 'bg-[#FF8C00] text-white' : 'bg-[#2D2D2D] text-white'}`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className='flex justify-start gap-3'>
                <div className='rounded-2xl px-4 py-2 bg-[#2D2D2D] text-white'>
                  <div className='flex items-center gap-1'>
                    <span className='h-2 w-2 rounded-full bg-white/50 animate-pulse'></span>
                    <span className='h-2 w-2 rounded-full bg-white/50 animate-pulse delay-150'></span>
                    <span className='h-2 w-2 rounded-full bg-white/50 animate-pulse delay-300'></span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='p-6 border-t border-white/10'>
          <div className='flex gap-2 mb-4'>
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => handleSendMessage(suggestion)}
                className='rounded-full bg-[#2D2D2D] px-3 py-1 text-sm text-white/80 hover:bg-white/20 transition'
              >
                {suggestion}
              </button>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSendMessage(userInput)
            }}
            className='flex gap-2'
          >
            <input
              type='text'
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
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
        </div>
      </div>
    </section>
  )
}
