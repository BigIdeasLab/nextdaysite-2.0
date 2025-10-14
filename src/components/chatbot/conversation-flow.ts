export interface Question {
  key: string
  text: string
  type: 'text' | 'multiple-choice'
  options?: string[]
}

export interface ConversationPhase {
  name: string
  questions: Question[]
}

export const conversationFlow: ConversationPhase[] = [
  {
    name: 'Greeting + Context',
    questions: [
      {
        key: 'greeting',
        text: "Hi! I'm here to help you plan your new website. To start, what type of site are you thinking about building?",
        type: 'multiple-choice',
        options: ['Business', 'Portfolio', 'E-commerce', 'Blog', 'Other'],
      },
    ],
  },
  {
    name: 'Business & Purpose',
    questions: [
      {
        key: 'goal',
        text: 'What’s the main goal of the website?',
        type: 'multiple-choice',
        options: [
          'Get leads',
          'Sell products',
          'Showcase work',
          'Provide info',
          'Other',
        ],
      },
      {
        key: 'business_description',
        text: 'Tell me a bit about your business or idea.',
        type: 'text',
      },
      {
        key: 'domain_logo',
        text: 'Do you already have a domain name or logo?',
        type: 'multiple-choice',
        options: ['Yes', 'No', 'I have a domain', 'I have a logo'],
      },
    ],
  },
  {
    name: 'Content & Features',
    questions: [
      {
        key: 'pages',
        text: 'What pages or sections do you want?',
        type: 'text',
      },
      {
        key: 'features',
        text: 'Do you want to include features like a blog, contact form, online store, or booking system?',
        type: 'text',
      },
      {
        key: 'content_source',
        text: 'Do you already have text and images, or would you like help creating content?',
        type: 'multiple-choice',
        options: ['I have content', 'I need help', 'A bit of both'],
      },
    ],
  },
  {
    name: 'Design & Style',
    questions: [
      {
        key: 'likes_dislikes',
        text: 'Do you have any websites you like or want yours to look similar to?',
        type: 'text',
      },
      {
        key: 'style',
        text: 'What style are you going for?',
        type: 'multiple-choice',
        options: [
          'Modern',
          'Minimalist',
          'Playful',
          'Corporate',
          'Luxury',
          'Other',
        ],
      },
      {
        key: 'brand_assets',
        text: 'Do you have brand colors or fonts you want to use?',
        type: 'multiple-choice',
        options: ['Yes', 'No'],
      },
      {
        key: 'device_target',
        text: 'Should the site work best on desktop, mobile, or both?',
        type: 'multiple-choice',
        options: ['Desktop', 'Mobile', 'Both'],
      },
    ],
  },
  {
    name: 'Timeline, Budget & Contact',
    questions: [
      {
        key: 'timeline',
        text: 'When do you want the website to be ready?',
        type: 'text',
      },
      {
        key: 'budget',
        text: 'What’s your budget range?',
        type: 'multiple-choice',
        options: ['<$1,000', '$1,000 - $3,000', '$3,000 - $5,000', '$5,000+'],
      },
      {
        key: 'name',
        text: 'What’s your name?',
        type: 'text',
      },
      {
        key: 'contact',
        text: 'What’s the best email or phone number to reach you?',
        type: 'text',
      },
      {
        key: 'consultation',
        text: 'Would you like me to schedule a free consultation call to finalize the plan?',
        type: 'multiple-choice',
        options: ['Yes, please!', 'No, thanks'],
      },
    ],
  },
]
