'use client'

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
import type { ProjectDetails } from '@/hooks/use-simulated-onboarding-chat'

interface NewProjectModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  formValues: Partial<ProjectDetails>
  onFormChange: (values: Partial<ProjectDetails>) => void
  onSubmit: (e: React.FormEvent) => Promise<void>
  isLoading?: boolean
}

export function NewProjectModal({
  isOpen,
  onOpenChange,
  formValues,
  onFormChange,
  onSubmit,
  isLoading = false,
}: NewProjectModalProps) {
  const handleFieldChange = (field: keyof ProjectDetails, value: any) => {
    onFormChange({
      ...formValues,
      [field]: value,
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Review or update details and create your project.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className='space-y-4'>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            <div>
              <Label htmlFor='projectTitle'>Project Title</Label>
              <Input
                id='projectTitle'
                value={formValues.projectTitle || ''}
                onChange={(e) =>
                  handleFieldChange('projectTitle', e.target.value)
                }
                placeholder='My Awesome Project'
                disabled={isLoading}
              />
            </div>
            <div>
              <Label htmlFor='projectType'>Project Type</Label>
              <Input
                id='projectType'
                value={formValues.projectType || ''}
                onChange={(e) =>
                  handleFieldChange('projectType', e.target.value)
                }
                placeholder='New Website'
                disabled={isLoading}
              />
            </div>
            <div>
              <Label htmlFor='hosting'>Hosting</Label>
              <Input
                id='hosting'
                value={formValues.hosting || ''}
                onChange={(e) => handleFieldChange('hosting', e.target.value)}
                placeholder='Yes/No'
                disabled={isLoading}
              />
            </div>
            <div>
              <Label htmlFor='brandStyle'>Brand Style</Label>
              <Input
                id='brandStyle'
                value={formValues.brandStyle || ''}
                onChange={(e) =>
                  handleFieldChange('brandStyle', e.target.value)
                }
                placeholder='Modern, Minimalist, etc.'
                disabled={isLoading}
              />
            </div>
            <div className='sm:col-span-2'>
              <Label htmlFor='projectGoals'>Project Goals</Label>
              <Input
                id='projectGoals'
                value={formValues.projectGoals || ''}
                onChange={(e) =>
                  handleFieldChange('projectGoals', e.target.value)
                }
                placeholder='Increase sales, generate leads, etc.'
                disabled={isLoading}
              />
            </div>
            <div>
              <Label htmlFor='targetAudience'>Target Audience</Label>
              <Input
                id='targetAudience'
                value={formValues.targetAudience || ''}
                onChange={(e) =>
                  handleFieldChange('targetAudience', e.target.value)
                }
                placeholder='General consumers, B2B, etc.'
                disabled={isLoading}
              />
            </div>
            <div>
              <Label htmlFor='industry'>Industry</Label>
              <Input
                id='industry'
                value={formValues.industry || ''}
                onChange={(e) => handleFieldChange('industry', e.target.value)}
                placeholder='Technology, Healthcare, etc.'
                disabled={isLoading}
              />
            </div>
            <div>
              <Label htmlFor='pageCount'>Page Count</Label>
              <Input
                id='pageCount'
                value={formValues.pageCount || ''}
                onChange={(e) => handleFieldChange('pageCount', e.target.value)}
                placeholder='1-5, 5-10, 10-20, 20+'
                disabled={isLoading}
              />
            </div>
            <div>
              <Label htmlFor='budget'>Budget</Label>
              <Input
                id='budget'
                type='number'
                value={formValues.budget ?? ''}
                onChange={(e) =>
                  handleFieldChange(
                    'budget',
                    e.target.value === '' ? undefined : Number(e.target.value),
                  )
                }
                placeholder='5000'
                disabled={isLoading}
              />
            </div>
          </div>
          <DialogFooter className='pt-2'>
            <button
              type='button'
              onClick={() => onOpenChange(false)}
              className='rounded-md border border-input bg-background px-4 py-2 text-sm hover:bg-accent disabled:opacity-50'
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type='submit'
              className='rounded-[30px] bg-[#FF8C00] px-5 py-2 text-sm text-white transition hover:bg-[#FF8C00]/90 disabled:opacity-50'
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : 'Create Project'}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
