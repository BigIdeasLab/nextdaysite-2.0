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
      activities: {
        Row: {
          actor_id: string | null
          created_at: string
          event_type: Database['public']['Enums']['activity_type']
          id: string
          metadata: Json | null
          project_id: string
        }
        Insert: {
          actor_id?: string | null
          created_at?: string
          event_type: Database['public']['Enums']['activity_type']
          id?: string
          metadata?: Json | null
          project_id: string
        }
        Update: {
          actor_id?: string | null
          created_at?: string
          event_type?: Database['public']['Enums']['activity_type']
          id?: string
          metadata?: Json | null
          project_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'activities_actor_id_fkey'
            columns: ['actor_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'activities_project_id_fkey'
            columns: ['project_id']
            isOneToOne: false
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
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'chat_messages_project_id_fkey'
            columns: ['project_id']
            isOneToOne: false
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
          id: string
          issued_at: string
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
      onboarding_steps: {
        Row: {
          id: number
          message: string
          question_key: string | null
          responses: Json | null
          step_name: string
        }
        Insert: {
          id?: number
          message: string
          question_key?: string | null
          responses?: Json | null
          step_name: string
        }
        Update: {
          id?: number
          message?: string
          question_key?: string | null
          responses?: Json | null
          step_name?: string
        }
        Relationships: []
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
          title: string
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
            isOneToOne: false
            referencedRelation: 'users'
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
            foreignKeyName: 'subscriptions_user_id_fkey'
            columns: ['user_id']
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
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
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
      invoice_status: ['draft', 'open', 'paid', 'overdue'],
      project_priority: ['low', 'medium', 'high'],
      project_status: [
        'start',
        'in_progress',
        'review',
        'ready_to_ship',
        'shipped',
      ],
      subscription_status: ['trialing', 'active', 'past_due', 'canceled'],
      user_role: ['customer', 'admin', 'collaborator'],
    },
  },
} as const
