import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import MarketingHomePage from '../app/page'

// Mock child components to isolate the test
vi.mock('@/components/marketing/header', () => ({
  Header: () => <header>Mocked Header</header>,
}))
vi.mock('@/components/marketing/redesigned-hero', () => ({
  RedesignedHero: () => <div>Mocked Hero</div>,
}))
vi.mock('@/components/marketing/featured-works', () => ({
  FeaturedWorksSection: () => <div>Mocked Featured Works</div>,
}))
vi.mock('@/components/marketing/services-section', () => ({
  ServicesSection: () => <div>Mocked Services</div>,
}))
vi.mock('@/components/marketing/testimonials-section', () => ({
  TestimonialsSection: () => <div>Mocked Testimonials</div>,
}))
vi.mock('@/components/marketing/redesigned-pricing', () => ({
  RedesignedPricing: () => <div>Mocked Pricing</div>,
}))
vi.mock('@/components/marketing/cta-section', () => ({
  CtaSection: () => <div>Mocked CTA</div>,
}))
vi.mock('@/components/marketing/redesigned-footer', () => ({
  RedesignedFooter: () => <footer>Mocked Footer</footer>,
}))

describe('MarketingHomePage', () => {
  it('renders the main page with all sections', async () => {
    render(await MarketingHomePage())

    // Check if the mocked components are rendered
    expect(screen.getByText('Mocked Header')).toBeInTheDocument()
    expect(screen.getByText('Mocked Hero')).toBeInTheDocument()
    expect(screen.getByText('Mocked Featured Works')).toBeInTheDocument()
    expect(screen.getByText('Mocked Services')).toBeInTheDocument()
    expect(screen.getByText('Mocked Testimonials')).toBeInTheDocument()
    expect(screen.getByText('Mocked Pricing')).toBeInTheDocument()
    expect(screen.getByText('Mocked CTA')).toBeInTheDocument()
    expect(screen.getByText('Mocked Footer')).toBeInTheDocument()
  })
})
