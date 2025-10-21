'use client'

import { useMemo, useState, useEffect } from 'react'
import { useProjects, useInvoices, useFiles } from '@/hooks'
import { DashboardHeader } from './dashboard-header'
import { NewKpiGrid } from './new-kpi-grid'
import { ProjectSearchSection } from './project-search-section'
import { ProjectCard } from './project-card'
import { QuickActions } from './quick-actions'
import { RecentActivities } from './recent-activities'
import { formatDate } from '@/lib/utils/format'
import type { ProjectDetails } from '@/hooks/use-simulated-onboarding-chat'
import { createProject } from '@/lib/api/data-service'
import { useAuth } from '@/context/auth-context'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const statusLabels: Record<string, string> = {
  active: 'Status: Active',
  inactive: 'Status: Inactive (Click to activate)',
  in_progress: 'Status: In Progress',
  completed: 'Status: Completed',
  ready_to_ship: 'Status: Ready to Ship',
  shipped: 'Status: Shipped',
}

export function NewCustomerDashboard() {
  const { data: projects = [] } = useProjects()
  const { data: invoices = [] } = useInvoices()
  const { data: files = [] } = useFiles()
  const [onboardingDetails, setOnboardingDetails] =
    useState<ProjectDetails | null>(null)
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false)
  const [formValues, setFormValues] = useState<Partial<ProjectDetails>>({})
  const { user } = useAuth()

  useEffect(() => {
    const storedDetails = localStorage.getItem('onboardingProjectDetails')
    if (storedDetails) {
      try {
        const details = JSON.parse(storedDetails)
        setOnboardingDetails(details)
        localStorage.removeItem('onboardingProjectDetails')
      } catch (error) {
        console.error('Failed to parse onboarding details:', error)
        localStorage.removeItem('onboardingProjectDetails') // Clean up corrupted data
      }
    }
  }, [])

  const handleCreateProject = async () => {
    if (user && onboardingDetails) {
      try {
        await createProject(onboardingDetails)
        setOnboardingDetails(null)
        window.location.reload()
      } catch (error) {
        console.error('Failed to create project:', error)
        alert(
          'There was an error creating your project. Please check the console for more details.',
        )
      }
    }
  }

  const openNewProjectModal = () => {
    setFormValues(onboardingDetails ?? {})
    setIsNewProjectOpen(true)
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createProject(formValues)
      setIsNewProjectOpen(false)
      setOnboardingDetails(null)
      window.location.reload()
    } catch (error) {
      console.error('Failed to create project from form:', error)
      alert('There was an error creating your project.')
    }
  }

  const kpiMetrics = useMemo(() => {
    const activeProjects = projects.filter((p) => p.status === 'active')
    const readyToShip = projects.filter((p) => p.status === 'ready_to_ship')
    const openInvoices = invoices.filter((i) => i.status === 'open')
    const storageUsed = files.reduce((sum, file) => sum + file.size_bytes, 0)
    const storageGB = (storageUsed / 1024 ** 3).toFixed(2)

    return [
      {
        label: 'Active Project',
        value: String(activeProjects.length),
        icon: 'folder' as const,
      },
      {
        label: 'Ready to Ship',
        value: String(readyToShip.length),
        icon: 'message' as const,
      },
      {
        label: 'Invoices Due',
        value: String(openInvoices.length),
        icon: 'invoice' as const,
      },
      {
        label: 'Storage Used',
        value: `${storageGB}GB`,
        icon: 'storage' as const,
      },
    ]
  }, [projects, invoices, files])

  return (
    <div className='flex flex-col gap-8'>
      {onboardingDetails && (
        <div className='onboarding-wallet-card'>
          {/* <svg
            className='confetti-decoration'
            width='774'
            height='129'
            viewBox='0 0 774 129'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g clipPath='url(#clip0_2504_257)'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M480.828 10.9982C485.835 9.75698 488.845 9.46689 494.036 9.965C494.32 7.42887 494.116 5.21266 492.946 3.14023C489.497 2.46716 485.141 2.59199 479.333 3.31207C481.463 6.40095 482.05 8.32022 480.828 10.9982Z'
                fill='#61BA47'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M53.4974 96.338C58.6501 96.0905 61.6596 96.3893 66.6552 97.8839C67.425 95.4508 67.6547 93.2371 66.9088 90.9773C63.6553 89.6486 59.3581 88.927 53.5198 88.5077C55.0109 91.9508 55.2152 93.9475 53.4974 96.338Z'
                fill='#F74F9E'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M328.862 95.0615C325.452 96.5816 324.191 98.989 322.413 102.674C323.974 106.315 324.762 109.237 326.483 112.056C330.677 111.366 333.624 111.839 338.158 114.677C335.98 106.239 333.566 101.865 328.862 95.0615Z'
                fill='#A550A7'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M120.406 99.5327C124.951 97.0935 127.797 96.0691 132.949 95.27C132.598 92.7424 131.853 90.6451 130.208 88.9257C126.7 89.1252 122.51 90.3217 117.059 92.4539C119.885 94.9211 120.928 96.6359 120.406 99.5327Z'
                fill='#FFC700'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M25.8735 43.1954C29.6024 43.0102 31.6476 41.2209 34.6373 38.4277C34.4977 34.4682 34.8188 31.4588 34.2325 28.2092C30.0728 27.3362 27.4954 25.8308 24.2935 21.5459C23.2756 30.2012 23.9451 35.1519 25.8735 43.1954Z'
                fill='#FF5257'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M375.787 123.316C379.879 126.457 381.982 128.63 384.828 132.999C386.988 131.64 388.594 130.099 389.486 127.893C387.862 124.776 385.049 121.448 380.865 117.355C379.777 120.946 378.643 122.602 375.787 123.316Z'
                fill='#007AFF'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M420.095 109.6C417.345 107.075 414.635 106.875 410.547 106.708C407.826 109.588 405.457 111.472 403.555 114.171C405.855 117.746 406.593 120.638 405.79 125.927C412.667 120.574 415.722 116.621 420.095 109.6Z'
                fill='#61BA47'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M484.678 83.8978C482.771 80.6881 480.234 79.7166 476.367 78.3795C472.932 80.3539 470.121 81.4769 467.523 83.5144C468.696 87.5997 468.57 90.5819 466.279 95.4155C474.406 92.2691 478.469 89.3628 484.678 83.8978Z'
                fill='#F74F9E'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M760.985 66.345C761.48 61.2103 762.209 58.275 764.406 53.5461C762.108 52.4346 759.951 51.8891 757.607 52.3024C755.825 55.3312 754.493 59.48 753.239 65.1974C756.861 64.2167 758.866 64.3016 760.985 66.345Z'
                fill='#A550A7'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M345.594 87.5128C346.474 91.141 348.614 92.8151 351.918 95.2291C355.781 94.3507 358.798 94.1028 361.88 92.9185C361.959 88.6688 362.955 85.8552 366.565 81.9077C357.872 82.5281 353.134 84.1126 345.594 87.5128Z'
                fill='#FFC700'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M40.183 132.794C40.9462 127.692 41.8268 124.798 44.2678 120.191C42.0318 118.961 39.9055 118.303 37.5436 118.594C35.6053 121.525 34.0587 125.599 32.5078 131.243C36.1757 130.453 38.1739 130.642 40.183 132.794Z'
                fill='#FF5257'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M690.635 99.2064C686.707 95.8633 684.715 93.5873 682.092 89.0806C679.867 90.3294 678.185 91.7875 677.184 93.9464C678.649 97.1408 681.291 100.606 685.264 104.904C686.531 101.372 687.747 99.7759 690.635 99.2064Z'
                fill='#007AFF'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M607.885 148.348C611.424 147.158 612.906 144.88 615.025 141.38C613.816 137.607 613.308 134.624 611.861 131.656C607.621 131.945 604.732 131.196 600.487 127.941C601.857 136.548 603.845 141.13 607.885 148.348Z'
                fill='#FFC700'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M699.918 96.2213C704.458 98.6698 706.882 100.48 710.388 104.339C712.304 102.653 713.643 100.875 714.171 98.555C712.071 95.7372 708.764 92.9005 703.98 89.527C703.479 93.2455 702.623 95.061 699.918 96.2213Z'
                fill='#F74F9E'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M436.354 105.45C431.526 107.266 428.57 107.905 423.357 108.016C423.371 110.568 423.832 112.745 425.235 114.667C428.739 114.933 433.051 114.302 438.736 112.909C436.26 110.09 435.453 108.252 436.354 105.45Z'
                fill='#A550A7'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M108.92 90.9981C113.92 92.2676 116.711 93.4331 121.051 96.3226C122.499 94.2208 123.365 92.171 123.313 89.7919C120.59 87.5701 116.691 85.6239 111.23 83.5164C111.65 87.2449 111.261 89.2141 108.92 90.9981Z'
                fill='#FF5257'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M422.894 109.964C420.54 105.374 419.568 102.51 418.865 97.3432C416.331 97.6476 414.22 98.3533 412.471 99.9663C412.605 103.478 413.724 107.689 415.754 113.179C418.274 110.399 420.007 109.387 422.894 109.964Z'
                fill='#A550A7'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M608.108 12.0167C604.942 13.9945 604.027 16.5534 602.776 20.449C604.826 23.8391 606.012 26.6239 608.106 29.1764C612.165 27.9129 615.149 27.9724 620.032 30.1553C616.706 22.1001 613.71 18.1024 608.108 12.0167Z'
                fill='#007AFF'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M630.119 7.92092C629.07 11.5038 630.088 14.0232 631.745 17.7642C635.531 18.9324 638.268 20.2238 641.53 20.7369C643.72 17.0944 645.988 15.1541 651.087 13.5366C643.246 9.73333 638.35 8.74032 630.119 7.92092Z'
                fill='#F74F9E'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M146.669 117.453C150.823 114.393 153.494 112.976 158.481 111.454C157.775 109.001 156.74 107.031 154.868 105.562C151.423 106.258 147.445 108.036 142.352 110.92C145.5 112.962 146.776 114.514 146.669 117.453Z'
                fill='#A550A7'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M145.78 80.8529C150.549 78.8869 153.484 78.1562 158.691 77.8835C158.597 75.3333 158.069 73.1713 156.607 71.294C153.096 71.1369 148.806 71.9025 143.167 73.4712C145.729 76.2123 146.593 78.024 145.78 80.8529Z'
                fill='#007AFF'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M230.717 13.1665C233.118 16.0258 235.779 16.5744 239.811 17.269C242.882 14.7655 245.474 13.203 247.709 10.7724C245.891 6.93032 245.534 3.967 247.013 -1.17334C239.501 3.24519 235.961 6.76992 230.717 13.1665Z'
                fill='#F74F9E'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M542.617 67.6332C541.345 64.1232 539.034 62.6936 535.486 60.656C531.742 61.9522 528.771 62.5291 525.837 64.0438C526.224 68.2765 525.542 71.1824 522.386 75.5015C530.959 73.9327 535.494 71.8388 542.617 67.6332Z'
                fill='#FF5257'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M384.299 94.0778C386.552 91.1005 386.493 88.3837 386.272 84.2982C383.147 81.8625 381.047 79.6838 378.179 78.0464C374.839 80.6745 372.03 81.6835 366.689 81.3862C372.67 87.7248 376.895 90.3907 384.299 94.0778Z'
                fill='#F74F9E'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M492.5 72.2854C490.429 77.0101 488.822 79.5724 485.261 83.3815C487.098 85.1534 488.978 86.3439 491.334 86.6813C493.971 84.3587 496.529 80.8313 499.502 75.7892C495.755 75.5927 493.876 74.8873 492.5 72.2854Z'
                fill='#F74F9E'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M222.253 30.7719C224.682 26.221 226.481 23.7901 230.325 20.267C228.631 18.3588 226.848 17.0268 224.525 16.5088C221.716 18.6211 218.894 21.9408 215.541 26.7387C219.262 27.2235 221.081 28.0717 222.253 30.7719Z'
                fill='#007AFF'
              />
            </g>
            <defs>
              <clipPath id='clip0_2504_257'>
                <rect
                  width='775.37'
                  height='598.143'
                  fill='white'
                  transform='translate(774 128.571) rotate(-180)'
                />
              </clipPath>
            </defs>
          </svg> */}
          <div className='onboarding-content'>
            <div className='onboarding-header'>
              <h2 className='onboarding-title'>Welcome to NextDaySite!</h2>
              <p className='onboarding-subtitle'>
                Let&apos;s get started on your new project. Here are the details
                you provided:
              </p>
            </div>
            <div className='onboarding-details-card'>
              <div className='details-column'>
                {onboardingDetails.projectType && (
                  <div className='detail-row'>
                    <span className='detail-label'>Project Type:</span>
                    <span className='detail-value'>
                      {onboardingDetails.projectType}
                    </span>
                  </div>
                )}
                {onboardingDetails.brandStyle && (
                  <div className='detail-row'>
                    <span className='detail-label'>Brand Style:</span>
                    <span className='detail-value'>
                      {onboardingDetails.brandStyle}
                    </span>
                  </div>
                )}
                {onboardingDetails.projectGoals && (
                  <div className='detail-row'>
                    <span className='detail-label'>Project Goal:</span>
                    <span className='detail-value'>
                      {onboardingDetails.projectGoals}
                    </span>
                  </div>
                )}
                {onboardingDetails.industry && (
                  <div className='detail-row'>
                    <span className='detail-label'>Industry</span>
                    <span className='detail-value'>
                      {onboardingDetails.industry}
                    </span>
                  </div>
                )}
              </div>
              <div className='details-column'>
                {onboardingDetails.hosting && (
                  <div className='detail-row'>
                    <span className='detail-label'>Hosting:</span>
                    <span className='detail-value'>
                      {onboardingDetails.hosting}
                    </span>
                  </div>
                )}
                {onboardingDetails.budget && (
                  <div className='detail-row'>
                    <span className='detail-label'>Budget:</span>
                    <span className='detail-value'>
                      ${onboardingDetails.budget.toLocaleString()}
                    </span>
                  </div>
                )}
                {onboardingDetails.targetAudience && (
                  <div className='detail-row'>
                    <span className='detail-label'>Target Audience:</span>
                    <span className='detail-value'>
                      {onboardingDetails.targetAudience}
                    </span>
                  </div>
                )}
                {onboardingDetails.pageCount && (
                  <div className='detail-row'>
                    <span className='detail-label'>Page Count</span>
                    <span className='detail-value'>
                      {onboardingDetails.pageCount}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className='onboarding-actions'>
              <button
                onClick={handleCreateProject}
                className='start-project-button'
              >
                <svg
                  width='22'
                  height='22'
                  viewBox='0 0 22 22'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M4.58331 12.8335L7.79165 16.0418L17.4166 5.9585'
                    stroke='#F7F6FF'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
                <span>Start Project</span>
              </button>
              <button
                onClick={() => setOnboardingDetails(null)}
                className='dismiss-button'
              >
                <svg
                  width='22'
                  height='22'
                  viewBox='0 0 22 22'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M16.5 5.5L5.50074 16.4993M16.4993 16.5L5.5 5.50078'
                    stroke='#F7F6FF'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
                <span>Dismiss</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <DashboardHeader onNewProject={openNewProjectModal} />

      <NewKpiGrid items={kpiMetrics} />

      <Dialog open={isNewProjectOpen} onOpenChange={setIsNewProjectOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription>
              Review or update details and create your project.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleFormSubmit} className='space-y-4'>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <div>
                <Label htmlFor='projectTitle'>Project Title</Label>
                <Input
                  id='projectTitle'
                  value={formValues.projectTitle || ''}
                  onChange={(e) =>
                    setFormValues((v) => ({ ...v, projectTitle: e.target.value }))
                  }
                  placeholder='My Awesome Project'
                />
              </div>
              <div>
                <Label htmlFor='projectType'>Project Type</Label>
                <Input
                  id='projectType'
                  value={formValues.projectType || ''}
                  onChange={(e) =>
                    setFormValues((v) => ({ ...v, projectType: e.target.value }))
                  }
                  placeholder='New Website'
                />
              </div>
              <div>
                <Label htmlFor='hosting'>Hosting</Label>
                <Input
                  id='hosting'
                  value={formValues.hosting || ''}
                  onChange={(e) =>
                    setFormValues((v) => ({ ...v, hosting: e.target.value }))
                  }
                  placeholder='Yes/No'
                />
              </div>
              <div>
                <Label htmlFor='brandStyle'>Brand Style</Label>
                <Input
                  id='brandStyle'
                  value={formValues.brandStyle || ''}
                  onChange={(e) =>
                    setFormValues((v) => ({ ...v, brandStyle: e.target.value }))
                  }
                  placeholder='Modern, Minimalist, etc.'
                />
              </div>
              <div className='sm:col-span-2'>
                <Label htmlFor='projectGoals'>Project Goals</Label>
                <Input
                  id='projectGoals'
                  value={formValues.projectGoals || ''}
                  onChange={(e) =>
                    setFormValues((v) => ({ ...v, projectGoals: e.target.value }))
                  }
                  placeholder='Increase sales, generate leads, etc.'
                />
              </div>
              <div>
                <Label htmlFor='targetAudience'>Target Audience</Label>
                <Input
                  id='targetAudience'
                  value={formValues.targetAudience || ''}
                  onChange={(e) =>
                    setFormValues((v) => ({ ...v, targetAudience: e.target.value }))
                  }
                  placeholder='General consumers, B2B, etc.'
                />
              </div>
              <div>
                <Label htmlFor='industry'>Industry</Label>
                <Input
                  id='industry'
                  value={formValues.industry || ''}
                  onChange={(e) =>
                    setFormValues((v) => ({ ...v, industry: e.target.value }))
                  }
                  placeholder='Technology, Healthcare, etc.'
                />
              </div>
              <div>
                <Label htmlFor='pageCount'>Page Count</Label>
                <Input
                  id='pageCount'
                  value={formValues.pageCount || ''}
                  onChange={(e) =>
                    setFormValues((v) => ({ ...v, pageCount: e.target.value }))
                  }
                  placeholder='1-5, 5-10, 10-20, 20+'
                />
              </div>
              <div>
                <Label htmlFor='budget'>Budget</Label>
                <Input
                  id='budget'
                  type='number'
                  value={formValues.budget ?? ''}
                  onChange={(e) =>
                    setFormValues((v) => ({
                      ...v,
                      budget: e.target.value === '' ? undefined : Number(e.target.value),
                    }))
                  }
                  placeholder='5000'
                />
              </div>
            </div>
            <DialogFooter className='pt-2'>
              <button
                type='button'
                onClick={() => setIsNewProjectOpen(false)}
                className='rounded-md border border-input bg-background px-4 py-2 text-sm hover:bg-accent'
              >
                Cancel
              </button>
              <button
                type='submit'
                className='rounded-[30px] bg-[#FF8C00] px-5 py-2 text-sm text-white transition hover:bg-[#FF8C00]/90'
              >
                Create Project
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <div className='grid gap-8 lg:grid-cols-[1fr_449px]'>
        <div className='flex flex-col gap-4'>
          <h2 className='text-xl font-medium text-white'>Your Project</h2>
          <div className='flex flex-col gap-4 bg-[#131313] p-3 rounded-xl'>
            <ProjectSearchSection />
            <div className='flex flex-col gap-4'>
              {projects.slice(0, 3).map((project) => (
                <ProjectCard
                  key={project.id}
                  title={project.title}
                  status={statusLabels[project.status] || 'Status: Unknown'}
                  progress={project.progress}
                  lastUpdated={formatDate(project.updated_at, {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                  isInactive={project.status === 'inactive'}
                  statusColor={
                    project.status === 'completed' ? 'green' : 'orange'
                  }
                />
              ))}
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-8'>
          <QuickActions />
          <RecentActivities />
        </div>
      </div>
    </div>
  )
}
