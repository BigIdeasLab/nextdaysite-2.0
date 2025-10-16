'use client'

import { useState } from 'react'
import { useProjects } from '@/hooks'
import { Search, Filter, ChevronDown, MoreVertical } from 'lucide-react'
import Link from 'next/link'
import type { ProjectsRow } from '@/types/models'

type ProjectStatus = 'start' | 'in_progress' | 'review' | 'ready_to_ship' | 'shipped'

const statusConfig: Record<ProjectStatus, { label: string; color: string; bgColor: string; barColor: string }> = {
  start: { label: 'Active', color: '#FF8C00', bgColor: '#452600', barColor: '#FF8C00' },
  in_progress: { label: 'In Progress', color: '#FFE14A', bgColor: '#483C00', barColor: '#FFE14A' },
  review: { label: 'Completed', color: '#459538', bgColor: '#1D3219', barColor: '#459538' },
  ready_to_ship: { label: 'Ready to Ship', color: '#00C3FF', bgColor: '#00303F', barColor: '#00C3FF' },
  shipped: { label: 'Shipped', color: '#9D5CFF', bgColor: '#38225A', barColor: '#9D5CFF' },
}

export function ProjectsBoard() {
  const { data: projects = [], isLoading } = useProjects()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatuses, setSelectedStatuses] = useState<ProjectStatus[]>([])

  const projectsByStatus = projects.reduce((acc, project) => {
    const status = project.status as ProjectStatus
    if (!acc[status]) acc[status] = []
    acc[status].push(project)
    return acc
  }, {} as Record<ProjectStatus, ProjectsRow[]>)

  const filteredStatuses: ProjectStatus[] = selectedStatuses.length > 0 
    ? selectedStatuses 
    : Object.keys(statusConfig) as ProjectStatus[]

  if (isLoading) {
    return <div className="projects-loading">Loading...</div>
  }

  return (
    <div className="projects-page">
      {/* Breadcrumbs */}
      <div className="projects-breadcrumbs">
        Homepage &gt; Project &gt; Kanban Board
      </div>

      {/* Header */}
      <div className="projects-header">
        <div className="projects-title-section">
          <h1 className="projects-title">Project Board</h1>
          <p className="projects-subtitle">Manage your projects with our Kanban board</p>
        </div>
        <button className="new-project-button">New Project</button>
      </div>

      {/* Search and Filters */}
      <div className="projects-controls">
        <div className="search-filter-row">
          <div className="search-input-wrapper">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search Anything"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          <button className="filter-button">
            <Filter className="filter-icon" />
          </button>
        </div>

        <div className="status-filters">
          {(Object.keys(statusConfig) as ProjectStatus[]).map((status) => {
            const count = projectsByStatus[status]?.length || 0
            const config = statusConfig[status]
            return (
              <button
                key={status}
                className="status-filter-button"
                onClick={() => {
                  setSelectedStatuses(prev => 
                    prev.includes(status) 
                      ? prev.filter(s => s !== status)
                      : [...prev, status]
                  )
                }}
              >
                <div className="status-badge">
                  <div className="status-badge-circle">
                    <span className="status-badge-number">{count}</span>
                  </div>
                  <span className="status-badge-label">{config.label}</span>
                </div>
                <ChevronDown className="status-dropdown-icon" />
              </button>
            )
          })}
        </div>
      </div>

      {/* Kanban Board */}
      <div className="kanban-container">
        <div className="kanban-board">
          {filteredStatuses.map((status) => {
            const config = statusConfig[status]
            const statusProjects = projectsByStatus[status] || []
            
            return (
              <div key={status} className="kanban-column">
                {/* Column Header */}
                <div className="kanban-column-header">
                  <div className="column-header-content">
                    <h3 className="column-title">{config.label}</h3>
                  </div>
                  <div 
                    className="column-bar" 
                    style={{ background: config.barColor }}
                  />
                </div>

                {/* Column Cards */}
                <div className="kanban-cards">
                  {statusProjects.map((project) => (
                    <Link
                      key={project.id}
                      href={`/dashboard/projects/${project.id}`}
                      className="project-card"
                    >
                      <div className="project-card-header">
                        <div className="project-info">
                          <h4 className="project-name">{project.title}</h4>
                          <p className="project-progress">Progress: {project.progress}%</p>
                        </div>
                        <button className="project-menu-button">
                          <MoreVertical className="menu-icon" />
                        </button>
                      </div>

                      <div className="project-card-body">
                        <div className="progress-bar-container">
                          <div className="progress-bar-bg" />
                          <div 
                            className="progress-bar-fill" 
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>

                        <div 
                          className="project-status-tag" 
                          style={{ background: config.bgColor }}
                        >
                          <span 
                            className="project-status-text" 
                            style={{ color: config.color }}
                          >
                            Status: {config.label}
                          </span>
                        </div>
                      </div>

                      <div className="project-card-footer">
                        <p className="project-updated">
                          Updated: {new Date(project.updated_at).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
