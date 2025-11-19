'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '@/hooks/use-in-view'
import { fadeUpContainerVariant, staggerChildVariant } from '@/lib/animation-variants'
import { ThankYouMessage } from './thank-you-message'

export function ContactForm() {
  const { ref, isInView } = useInView<HTMLDivElement>({
    threshold: 0.2,
  })

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    service: '',
    description: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleCloseSuccess = () => {
    setSuccess(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to send message.')
      }

      setSuccess(true)
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        service: '',
        description: '',
      })
    } catch (err: any) {
      setError(err.message || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const contactInfo = [
    {
      icon: (
        <svg
          className='h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M12 4V7M18 7L16 9M6 7L8 9'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M15.9212 17.2443L15.931 17.3024C16.0456 17.9806 16.1029 18.3198 16.2809 18.5938C16.3339 18.6753 16.3943 18.7518 16.4613 18.8221C16.6866 19.0586 17.0029 19.1923 17.6356 19.4598C18.5863 19.8617 19.0616 20.0627 19.5176 19.9827C19.6515 19.9592 19.7818 19.9184 19.9053 19.8613C20.3256 19.6669 20.605 19.2259 21.1637 18.344C21.7465 17.4243 22.0378 16.9644 21.9961 16.4396C21.9867 16.3219 21.9561 16.1728 21.9184 16.061C21.7504 15.5621 21.3553 15.2914 20.5653 14.7498C15.2168 11.0834 8.78319 11.0834 3.43474 14.7498C2.64467 15.2914 2.24964 15.5621 2.08155 16.061C2.04388 16.1728 2.0133 16.3219 2.00394 16.4396C1.96217 16.9644 2.25354 17.4243 2.83628 18.344C3.39504 19.2259 3.67442 19.6669 4.09473 19.8613C4.21816 19.9184 4.34846 19.9592 4.48236 19.9827C4.93835 20.0627 5.41371 19.8617 6.36443 19.4598C6.99706 19.1923 7.31337 19.0586 7.5387 18.8221C7.60574 18.7518 7.66613 18.6753 7.7191 18.5938C7.89713 18.3198 7.95443 17.9806 8.06903 17.3024L8.07883 17.2443C8.19712 16.5442 8.25626 16.1941 8.51567 15.8731C8.55197 15.8282 8.61802 15.7569 8.66002 15.7173C8.96021 15.4342 9.22512 15.3686 9.75492 15.2375C11.1819 14.8842 12.8181 14.8842 14.2451 15.2375C14.7749 15.3686 15.0398 15.4342 15.34 15.7173C15.382 15.7569 15.448 15.8282 15.4843 15.8731C15.7437 16.1941 15.8029 16.5442 15.9212 17.2443Z'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='square'
            strokeLinejoin='round'
          />
        </svg>
      ),
      text: '+1-301-540-7777',
    },
    {
      icon: (
        <svg
          className='h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z'
            stroke='currentColor'
            strokeWidth='1.5'
          />
          <path
            d='M8 12C8 18 12 22 12 22C12 22 16 18 16 12C16 6 12 2 12 2C12 2 8 6 8 12Z'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinejoin='round'
          />
          <path
            d='M21 15H3'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M21 9H3'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      ),
      text: 'wow@nextdaysite.com',
    },
    {
      icon: (
        <svg
          className='h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M14.5 9C14.5 10.3807 13.3807 11.5 12 11.5C10.6193 11.5 9.5 10.3807 9.5 9C9.5 7.61929 10.6193 6.5 12 6.5C13.3807 6.5 14.5 7.61929 14.5 9Z'
            stroke='currentColor'
            strokeWidth='1.5'
          />
          <path
            d='M13.2574 17.4936C12.9201 17.8184 12.4693 18 12.0002 18C11.531 18 11.0802 17.8184 10.7429 17.4936C7.6543 14.5008 3.51519 11.1575 5.53371 6.30373C6.6251 3.67932 9.24494 2 12.0002 2C14.7554 2 17.3752 3.67933 18.4666 6.30373C20.4826 11.1514 16.3536 14.5111 13.2574 17.4936Z'
            stroke='currentColor'
            strokeWidth='1.5'
          />
          <path
            d='M18 20C18 21.1046 15.3137 22 12 22C8.68629 22 6 21.1046 6 20'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
          />
        </svg>
      ),
      text: '9711 Washingtonian Boulevard Suite 550, Gaithersburg MD 20878',
    },
  ]

  return (
    <section className='w-full px-6 pb-8 md:px-12 md:pb-[210px] lg:px-52'>
      <div className='mx-auto max-w-[1002px]'>
        <div className='flex flex-col gap-10 md:flex-row md:items-start md:gap-16 lg:gap-16'>
          {/* Contact Info */}
          <div className='flex w-full flex-col gap-8 md:gap-12 lg:w-1/2 lg:gap-[60px]'>
            <h2 className='text-xl font-medium text-[var(--foreground)] md:text-xl lg:text-2xl xl:text-[32px]'>
              We&apos;d Love to Hear From You
            </h2>
            <div className='flex flex-col gap-4 md:gap-6 lg:gap-[30px]'>
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className='flex items-center gap-3 md:gap-4 lg:gap-[15px]'
                >
                  {item.icon}
                  <div className='text-sm leading-5 text-[var(--foreground)] md:text-sm lg:text-base xl:text-lg'>
                    {item.text}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className='flex w-full flex-col gap-8 md:gap-10 lg:w-1/2 lg:gap-[50px]'>
            <form
              onSubmit={handleSubmit}
              className='flex flex-col gap-6 md:gap-8 lg:gap-10'
            >
              {/* First Name & Last Name */}
              <div className='flex flex-row gap-4'>
                <div className='relative h-11 w-full md:h-14 lg:h-[65px]'>
                  <label className='absolute left-0 top-0 text-xs font-normal text-[var(--text-secondary)] md:text-sm lg:text-base xl:text-lg'>
                    First Name
                  </label>
                  <input
                    type='text'
                    name='firstName'
                    value={formData.firstName}
                    onChange={handleChange}
                    className='h-full w-full border-b border-[var(--foreground)] bg-transparent pt-5 text-xs text-[var(--foreground)] outline-none focus:border-[var(--orange-primary)] md:pt-6 md:text-sm lg:pt-7 lg:text-base xl:text-lg'
                  />
                </div>
                <div className='relative h-11 w-full md:h-14 lg:h-[65px]'>
                  <label className='absolute left-0 top-0 text-xs font-normal text-[var(--text-secondary)] md:text-sm lg:text-base xl:text-lg'>
                    Last Name
                  </label>
                  <input
                    type='text'
                    name='lastName'
                    value={formData.lastName}
                    onChange={handleChange}
                    className='h-full w-full border-b border-[var(--foreground)] bg-transparent pt-5 text-xs text-[var(--foreground)] outline-none focus:border-[var(--orange-primary)] md:pt-6 md:text-sm lg:pt-7 lg:text-base xl:text-lg'
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className='relative h-11 w-full md:h-14 lg:h-[65px]'>
                <label className='absolute left-0 top-0 text-xs font-normal text-[#9ba1a6] md:text-sm lg:text-base xl:text-lg'>
                  Email Address
                </label>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  className='h-full w-full border-b border-[var(--foreground)] bg-transparent pt-5 text-xs text-[var(--foreground)] outline-none focus:border-[var(--orange-primary)] md:pt-6 md:text-sm lg:pt-7 lg:text-base xl:text-lg'
                />
              </div>

              {/* Services Dropdown */}
              <div className='relative h-11 w-full md:h-14 lg:h-[65px]'>
                <label className='absolute left-0 top-0 text-xs font-normal text-[#9ba1a6] md:text-sm lg:text-base xl:text-lg'>
                  Services
                </label>
                <select
                  name='service'
                  value={formData.service}
                  onChange={handleChange}
                  className='h-full w-full cursor-pointer appearance-none border-b border-[var(--foreground)] bg-transparent pt-5 text-xs text-[var(--foreground)] outline-none focus:border-[var(--orange-primary)] md:pt-6 md:text-sm lg:pt-7 lg:text-base xl:text-lg'
                >
                  <option
                    className='bg-white dark:bg-[var(--dark-card)] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200'
                    value=''
                  ></option>
                  <option
                    className='bg-white dark:bg-[var(--dark-card)] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200'
                    value='web-design'
                  >
                    Web Design
                  </option>
                  <option
                    className='bg-white dark:bg-[var(--dark-card)] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200'
                    value='mobile-app'
                  >
                    Mobile App
                  </option>
                  <option
                    className='bg-white dark:bg-[var(--dark-card)] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200'
                    value='branding'
                  >
                    Branding
                  </option>
                  <option
                    className='bg-white dark:bg-[var(--dark-card)] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200'
                    value='cms-integration'
                  >
                    CMS Integration
                  </option>
                </select>
                <svg
                  className='pointer-events-none absolute right-0 top-6 h-4 w-4 text-[var(--text-secondary)] md:top-8 lg:top-9 md:h-5 md:w-5 lg:h-6 lg:w-6'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M18 9L12 15L6 9'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </div>

              {/* Project Description */}
              <div className='relative h-11 w-full md:h-14 lg:h-[65px]'>
                <label className='absolute left-0 top-0 text-xs font-normal text-[#9ba1a6] md:text-sm lg:text-base xl:text-lg'>
                  Project Description
                </label>
                <input
                  type='text'
                  name='description'
                  value={formData.description}
                  onChange={handleChange}
                  className='h-full w-full border-b border-[var(--foreground)] bg-transparent pt-5 text-xs text-[var(--foreground)] outline-none focus:border-[var(--orange-primary)] md:pt-6 md:text-sm lg:pt-7 lg:text-base xl:text-lg'
                />
              </div>
            </form>

            {/* Submit Button */}
            <button
              type='submit'
              onClick={handleSubmit}
              disabled={loading}
              className='flex h-10 items-center justify-center rounded-full border border-[var(--orange-primary)] bg-[var(--orange-primary)] px-5 text-center text-sm font-medium text-white transition-opacity hover:opacity-90 md:h-12 md:px-6 md:text-base lg:h-14 lg:px-7 lg:text-lg xl:h-[54px] xl:rounded-[30px] xl:px-[26px] xl:text-[23px]'
            >
              {loading ? 'Sending...' : 'Submit'}
            </button>

            {success && <ThankYouMessage onClose={handleCloseSuccess} />}

            {error && (
              <p className='text-red-500 text-center'>Error: {error}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
