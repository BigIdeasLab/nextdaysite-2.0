export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      activities: {
        Row: {
          actor_id: string
          created_at: string
          id: string
          event_type: Database['public']['Enums']['activity_type']
          metadata: Json | null
          project_id: string
        }
        Insert: {
          actor_id: string
          created_at?: string
          id?: string
          event_type: Database['public']['Enums']['activity_type']
          metadata?: Json | null
          project_id: string
        }
        Update: {
          actor_id?: string
          created_at?: string
          id?: string
          event_type?: Database['public']['Enums']['activity_type']
          metadata?: Json | null
          project_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'activities_actor_id_fkey'
            columns: ['actor_id']
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'activities_project_id_fkey'
            columns: ['project_id']
            referencedRelation: 'projects'
            referencedColumns: ['id']
          },
        ]
      }
      chat_messages: {
        Row: {
          attachments: Json | null
          author_id: string
          created_at: string
          id: string
          message: string
          project_id: string
          role: Database['public']['Enums']['chat_role']
        }
        Insert: {
          attachments?: Json | null
          author_id: string
          created_at?: string
          id?: string
          message: string
          project_id: string
          role: Database['public']['Enums']['chat_role']
        }
        Update: {
          attachments?: Json | null
          author_id?: string
          created_at?: string
          id?: string
          message?: string
          project_id?: string
          role?: Database['public']['Enums']['chat_role']
        }
        Relationships: [
          {
            foreignKeyName: 'chat_messages_author_id_fkey'
            columns: ['author_id']
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'chat_messages_project_id_fkey'
            columns: ['project_id']
            referencedRelation: 'projects'
            referencedColumns: ['id']
          },
        ]
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
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'files_project_id_fkey'
            columns: ['project_id']
            referencedRelation: 'projects'
            referencedColumns: ['id']
          },
        ]
      }
      invoices: {
        Row: {
          created_at: string
          currency: string
          due_date: string
          id: string
          issued_at: string
          project_id: string
          status: Database['public']['Enums']['invoice_status']
          subtotal: number
          tax: number
          total: number
          user_id: string
          stripe_invoice_id: string | null
          download_url: string | null
        }
        Insert: {
          created_at?: string
          currency: string
          due_date: string
          id?: string
          issued_at: string
          project_id: string
          status: Database['public']['Enums']['invoice_status']
          subtotal: number
          tax: number
          total: number
          user_id: string
          stripe_invoice_id?: string | null
          download_url?: string | null
        }
        Update: {
          created_at?: string
          currency?: string
          due_date?: string
          id?: string
          issued_at?: string
          project_id?: string
          status?: Database['public']['Enums']['invoice_status']
          subtotal?: number
          tax?: number
          total?: number
          user_id?: string
          stripe_invoice_id?: string | null
          download_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'invoices_project_id_fkey'
            columns: ['project_id']
            referencedRelation: 'projects'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'invoices_user_id_fkey'
            columns: ['user_id']
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      plans: {
        Row: {
          created_at: string
          id: string
          is_featured: boolean
          monthly_price: number
          name: string
          summary: string
          features: string[]
          slug: string
          updated_at: string
          yearly_price: number
          yearly_discount: number
          hosting_monthly_price: number
          hosting_yearly_price: number
          hosting: boolean
        }
        Insert: {
          created_at?: string
          id?: string
          is_featured?: boolean
          monthly_price: number
          name: string
          summary: string
          features?: string[]
          slug: string
          hosting_yearly_price: number
          hosting?: boolean
        }
        Update: {
          created_at?: string
          id?: string
          is_featured?: boolean
          monthly_price?: number
          name?: string
          summary?: string
          features?: string[]
          slug?: string
          updated_at?: string
          yearly_price?: number
          yearly_discount?: number
          hosting_monthly_price?: number
          hosting_yearly_price?: number
          hosting?: boolean
        }
        Relationships: []
      }
      projects: {
        Row: {
          budget: number | null
          completed_at: string | null
          created_at: string
          due_date: string | null
          id: string
          owner_id: string
          priority: Database['public']['Enums']['project_priority']
          progress: number
          project_manager_id: string | null
          slug: string
          start_date: string | null
          status: Database['public']['Enums']['project_status']
          summary: string | null
          tags: string[]
          title: string
          updated_at: string
        }
        Insert: {
          budget?: number | null
          completed_at?: string | null
          created_at?: string
          due_date?: string | null
          id?: string
          owner_id: string
          priority?: Database['public']['Enums']['project_priority']
          progress?: number
          project_manager_id?: string | null
          slug: string
          start_date?: string | null
          status?: Database['public']['Enums']['project_status']
          summary?: string | null
          tags?: string[]
          updated_at?: string
        }
        Update: {
          budget?: number | null
          completed_at?: string | null
          created_at?: string
          due_date?: string | null
          id?: string
          owner_id?: string
          priority?: Database['public']['Enums']['project_priority']
          progress?: number
          project_manager_id?: string | null
          slug?: string
          start_date?: string | null
          status?: Database['public']['Enums']['project_status']
          summary?: string | null
          tags?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'projects_owner_id_fkey'
            columns: ['owner_id']
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'projects_project_manager_id_fkey'
            columns: ['project_manager_id']
            referencedRelation: 'users'
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
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      subscriptions: {
        Row: {
          base_amount: number
          billing_cycle: string
          cancel_at_period_end: boolean
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          currency: string
          hosting_amount: number
          id: string
          include_hosting: boolean
          metadata: Json | null
          notes: string | null
          plan_id: string
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
          current_period_end?: string | null
          current_period_start?: string | null
          currency?: string
          hosting_amount?: number
          id?: string
          include_hosting?: boolean
          metadata?: Json | null
          notes?: string | null
          plan_id: string
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
          current_period_end?: string | null
          current_period_start?: string | null
          currency?: string
          hosting_amount?: number
          id?: string
          include_hosting?: boolean
          metadata?: Json | null
          notes?: string | null
          plan_id?: string
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
            referencedRelation: 'plans'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'subscriptions_user_id_fkey'
            columns: ['user_id']
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
          role: Database['public']['Enums']['user_role']
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
          role?: Database['public']['Enums']['user_role']
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
          role?: Database['public']['Enums']['user_role']
          stripe_customer_id?: string | null
          timezone?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'users_plan_id_fkey'
            columns: ['plan_id']
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
      start_checkout: {
        Args: {
          p_email: string
          p_company_name: string | null
          p_plan_id: string
          p_billing_cycle: string
          p_include_hosting: boolean
          p_notes?: string | null
        }
        Returns: {
          subscription_id: string
          invoice_id: string
          subtotal: number
          tax: number
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
      invoice_status: 'draft' | 'open' | 'paid' | 'overdue'
      project_priority: 'low' | 'medium' | 'high'
      project_status:
        | 'start'
        | 'in_progress'
        | 'review'
        | 'ready_to_ship'
        | 'shipped'
      subscription_status: 'trialing' | 'active' | 'past_due' | 'canceled'
      user_role: 'customer' | 'admin' | 'collaborator'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
