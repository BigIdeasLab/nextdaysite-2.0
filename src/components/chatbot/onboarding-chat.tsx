'use client'

import { useEffect, useRef, useState } from 'react'
import { useOnboardingChat } from '@/hooks/use-onboarding-chat'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export function OnboardingChat() {
  const { messages, getAIResponse, isLoading } = useOnboardingChat()
  const messagesEndRef = useRef<null | HTMLDivElement>(null)
  const [isExpanded, setIsExpanded] = useState(false)

  const quickActions = [
    'Brand identity design',
    'Mobile app prototype',
    'Social media ad campaign',
    'UI/UX audit report',
    'Responsive website redesign',
    'Digital marketing strategy',
  ]

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleQuickAction = (action: string) => {
    getAIResponse(action)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const input = e.currentTarget.elements.namedItem(
      'message',
    ) as HTMLInputElement
    if (input.value) {
      getAIResponse(input.value)
      input.value = ''
    }
  }

  return (
    <div
      className={`flex flex-col bg-gradient-to-b from-[#FF8C00] to-black ${
        isExpanded ? 'fixed inset-0 z-50 h-screen w-screen' : 'h-full w-full'
      }`}
    >
      {/* Header */}
      <div className='flex items-center justify-between rounded-t-[30px] px-5 py-2 '>
        <h2 className='text-[20px] font-medium leading-[31.471px] text-[#F7F6FF]'>
          Your AI Assitant
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
      <div className='flex flex-1 flex-col overflow-hidden rounded-[30px] bg-[#131313] p-5'>
        {messages.length === 0 ? (
          <div className='flex flex-1 flex-col items-center justify-between gap-8 pb-5 pt-[44px] md:gap-[45px]'>
            {/* Logo and Title Section */}
            <div className='flex flex-col items-center gap-[45px]'>
              <div className='flex flex-col items-center gap-[25px]'>
                <div className='relative h-[70px] w-[70px]'>
                  <svg
                    width='70'
                    height='70'
                    viewBox='0 0 71 70'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <circle cx='35.5' cy='35' r='35' fill='#542E00' />
                  </svg>
                  <Image
                    src='https://api.builder.io/api/v1/image/assets/TEMP/8f39a94b5fc8da66ac9e4e5bdd03170775497b62?width=92'
                    alt='NextDaySite Logo'
                    width={46}
                    height={48}
                    className='absolute left-[15px] top-[11px] h-12 w-[46px]'
                  />
                </div>
                <div className='flex flex-col items-center gap-2.5'>
                  <h3 className='text-center text-[32px] font-medium leading-[31.471px] text-[#F7F6FF]'>
                    Your AI Assitant
                  </h3>
                  <p className='text-center text-[22px] font-normal leading-6 text-[#9BA1A6]'>
                    Describe your site and I&apos;ll help bring it to life.
                  </p>
                </div>
              </div>

              {/* Quick Action Buttons */}
              <div className='flex w-full flex-col items-center gap-2'>
                <div className='flex flex-wrap items-center justify-center gap-2'>
                  {quickActions.slice(0, 3).map((action) => (
                    <button
                      key={action}
                      onClick={() => handleQuickAction(action)}
                      className='flex items-center justify-center gap-2.5 rounded-[30px] bg-[#202020] px-[15px] py-[16px] transition-colors hover:bg-[#2A2A2A]'
                    >
                      <span className='text-[21px] font-normal leading-5 text-[#F7F6FF]'>
                        {action}
                      </span>
                    </button>
                  ))}
                </div>
                <div className='flex flex-wrap items-center justify-center gap-2'>
                  {quickActions.slice(3, 6).map((action) => (
                    <button
                      key={action}
                      onClick={() => handleQuickAction(action)}
                      className='flex items-center justify-center gap-2.5 rounded-[30px] bg-[#202020] px-[15px] py-[16px] transition-colors hover:bg-[#2A2A2A]'
                    >
                      <span className='text-[21px] font-normal leading-5 text-[#F7F6FF]'>
                        {action}
                      </span>
                    </button>
                  ))}
                </div>
                <div className='flex flex-wrap items-center justify-center gap-2'>
                  {quickActions.slice(6).map((action) => (
                    <button
                      key={action}
                      onClick={() => handleQuickAction(action)}
                      className='flex items-center justify-center gap-2.5 rounded-[30px] bg-[#202020] px-[15px] py-[16px] transition-colors hover:bg-[#2A2A2A]'
                    >
                      <span className='text-[21px] font-normal leading-5 text-[#F7F6FF]'>
                        {action}
                      </span>
                    </button>
                  ))}
                </div>{' '}
              </div>
            </div>
          </div>
        ) : (
          <div className='flex flex-1 flex-col gap-4 overflow-y-auto p-4'>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 text-[18px] ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] rounded-[20px] px-6 py-4 ${message.role === 'user' ? 'bg-[#472700] text-white' : 'bg-[#202020] text-white'}`}
                >
                  {message.role === 'assistant' ? (
                    <div className='markdown'>
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    message.content
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className='flex justify-start'>
                <div className='max-w-[80%] rounded-[20px] px-6 py-4 bg-[#2D2D2D] text-white'>
                  Typing...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Input Area */}
        <div className='w-full rounded-[30px] bg-[#202020] p-5'>
          <form onSubmit={handleSubmit} className='flex flex-col gap-[48px]'>
            <input
              type='text'
              name='message'
              placeholder='Ask Anything'
              className='w-full bg-transparent text-[22px] font-normal leading-5 text-white/70 outline-none placeholder:text-white/70'
              disabled={isLoading}
            />
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-5'>
                <button
                  type='button'
                  className='transition-opacity hover:opacity-80'
                >
                  <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M10.5 20C10.5 20.3978 10.658 20.7794 10.9393 21.0607C11.2206 21.342 11.6022 21.5 12 21.5C12.3978 21.5 12.7794 21.342 13.0607 21.0607C13.342 20.7794 13.5 20.3978 13.5 20V13.5H20C20.3978 13.5 20.7794 13.342 21.0607 13.0607C21.342 12.7794 21.5 12.3978 21.5 12C21.5 11.6022 21.342 11.2206 21.0607 10.9393C20.7794 10.658 20.3978 10.5 20 10.5H13.5V4C13.5 3.60218 13.342 3.22064 13.0607 2.93934C12.7794 2.65804 12.3978 2.5 12 2.5C11.6022 2.5 11.2206 2.65804 10.9393 2.93934C10.658 3.22064 10.5 3.60218 10.5 4V10.5H4C3.60218 10.5 3.22064 10.658 2.93934 10.9393C2.65804 11.2206 2.5 11.6022 2.5 12C2.5 12.3978 2.65804 12.7794 2.93934 13.0607C3.22064 13.342 3.60218 13.5 4 13.5H10.5V20Z'
                      fill='#F7F6FF'
                    />
                  </svg>
                </button>
                <button
                  type='button'
                  className='transition-opacity hover:opacity-80'
                >
                  <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M3 12H4M12 3V4M20 12H21M5.6 5.6L6.3 6.3M18.4 5.6L17.7 6.3M9.7 17H14.3M9 16C8.16047 15.3704 7.54033 14.4925 7.22743 13.4908C6.91453 12.4892 6.92473 11.4144 7.25658 10.4189C7.58844 9.4233 8.22512 8.55739 9.07645 7.94379C9.92778 7.33019 10.9506 7 12 7C13.0494 7 14.0722 7.33019 14.9236 7.94379C15.7749 8.55739 16.4116 9.4233 16.7434 10.4189C17.0753 11.4144 17.0855 12.4892 16.7726 13.4908C16.4597 14.4925 15.8395 15.3704 15 16C14.6096 16.3865 14.3156 16.8594 14.1419 17.3806C13.9681 17.9018 13.9195 18.4566 14 19C14 19.5304 13.7893 20.0391 13.4142 20.4142C13.0391 20.7893 12.5304 21 12 21C11.4696 21 10.9609 20.7893 10.5858 20.4142C10.2107 20.0391 10 19.5304 10 19C10.0805 18.4566 10.0319 17.9018 9.85813 17.3806C9.6844 16.8594 9.39043 16.3865 9 16Z'
                      stroke='#F7F6FF'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </button>
                <button
                  type='button'
                  className='transition-opacity hover:opacity-80'
                >
                  <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M12 15C12.81 15 13.5 14.7 14.11 14.11C14.7 13.5 15 12.81 15 12C15 11.19 14.7 10.5 14.11 9.89C13.5 9.3 12.81 9 12 9C11.19 9 10.5 9.3 9.89 9.89C9.3 10.5 9 11.19 9 12C9 12.81 9.3 13.5 9.89 14.11C10.5 14.7 11.19 15 12 15ZM12 2C14.75 2 17.1 3 19.05 4.95C21 6.9 22 9.25 22 12V13.45C22 14.45 21.65 15.3 21 16C20.3 16.67 19.5 17 18.5 17C17.3 17 16.31 16.5 15.56 15.5C14.56 16.5 13.38 17 12 17C10.63 17 9.45 16.5 8.46 15.54C7.5 14.55 7 13.38 7 12C7 10.63 7.5 9.45 8.46 8.46C9.45 7.5 10.63 7 12 7C13.38 7 14.55 7.5 15.54 8.46C16.5 9.45 17 10.63 17 12V13.45C17 13.86 17.16 14.22 17.46 14.53C17.76 14.84 18.11 15 18.5 15C18.92 15 19.27 14.84 19.57 14.53C19.87 14.22 20 13.86 20 13.45V12C20 9.81 19.23 7.93 17.65 6.35C16.07 4.77 14.19 4 12 4C9.81 4 7.93 4.77 6.35 6.35C4.77 7.93 4 9.81 4 12C4 14.19 4.77 16.07 6.35 17.65C7.93 19.23 9.81 20 12 20H17V22H12C9.25 22 6.9 21 4.95 19.05C3 17.1 2 14.75 2 12C2 9.25 3 6.9 4.95 4.95C6.9 3 9.25 2 12 2Z'
                      fill='#F7F6FF'
                    />
                  </svg>
                </button>
                <button
                  type='button'
                  className='transition-opacity hover:opacity-80'
                >
                  <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M20.5065 12.3131L12.7285 20.0911C11.6001 21.2012 10.0789 21.8204 8.49608 21.814C6.91326 21.8076 5.3971 21.1759 4.27787 20.0567C3.15863 18.9375 2.527 17.4213 2.52056 15.8385C2.51411 14.2557 3.13338 12.7344 4.24346 11.6061L12.0215 3.8281C12.3929 3.45665 12.8339 3.16201 13.3192 2.96098C13.8045 2.75996 14.3247 2.65649 14.85 2.65649C15.3753 2.65649 15.8954 2.75996 16.3807 2.96098C16.866 3.16201 17.307 3.45665 17.6785 3.8281C18.0499 4.19954 18.3445 4.64051 18.5456 5.12582C18.7466 5.61114 18.8501 6.1313 18.8501 6.6566C18.8501 7.1819 18.7466 7.70206 18.5456 8.18737C18.3445 8.67269 18.0499 9.11365 17.6785 9.4851L9.90046 17.2631C9.52531 17.6382 9.0165 17.849 8.48596 17.849C7.95542 17.849 7.44661 17.6382 7.07146 17.2631C6.69631 16.8879 6.48555 16.3791 6.48555 15.8486C6.48555 15.3181 6.69631 14.8092 7.07146 14.4341L14.1425 7.3641'
                      stroke='#F7F6FF'
                      strokeWidth='2'
                      strokeLinecap='square'
                    />
                  </svg>
                </button>
              </div>
              <button
                type='submit'
                className='flex h-[46px] w-[46px] flex-shrink-0 items-center justify-center rounded-full bg-[#FF8C00] transition-opacity hover:opacity-90'
                disabled={isLoading}
              >
                <svg
                  width='30'
                  height='30'
                  viewBox='0 0 30 30'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M16.2496 24.9999H13.7496V9.99995L6.87461 16.875L5.09961 15.1L14.9996 5.19995L24.8996 15.1L23.1246 16.875L16.2496 9.99995V24.9999Z'
                    fill='#F7F6FF'
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
