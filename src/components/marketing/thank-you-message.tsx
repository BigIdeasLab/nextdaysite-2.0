import { CheckCircle } from 'lucide-react'

export function ThankYouMessage({ onClose }: { onClose: () => void }) {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
      <div className='bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center max-w-sm mx-auto'>
        <CheckCircle className='w-16 h-16 text-green-500 mx-auto mb-4' />
        <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
          Thank You!
        </h2>
        <p className='text-gray-600 dark:text-gray-300 mb-6'>
          Your message has been sent successfully. We will get back to you soon.
        </p>
        <button
          onClick={onClose}
          className='bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors duration-300'
        >
          Close
        </button>
      </div>
    </div>
  )
}
