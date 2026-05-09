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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      notifications: {
        Row: {
          body: string | null
          created_at: string
          id: string
          is_read: boolean
          link: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          id?: string
          is_read?: boolean
          link?: string | null
          title: string
          type?: string
          user_id: string
        }
        Update: {
          body?: string | null
          created_at?: string
          id?: string
          is_read?: boolean
          link?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      otp_verifications: {
        Row: {
          attempts: number
          code_hash: string
          created_at: string
          expires_at: string
          id: string
          phone: string
          user_id: string | null
        }
        Insert: {
          attempts?: number
          code_hash: string
          created_at?: string
          expires_at: string
          id?: string
          phone: string
          user_id?: string | null
        }
        Update: {
          attempts?: number
          code_hash?: string
          created_at?: string
          expires_at?: string
          id?: string
          phone?: string
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          accommodation_type: string | null
          account_manager_id: string | null
          acquisition_source: string | null
          address: string | null
          address_lat: number | null
          address_lon: number | null
          address_of_residence: string | null
          age_range: string | null
          annual_rent_range: string | null
          bank_account_number: string | null
          bank_name: string | null
          bathrooms: number | null
          bedrooms: number | null
          bvn: string | null
          country: string | null
          created_at: string
          crm_tags: string[]
          dob: string | null
          email: string | null
          first_name: string | null
          full_name: string | null
          gender: string | null
          id: string
          interested_in_platform: string | null
          is_current_tenant: boolean | null
          kyc_completed: boolean
          kyc_status: Database["public"]["Enums"]["kyc_status"]
          last_name: string | null
          marital_status: string | null
          marketing_consent: boolean
          nin: string | null
          nin_verified: boolean
          occupation: string | null
          office_address: string | null
          office_lat: number | null
          office_lon: number | null
          pays_on_time: string | null
          pays_rent_to: string | null
          phone: string | null
          phone_verified: boolean
          profession_type: string | null
          professional_association: string | null
          referral_code: string | null
          referred_by: string | null
          rent_payment_ease: number | null
          rent_payment_method: string | null
          sought_rent_help_before: boolean | null
          state_of_residence: string | null
          status: Database["public"]["Enums"]["account_status"]
          survey_completed: boolean
          survey_completed_at: string | null
          tenancy_duration: string | null
          tenancy_period: string | null
          tenancy_property_type: string | null
          toilets: number | null
          updated_at: string
          years_experience: string | null
        }
        Insert: {
          accommodation_type?: string | null
          account_manager_id?: string | null
          acquisition_source?: string | null
          address?: string | null
          address_lat?: number | null
          address_lon?: number | null
          address_of_residence?: string | null
          age_range?: string | null
          annual_rent_range?: string | null
          bank_account_number?: string | null
          bank_name?: string | null
          bathrooms?: number | null
          bedrooms?: number | null
          bvn?: string | null
          country?: string | null
          created_at?: string
          crm_tags?: string[]
          dob?: string | null
          email?: string | null
          first_name?: string | null
          full_name?: string | null
          gender?: string | null
          id: string
          interested_in_platform?: string | null
          is_current_tenant?: boolean | null
          kyc_completed?: boolean
          kyc_status?: Database["public"]["Enums"]["kyc_status"]
          last_name?: string | null
          marital_status?: string | null
          marketing_consent?: boolean
          nin?: string | null
          nin_verified?: boolean
          occupation?: string | null
          office_address?: string | null
          office_lat?: number | null
          office_lon?: number | null
          pays_on_time?: string | null
          pays_rent_to?: string | null
          phone?: string | null
          phone_verified?: boolean
          profession_type?: string | null
          professional_association?: string | null
          referral_code?: string | null
          referred_by?: string | null
          rent_payment_ease?: number | null
          rent_payment_method?: string | null
          sought_rent_help_before?: boolean | null
          state_of_residence?: string | null
          status?: Database["public"]["Enums"]["account_status"]
          survey_completed?: boolean
          survey_completed_at?: string | null
          tenancy_duration?: string | null
          tenancy_period?: string | null
          tenancy_property_type?: string | null
          toilets?: number | null
          updated_at?: string
          years_experience?: string | null
        }
        Update: {
          accommodation_type?: string | null
          account_manager_id?: string | null
          acquisition_source?: string | null
          address?: string | null
          address_lat?: number | null
          address_lon?: number | null
          address_of_residence?: string | null
          age_range?: string | null
          annual_rent_range?: string | null
          bank_account_number?: string | null
          bank_name?: string | null
          bathrooms?: number | null
          bedrooms?: number | null
          bvn?: string | null
          country?: string | null
          created_at?: string
          crm_tags?: string[]
          dob?: string | null
          email?: string | null
          first_name?: string | null
          full_name?: string | null
          gender?: string | null
          id?: string
          interested_in_platform?: string | null
          is_current_tenant?: boolean | null
          kyc_completed?: boolean
          kyc_status?: Database["public"]["Enums"]["kyc_status"]
          last_name?: string | null
          marital_status?: string | null
          marketing_consent?: boolean
          nin?: string | null
          nin_verified?: boolean
          occupation?: string | null
          office_address?: string | null
          office_lat?: number | null
          office_lon?: number | null
          pays_on_time?: string | null
          pays_rent_to?: string | null
          phone?: string | null
          phone_verified?: boolean
          profession_type?: string | null
          professional_association?: string | null
          referral_code?: string | null
          referred_by?: string | null
          rent_payment_ease?: number | null
          rent_payment_method?: string | null
          sought_rent_help_before?: boolean | null
          state_of_residence?: string | null
          status?: Database["public"]["Enums"]["account_status"]
          survey_completed?: boolean
          survey_completed_at?: string | null
          tenancy_duration?: string | null
          tenancy_period?: string | null
          tenancy_property_type?: string | null
          toilets?: number | null
          updated_at?: string
          years_experience?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_account_manager_id_fkey"
            columns: ["account_manager_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      account_status: "active" | "suspended" | "pending_approval"
      app_role:
        | "tenant"
        | "landlord"
        | "investor"
        | "professional"
        | "staff"
        | "admin"
      kyc_status: "pending" | "verified" | "rejected"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      account_status: ["active", "suspended", "pending_approval"],
      app_role: [
        "tenant",
        "landlord",
        "investor",
        "professional",
        "staff",
        "admin",
      ],
      kyc_status: ["pending", "verified", "rejected"],
    },
  },
} as const
