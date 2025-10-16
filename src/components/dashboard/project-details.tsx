'use client'

import { useState } from 'react'
import { useProjects } from '@/hooks'
import {
  Calendar,
  DollarSign,
  User,
  PenLine,
  Paperclip,
  MessageSquare,
  Share2,
} from 'lucide-react'
import Link from 'next/link'
import { ProjectDeliverables } from './project-deliverables'
import { ProjectTimeline } from './project-timeline'

type TabType = 'scope' | 'deliverables' | 'timeline'

const statusConfig = {
  start: { label: 'Active', color: '#FF8C00', bgColor: '#452600' },
  in_progress: { label: 'In Progress', color: '#FFE14A', bgColor: '#483C00' },
  review: { label: 'Completed', color: '#459538', bgColor: '#1D3219' },
  ready_to_ship: {
    label: 'Ready to Ship',
    color: '#00C3FF',
    bgColor: '#00303F',
  },
  shipped: { label: 'Shipped', color: '#9D5CFF', bgColor: '#38225A' },
}

export function ProjectDetails({ projectId }: { projectId: string }) {
  const { data: projects = [] } = useProjects()
  const project = projects.find((p) => p.id === projectId)
  const [activeTab, setActiveTab] = useState<TabType>('scope')

  if (!project) {
    return <div className='projects-loading'>Project not found</div>
  }

  const status = project.status as keyof typeof statusConfig
  const config = statusConfig[status] || statusConfig.start

  return (
    <div className='project-details-page'>
      {/* Breadcrumbs */}
      <div className='project-breadcrumbs'>
        <Link href='/dashboard'>Homepage</Link> &gt;{' '}
        <Link href='/dashboard/projects'>Project</Link> &gt; Kanban Board &gt;{' '}
        {project.title}
      </div>

      {/* Header */}
      <div className='project-details-header'>
        <h1 className='project-details-title'>{project.title}</h1>
        <div className='project-actions'>
          <button className='project-action-button'>
            <PenLine className='action-icon' />
          </button>
          <button className='project-action-button'>
            <Paperclip className='action-icon' />
          </button>
          <button className='project-action-button'>
            <MessageSquare className='action-icon' />
          </button>
          <button className='project-action-button'>
            <Share2 className='action-icon' />
          </button>
        </div>
      </div>

      <div className='project-status-row'>
        <div
          className='project-status-badge'
          style={{ background: config.bgColor }}
        >
          <span style={{ color: config.color }}>Status: {config.label}</span>
        </div>
        <button className='new-project-button'>New Project</button>
      </div>

      {/* Project Meta */}
      <div className='project-meta'>
        <div className='meta-item'>
          <Calendar className='meta-icon' />
          <span className='meta-label'>Start Date</span>
          <span className='meta-value'>
            {project.start_date
              ? new Date(project.start_date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })
              : '-'}
          </span>
        </div>

        <div className='meta-item'>
          <Calendar className='meta-icon' />
          <span className='meta-label'>ETA</span>
          <span className='meta-value'>
            {project.due_date
              ? new Date(project.due_date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })
              : '-'}
          </span>
        </div>

        <div className='meta-item'>
          <DollarSign className='meta-icon' />
          <span className='meta-label'>Subscription Plan:</span>
          <span className='meta-value'>Pro Plan (Monthly)</span>
        </div>

        <div className='meta-item'>
          <div className='meta-icon-placeholder' />
          <span className='meta-label'>Progress</span>
          <div className='progress-with-percent'>
            <div className='small-progress-bar'>
              <div className='small-progress-bg' />
              <div
                className='small-progress-fill'
                style={{ width: `${project.progress}%` }}
              />
            </div>
            <span className='meta-value'>{project.progress}%</span>
          </div>
        </div>

        <div className='meta-item'>
          <User className='meta-icon' />
          <span className='meta-label'>Assigned Developer</span>
          <span className='meta-value'>Chris.N</span>
        </div>
      </div>

      {/* Tabs */}
      <div className='project-tabs'>
        <div className='tabs-header'>
          <button
            className={`tab-button ${activeTab === 'scope' ? 'active' : ''}`}
            onClick={() => setActiveTab('scope')}
          >
            Scope
          </button>
          <button
            className={`tab-button ${activeTab === 'deliverables' ? 'active' : ''}`}
            onClick={() => setActiveTab('deliverables')}
          >
            Deliverables
          </button>
          <button
            className={`tab-button ${activeTab === 'timeline' ? 'active' : ''}`}
            onClick={() => setActiveTab('timeline')}
          >
            Timeline
          </button>
        </div>
        <div className='tab-indicator-line'>
          <div
            className='tab-indicator'
            style={{
              left:
                activeTab === 'scope'
                  ? '0%'
                  : activeTab === 'deliverables'
                    ? '33.33%'
                    : '66.66%',
            }}
          />
        </div>
      </div>

      {/* Tab Content */}
      <div className='tab-content'>
        {activeTab === 'scope' && (
          <div className='scope-content'>
            <div className='scope-section'>
              <h3 className='scope-heading'>Description</h3>
              <p className='scope-text'>
                {project.summary ||
                  'The EcoShop Mobile App project aims to create a user-friendly platform connecting consumers with sustainable products. Key features include a curated marketplace, eco-friendly product discovery, secure payment integration, and a carbon footprint tracker. The project will prioritize a seamless user experience, promote environmental awareness, and support ethical consumerism.'}
              </p>
            </div>

            <div className='scope-section'>
              <h3 className='scope-heading'>Technical Scope</h3>
              <div className='technical-specs'>
                <div className='spec-row'>
                  <span className='spec-label'>Framework:</span>
                  <span className='spec-value'>Next.js + Tailwind CSS</span>
                </div>
                <div className='spec-row'>
                  <span className='spec-label'>CMS</span>
                  <span className='spec-value'>
                    Strapi (headless integration)
                  </span>
                </div>
                <div className='spec-row'>
                  <span className='spec-label'>Hosting</span>
                  <span className='spec-value'>Vercel</span>
                </div>
                <div className='spec-row'>
                  <span className='spec-label'>Analytics:</span>
                  <span className='spec-value'>
                    Google Analytics 4 + Heatmap tracking
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'deliverables' && (
          <ProjectDeliverables projectId={projectId} />
        )}
        {activeTab === 'timeline' && <ProjectTimeline projectId={projectId} />}
      </div>
    </div>
  )
}
