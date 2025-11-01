import { MainLayout } from '@/components/marketing/main-layout'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <MainLayout>{children}</MainLayout>
}
