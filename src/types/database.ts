export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '13.0.5'
  }
  public: {
    Tables: {
      cms_settings: {
        Row: {
          created_at: string
          description: string | null
          id: string
          key: string
          updated_at: string
          updated_by: string | null
          value: Json
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          key: string
          updated_at?: string
          updated_by?: string | null
          value: Json
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          key?: string
          updated_at?: string
          updated_by?: string | null
          value?: Json
        }
        Relationships: [
          {
            foreignKeyName: 'cms_settings_updated_by_fkey'
            columns: ['updated_by']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      contact_submissions: {
        Row: {
          created_at: string | null
          description: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          service: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          email: string
          first_name: string
          id?: string
          last_name: string
          service?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          service?: string | null
        }
        Relationships: []
      }
      files: {
        Row: {
          bucket_path: string
          created_at: string
          description: string | null
          id: string
          mime_type: string | null
          name: string
          owner_id: string
          preview_url: string | null
          project_id: string
          size_bytes: number
          storage_bucket: string
          updated_at: string
          version: number
        }
        Insert: {
          bucket_path: string
          created_at?: string
          description?: string | null
          id?: string
          mime_type?: string | null
          name: string
          owner_id: string
          preview_url?: string | null
          project_id: string
          size_bytes: number
          storage_bucket?: string
          updated_at?: string
          version?: number
        }
        Update: {
          bucket_path?: string
          created_at?: string
          description?: string | null
          id?: string
          mime_type?: string | null
          name?: string
          owner_id?: string
          preview_url?: string | null
          project_id?: string
          size_bytes?: number
          storage_bucket?: string
          updated_at?: string
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: 'files_owner_id_fkey'
            columns: ['owner_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'files_project_id_fkey'
            columns: ['project_id']
            isOneToOne: false
            referencedRelation: 'projects'
            referencedColumns: ['id']
          },
        ]
      }
      invoices: {
        Row: {
          created_at: string
          currency: string
          download_url: string | null
          due_date: string
          id: string
          issued_at: string
          metadata: Json | null
          project_id: string | null
          status: Database['public']['Enums']['invoice_status']
          stripe_invoice_id: string | null
          subtotal: number
          tax: number
          total: number
          user_id: string
        }
        Insert: {
          created_at?: string
          currency?: string
          download_url?: string | null
          due_date: string
          id?: string
          issued_at: string
          metadata?: Json | null
          project_id?: string | null
          status?: Database['public']['Enums']['invoice_status']
          stripe_invoice_id?: string | null
          subtotal: number
          tax: number
          total: number
          user_id: string
        }
        Update: {
          created_at?: string
          currency?: string
          download_url?: string | null
          due_date?: string
          id?: string
          issued_at?: string
          metadata?: Json | null
          project_id?: string | null
          status?: Database['public']['Enums']['invoice_status']
          stripe_invoice_id?: string | null
          subtotal?: number
          tax?: number
          total?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'invoices_project_id_fkey'
            columns: ['project_id']
            isOneToOne: false
            referencedRelation: 'projects'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'invoices_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      logos: {
        Row: {
          created_at: string | null
          description: string | null
          height: number | null
          id: string
          image_url: string
          name: string
          width: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          height?: number | null
          id?: string
          image_url: string
          name: string
          width?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          height?: number | null
          id?: string
          image_url?: string
          name?: string
          width?: number | null
        }
        Relationships: []
      }
      pages: {
        Row: {
          content: Json | null
          created_at: string
          created_by: string | null
          description: string | null
          hero_image_id: string | null
          hero_image_url: string | null
          hero_subtitle: string | null
          hero_title: string | null
          id: string
          meta_description: string | null
          meta_title: string | null
          published: boolean | null
          published_at: string | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          content?: Json | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          hero_image_id?: string | null
          hero_image_url?: string | null
          hero_subtitle?: string | null
          hero_title?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          published?: boolean | null
          published_at?: string | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          content?: Json | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          hero_image_id?: string | null
          hero_image_url?: string | null
          hero_subtitle?: string | null
          hero_title?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          published?: boolean | null
          published_at?: string | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'pages_created_by_fkey'
            columns: ['created_by']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'pages_hero_image_id_fkey'
            columns: ['hero_image_id']
            isOneToOne: false
            referencedRelation: 'files'
            referencedColumns: ['id']
          },
        ]
      }
      plans: {
        Row: {
          created_at: string
          features: string[]
          hosting: boolean | null
          hosting_monthly_price: number | null
          hosting_yearly_price: number | null
          id: string
          is_featured: boolean
          monthly_price: number
          name: string
          slug: string
          summary: string
          updated_at: string
          yearly_price: number
        }
        Insert: {
          created_at?: string
          features?: string[]
          hosting?: boolean | null
          hosting_monthly_price?: number | null
          hosting_yearly_price?: number | null
          id?: string
          is_featured?: boolean
          monthly_price: number
          name: string
          slug: string
          summary: string
          updated_at?: string
          yearly_price: number
        }
        Update: {
          created_at?: string
          features?: string[]
          hosting?: boolean | null
          hosting_monthly_price?: number | null
          hosting_yearly_price?: number | null
          id?: string
          is_featured?: boolean
          monthly_price?: number
          name?: string
          slug?: string
          summary?: string
          updated_at?: string
          yearly_price?: number
        }
        Relationships: []
      }
      portfolio_items: {
        Row: {
          color: string | null
          created_at: string
          created_by: string | null
          description: string
          id: string
          image_id: string | null
          image_url: string | null
          order_index: number | null
          published: boolean | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          created_by?: string | null
          description: string
          id?: string
          image_id?: string | null
          image_url?: string | null
          order_index?: number | null
          published?: boolean | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          color?: string | null
          created_at?: string
          created_by?: string | null
          description?: string
          id?: string
          image_id?: string | null
          image_url?: string | null
          order_index?: number | null
          published?: boolean | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'portfolio_items_created_by_fkey'
            columns: ['created_by']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'portfolio_items_image_id_fkey'
            columns: ['image_id']
            isOneToOne: false
            referencedRelation: 'files'
            referencedColumns: ['id']
          },
        ]
      }
      projects: {
        Row: {
          ai_inferred_payment_type: string | null
          ai_inferred_plan: string | null
          brand_style: string | null
          budget: number | null
          completed_at: string | null
          confirmation: boolean | null
          created_at: string
          due_date: string | null
          hosting: string | null
          id: string
          industry: string | null
          key_features: string | null
          main_goal: string | null
          owner_id: string
          page_count: string | null
          plan_id: string | null
          priority: Database['public']['Enums']['project_priority']
          progress: number
          project_goals: string | null
          project_manager_id: string | null
          project_title: string | null
          project_type: string | null
          reference_websites: string | null
          slug: string
          start_date: string | null
          status: Database['public']['Enums']['project_status']
          summary: string | null
          tags: string[]
          target_audience: string | null
          title: string
          updated_at: string
        }
        Insert: {
          ai_inferred_payment_type?: string | null
          ai_inferred_plan?: string | null
          brand_style?: string | null
          budget?: number | null
          completed_at?: string | null
          confirmation?: boolean | null
          created_at?: string
          due_date?: string | null
          hosting?: string | null
          id?: string
          industry?: string | null
          key_features?: string | null
          main_goal?: string | null
          owner_id: string
          page_count?: string | null
          plan_id?: string | null
          priority?: Database['public']['Enums']['project_priority']
          progress?: number
          project_goals?: string | null
          project_manager_id?: string | null
          project_title?: string | null
          project_type?: string | null
          reference_websites?: string | null
          slug: string
          start_date?: string | null
          status?: Database['public']['Enums']['project_status']
          summary?: string | null
          tags?: string[]
          target_audience?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          ai_inferred_payment_type?: string | null
          ai_inferred_plan?: string | null
          brand_style?: string | null
          budget?: number | null
          completed_at?: string | null
          confirmation?: boolean | null
          created_at?: string
          due_date?: string | null
          hosting?: string | null
          id?: string
          industry?: string | null
          key_features?: string | null
          main_goal?: string | null
          owner_id?: string
          page_count?: string | null
          plan_id?: string | null
          priority?: Database['public']['Enums']['project_priority']
          progress?: number
          project_goals?: string | null
          project_manager_id?: string | null
          project_title?: string | null
          project_type?: string | null
          reference_websites?: string | null
          slug?: string
          start_date?: string | null
          status?: Database['public']['Enums']['project_status']
          summary?: string | null
          tags?: string[]
          target_audience?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'projects_owner_id_fkey'
            columns: ['owner_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'projects_plan_id_fkey'
            columns: ['plan_id']
            isOneToOne: false
            referencedRelation: 'plans'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'projects_project_manager_id_fkey'
            columns: ['project_manager_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      sections: {
        Row: {
          content: Json | null
          created_at: string
          created_by: string | null
          id: string
          name: string
          order_index: number | null
          page_id: string
          published: boolean | null
          section_type: string
          settings: Json | null
          updated_at: string
        }
        Insert: {
          content?: Json | null
          created_at?: string
          created_by?: string | null
          id?: string
          name: string
          order_index?: number | null
          page_id: string
          published?: boolean | null
          section_type: string
          settings?: Json | null
          updated_at?: string
        }
        Update: {
          content?: Json | null
          created_at?: string
          created_by?: string | null
          id?: string
          name?: string
          order_index?: number | null
          page_id?: string
          published?: boolean | null
          section_type?: string
          settings?: Json | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'sections_created_by_fkey'
            columns: ['created_by']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'sections_page_id_fkey'
            columns: ['page_id']
            isOneToOne: false
            referencedRelation: 'pages'
            referencedColumns: ['id']
          },
        ]
      }
      services: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          icon: string | null
          id: string
          image1_id: string | null
          image1_url: string | null
          image2_id: string | null
          image2_url: string | null
          order_index: number | null
          published: boolean | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          image1_id?: string | null
          image1_url?: string | null
          image2_id?: string | null
          image2_url?: string | null
          order_index?: number | null
          published?: boolean | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          image1_id?: string | null
          image1_url?: string | null
          image2_id?: string | null
          image2_url?: string | null
          order_index?: number | null
          published?: boolean | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'services_created_by_fkey'
            columns: ['created_by']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'services_image1_id_fkey'
            columns: ['image1_id']
            isOneToOne: false
            referencedRelation: 'files'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'services_image2_id_fkey'
            columns: ['image2_id']
            isOneToOne: false
            referencedRelation: 'files'
            referencedColumns: ['id']
          },
        ]
      }
      settings: {
        Row: {
          created_at: string
          id: string
          key: string
          updated_at: string
          updated_by: string | null
          value: Json
        }
        Insert: {
          created_at?: string
          id?: string
          key: string
          updated_at?: string
          updated_by?: string | null
          value: Json
        }
        Update: {
          created_at?: string
          id?: string
          key?: string
          updated_at?: string
          updated_by?: string | null
          value?: Json
        }
        Relationships: [
          {
            foreignKeyName: 'settings_updated_by_fkey'
            columns: ['updated_by']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      showreels: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          title: string | null
          url: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          title?: string | null
          url: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          title?: string | null
          url?: string
        }
        Relationships: []
      }
      stripe_events: {
        Row: {
          created_at: string | null
          id: string
        }
        Insert: {
          created_at?: string | null
          id: string
        }
        Update: {
          created_at?: string | null
          id?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          base_amount: number
          billing_cycle: string
          cancel_at_period_end: boolean
          created_at: string
          currency: string
          current_period_end: string | null
          current_period_start: string | null
          hosting_amount: number
          id: string
          include_hosting: boolean
          metadata: Json | null
          notes: string | null
          plan_id: string
          project_id: string | null
          status: Database['public']['Enums']['subscription_status']
          stripe_subscription_id: string | null
          subtotal: number
          tax: number
          total: number
          updated_at: string
          user_id: string
        }
        Insert: {
          base_amount: number
          billing_cycle: string
          cancel_at_period_end?: boolean
          created_at?: string
          currency?: string
          current_period_end?: string | null
          current_period_start?: string | null
          hosting_amount?: number
          id?: string
          include_hosting?: boolean
          metadata?: Json | null
          notes?: string | null
          plan_id: string
          project_id?: string | null
          status?: Database['public']['Enums']['subscription_status']
          stripe_subscription_id?: string | null
          subtotal: number
          tax: number
          total: number
          updated_at?: string
          user_id: string
        }
        Update: {
          base_amount?: number
          billing_cycle?: string
          cancel_at_period_end?: boolean
          created_at?: string
          currency?: string
          current_period_end?: string | null
          current_period_start?: string | null
          hosting_amount?: number
          id?: string
          include_hosting?: boolean
          metadata?: Json | null
          notes?: string | null
          plan_id?: string
          project_id?: string | null
          status?: Database['public']['Enums']['subscription_status']
          stripe_subscription_id?: string | null
          subtotal?: number
          tax?: number
          total?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'subscriptions_plan_id_fkey'
            columns: ['plan_id']
            isOneToOne: false
            referencedRelation: 'plans'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'subscriptions_project_id_fkey'
            columns: ['project_id']
            isOneToOne: false
            referencedRelation: 'projects'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'subscriptions_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      testimonials: {
        Row: {
          avatar_id: string | null
          avatar_url: string | null
          bg_color: string | null
          border_color: string | null
          created_at: string
          created_by: string | null
          id: string
          logo_url: string | null
          name: string
          order_index: number | null
          position_class: string | null
          published: boolean | null
          quote: string
          rotate_class: string | null
          text_color: string | null
          updated_at: string
        }
        Insert: {
          avatar_id?: string | null
          avatar_url?: string | null
          bg_color?: string | null
          border_color?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          logo_url?: string | null
          name: string
          order_index?: number | null
          position_class?: string | null
          published?: boolean | null
          quote: string
          rotate_class?: string | null
          text_color?: string | null
          updated_at?: string
        }
        Update: {
          avatar_id?: string | null
          avatar_url?: string | null
          bg_color?: string | null
          border_color?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          order_index?: number | null
          position_class?: string | null
          published?: boolean | null
          quote?: string
          rotate_class?: string | null
          text_color?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'testimonials_avatar_id_fkey'
            columns: ['avatar_id']
            isOneToOne: false
            referencedRelation: 'files'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'testimonials_created_by_fkey'
            columns: ['created_by']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          company_name: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          last_active_at: string | null
          metadata: Json | null
          phone: string | null
          plan_id: string | null
          role: string | null
          stripe_customer_id: string | null
          timezone: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          company_name?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id?: string
          last_active_at?: string | null
          metadata?: Json | null
          phone?: string | null
          plan_id?: string | null
          role?: string | null
          stripe_customer_id?: string | null
          timezone?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          company_name?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          last_active_at?: string | null
          metadata?: Json | null
          phone?: string | null
          plan_id?: string | null
          role?: string | null
          stripe_customer_id?: string | null
          timezone?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'users_plan_id_fkey'
            columns: ['plan_id']
            isOneToOne: false
            referencedRelation: 'plans'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: { Args: never; Returns: boolean }
      start_checkout: {
        Args: {
          p_billing_cycle: string
          p_company_name: string
          p_email: string
          p_include_hosting: boolean
          p_notes: string
          p_plan_id: string
        }
        Returns: {
          invoice_id: string
          total: number
        }[]
      }
    }
    Enums: {
      activity_type:
        | 'status_change'
        | 'file_uploaded'
        | 'invoice_sent'
        | 'note_added'
        | 'message_posted'
      chat_role: 'customer' | 'team' | 'ai'
      deliverable_status: 'pending' | 'in_progress' | 'completed'
      invoice_status: 'draft' | 'open' | 'paid' | 'overdue'
      project_priority: 'low' | 'medium' | 'high'
      project_status:
        | 'active'
        | 'inactive'
        | 'in_progress'
        | 'completed'
        | 'ready_to_ship'
        | 'shipped'
      subscription_status: 'trialing' | 'active' | 'past_due' | 'canceled'
      timeline_phase_status: 'pending' | 'in_progress' | 'completed'
      user_role: 'customer' | 'admin' | 'collaborator'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
        DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] &
        DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      activity_type: [
        'status_change',
        'file_uploaded',
        'invoice_sent',
        'note_added',
        'message_posted',
      ],
      chat_role: ['customer', 'team', 'ai'],
      deliverable_status: ['pending', 'in_progress', 'completed'],
      invoice_status: ['draft', 'open', 'paid', 'overdue'],
      project_priority: ['low', 'medium', 'high'],
      project_status: [
        'active',
        'inactive',
        'in_progress',
        'completed',
        'ready_to_ship',
        'shipped',
      ],
      subscription_status: ['trialing', 'active', 'past_due', 'canceled'],
      timeline_phase_status: ['pending', 'in_progress', 'completed'],
      user_role: ['customer', 'admin', 'collaborator'],
    },
  },
} as const
