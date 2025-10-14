import { Header } from '@/components/marketing/header'
import { RedesignedFooter } from '@/components/marketing/redesigned-footer'
import { LoginForm } from '@/components/forms/login-form'

export default function LoginPage() {
  return (
    <div className='min-h-screen bg-[#0a0a0a] text-foreground'>
      <Header />
      <main className='container mx-auto px-4 py-16'>
        <div className='flex flex-col items-center justify-center'>
          <h1 className='text-4xl font-bold mb-8'>Login</h1>
          <div className='w-full max-w-md'>
            <LoginForm />
          </div>
        </div>
      </main>
      <RedesignedFooter />
    </div>
  )
}
