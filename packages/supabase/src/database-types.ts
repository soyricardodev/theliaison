export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: number;
          name: string;
        };
        Insert: {
          id?: never;
          name: string;
        };
        Update: {
          id?: never;
          name?: string;
        };
        Relationships: [];
      };
      comments: {
        Row: {
          content: string;
          created_at: string;
          downvotes: number;
          id: number;
          parent_comment_id: number | null;
          poll_id: string;
          upvotes: number;
          user_id: string;
        };
        Insert: {
          content: string;
          created_at?: string;
          downvotes?: number;
          id?: number;
          parent_comment_id?: number | null;
          poll_id: string;
          upvotes?: number;
          user_id: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          downvotes?: number;
          id?: number;
          parent_comment_id?: number | null;
          poll_id?: string;
          upvotes?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "comments_parent_comment_id_fkey";
            columns: ["parent_comment_id"];
            isOneToOne: false;
            referencedRelation: "comments";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "comments_poll_id_fkey";
            columns: ["poll_id"];
            isOneToOne: false;
            referencedRelation: "polls";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "comments_user_id_fkey1";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      customers: {
        Row: {
          id: string;
          stripe_customer_id: string | null;
        };
        Insert: {
          id: string;
          stripe_customer_id?: string | null;
        };
        Update: {
          id?: string;
          stripe_customer_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "customers_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      documents: {
        Row: {
          content: string;
          embedding: string;
          id: number;
        };
        Insert: {
          content: string;
          embedding: string;
          id?: never;
        };
        Update: {
          content?: string;
          embedding?: string;
          id?: never;
        };
        Relationships: [];
      };
      follows: {
        Row: {
          created_at: string;
          follower_id: string;
          following_id: string;
          id: number;
        };
        Insert: {
          created_at?: string;
          follower_id: string;
          following_id: string;
          id?: number;
        };
        Update: {
          created_at?: string;
          follower_id?: string;
          following_id?: string;
          id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "follows_follower_id_fkey";
            columns: ["follower_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "follows_following_id_fkey";
            columns: ["following_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      gifts: {
        Row: {
          created_at: string;
          id: number;
          invoice_link: string | null;
          is_confirmed: boolean;
          is_rejected: boolean;
          recipient_address: string | null;
          recipient_appartment: string | null;
          recipient_city: string | null;
          recipient_country: string | null;
          recipient_email: string | null;
          recipient_name: string;
          recipient_pc: number | null;
          recipient_phone: string | null;
          recipient_social: string;
          sender_name: string;
          total_price: number;
        };
        Insert: {
          created_at?: string;
          id?: number;
          invoice_link?: string | null;
          is_confirmed?: boolean;
          is_rejected?: boolean;
          recipient_address?: string | null;
          recipient_appartment?: string | null;
          recipient_city?: string | null;
          recipient_country?: string | null;
          recipient_email?: string | null;
          recipient_name: string;
          recipient_pc?: number | null;
          recipient_phone?: string | null;
          recipient_social: string;
          sender_name?: string;
          total_price: number;
        };
        Update: {
          created_at?: string;
          id?: number;
          invoice_link?: string | null;
          is_confirmed?: boolean;
          is_rejected?: boolean;
          recipient_address?: string | null;
          recipient_appartment?: string | null;
          recipient_city?: string | null;
          recipient_country?: string | null;
          recipient_email?: string | null;
          recipient_name?: string;
          recipient_pc?: number | null;
          recipient_phone?: string | null;
          recipient_social?: string;
          sender_name?: string;
          total_price?: number;
        };
        Relationships: [];
      };
      gifts_products: {
        Row: {
          created_at: string;
          gift_id: number | null;
          id: number;
          product_id: string;
          quantity: number;
        };
        Insert: {
          created_at?: string;
          gift_id?: number | null;
          id?: number;
          product_id: string;
          quantity: number;
        };
        Update: {
          created_at?: string;
          gift_id?: number | null;
          id?: number;
          product_id?: string;
          quantity?: number;
        };
        Relationships: [
          {
            foreignKeyName: "gifts_products_gift_id_fkey";
            columns: ["gift_id"];
            isOneToOne: false;
            referencedRelation: "gifts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "gifts_products_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
        ];
      };
      options: {
        Row: {
          id: number;
          poll_id: string;
          text: string;
        };
        Insert: {
          id?: number;
          poll_id: string;
          text: string;
        };
        Update: {
          id?: number;
          poll_id?: string;
          text?: string;
        };
        Relationships: [
          {
            foreignKeyName: "options_poll_id_fkey";
            columns: ["poll_id"];
            isOneToOne: false;
            referencedRelation: "polls";
            referencedColumns: ["id"];
          },
        ];
      };
      polls: {
        Row: {
          created_at: string;
          embedding: string | null;
          id: string;
          image: string;
          is_featured: boolean;
          question: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          embedding?: string | null;
          id: string;
          image: string;
          is_featured?: boolean;
          question: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          embedding?: string | null;
          id?: string;
          image?: string;
          is_featured?: boolean;
          question?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "polls_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      polls_categories: {
        Row: {
          categorie_id: number;
          poll_id: string;
        };
        Insert: {
          categorie_id: number;
          poll_id: string;
        };
        Update: {
          categorie_id?: number;
          poll_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "polls_categories_categorie_id_fkey";
            columns: ["categorie_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "polls_categories_poll_id_fkey";
            columns: ["poll_id"];
            isOneToOne: false;
            referencedRelation: "polls";
            referencedColumns: ["id"];
          },
        ];
      };
      prices: {
        Row: {
          active: boolean | null;
          currency: string | null;
          description: string | null;
          id: string;
          interval: Database["public"]["Enums"]["pricing_plan_interval"] | null;
          interval_count: number | null;
          metadata: Json | null;
          product_id: string | null;
          trial_period_days: number | null;
          type: Database["public"]["Enums"]["pricing_type"] | null;
          unit_amount: number | null;
        };
        Insert: {
          active?: boolean | null;
          currency?: string | null;
          description?: string | null;
          id: string;
          interval?:
            | Database["public"]["Enums"]["pricing_plan_interval"]
            | null;
          interval_count?: number | null;
          metadata?: Json | null;
          product_id?: string | null;
          trial_period_days?: number | null;
          type?: Database["public"]["Enums"]["pricing_type"] | null;
          unit_amount?: number | null;
        };
        Update: {
          active?: boolean | null;
          currency?: string | null;
          description?: string | null;
          id?: string;
          interval?:
            | Database["public"]["Enums"]["pricing_plan_interval"]
            | null;
          interval_count?: number | null;
          metadata?: Json | null;
          product_id?: string | null;
          trial_period_days?: number | null;
          type?: Database["public"]["Enums"]["pricing_type"] | null;
          unit_amount?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "prices_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
        ];
      };
      products: {
        Row: {
          active: boolean | null;
          description: string | null;
          id: string;
          image: string | null;
          metadata: Json | null;
          name: string | null;
          type: Database["public"]["Enums"]["product_type"];
        };
        Insert: {
          active?: boolean | null;
          description?: string | null;
          id: string;
          image?: string | null;
          metadata?: Json | null;
          name?: string | null;
          type?: Database["public"]["Enums"]["product_type"];
        };
        Update: {
          active?: boolean | null;
          description?: string | null;
          id?: string;
          image?: string | null;
          metadata?: Json | null;
          name?: string | null;
          type?: Database["public"]["Enums"]["product_type"];
        };
        Relationships: [];
      };
      rules: {
        Row: {
          can_make_poll: number;
          created_at: string;
          id: number;
          product_id: string;
        };
        Insert: {
          can_make_poll: number;
          created_at?: string;
          id?: number;
          product_id: string;
        };
        Update: {
          can_make_poll?: number;
          created_at?: string;
          id?: number;
          product_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "rules_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: true;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
        ];
      };
      subscriptions: {
        Row: {
          cancel_at: string | null;
          cancel_at_period_end: boolean | null;
          canceled_at: string | null;
          created: string;
          current_period_end: string;
          current_period_start: string;
          ended_at: string | null;
          id: string;
          metadata: Json | null;
          price_id: string | null;
          quantity: number | null;
          status: Database["public"]["Enums"]["subscription_status"] | null;
          trial_end: string | null;
          trial_start: string | null;
          user_id: string;
        };
        Insert: {
          cancel_at?: string | null;
          cancel_at_period_end?: boolean | null;
          canceled_at?: string | null;
          created?: string;
          current_period_end?: string;
          current_period_start?: string;
          ended_at?: string | null;
          id: string;
          metadata?: Json | null;
          price_id?: string | null;
          quantity?: number | null;
          status?: Database["public"]["Enums"]["subscription_status"] | null;
          trial_end?: string | null;
          trial_start?: string | null;
          user_id: string;
        };
        Update: {
          cancel_at?: string | null;
          cancel_at_period_end?: boolean | null;
          canceled_at?: string | null;
          created?: string;
          current_period_end?: string;
          current_period_start?: string;
          ended_at?: string | null;
          id?: string;
          metadata?: Json | null;
          price_id?: string | null;
          quantity?: number | null;
          status?: Database["public"]["Enums"]["subscription_status"] | null;
          trial_end?: string | null;
          trial_start?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "subscriptions_price_id_fkey";
            columns: ["price_id"];
            isOneToOne: false;
            referencedRelation: "prices";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "subscriptions_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      users: {
        Row: {
          avatar_url: string | null;
          billing_address: Json | null;
          birthday_date: string | null;
          city: string | null;
          country: string | null;
          data_verified: boolean | null;
          full_name: string;
          gender: Database["public"]["Enums"]["gender"] | null;
          id: string;
          instagram_username: string | null;
          payment_method: Json | null;
          relationship_status:
            | Database["public"]["Enums"]["marital_status"]
            | null;
          updated_at: string | null;
          username: string;
        };
        Insert: {
          avatar_url?: string | null;
          billing_address?: Json | null;
          birthday_date?: string | null;
          city?: string | null;
          country?: string | null;
          data_verified?: boolean | null;
          full_name: string;
          gender?: Database["public"]["Enums"]["gender"] | null;
          id: string;
          instagram_username?: string | null;
          payment_method?: Json | null;
          relationship_status?:
            | Database["public"]["Enums"]["marital_status"]
            | null;
          updated_at?: string | null;
          username: string;
        };
        Update: {
          avatar_url?: string | null;
          billing_address?: Json | null;
          birthday_date?: string | null;
          city?: string | null;
          country?: string | null;
          data_verified?: boolean | null;
          full_name?: string;
          gender?: Database["public"]["Enums"]["gender"] | null;
          id?: string;
          instagram_username?: string | null;
          payment_method?: Json | null;
          relationship_status?:
            | Database["public"]["Enums"]["marital_status"]
            | null;
          updated_at?: string | null;
          username?: string;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      votes: {
        Row: {
          id: number;
          is_ai: boolean;
          is_theliaison: boolean;
          option_id: number;
          poll_id: string;
          user_id: string;
        };
        Insert: {
          id?: number;
          is_ai?: boolean;
          is_theliaison?: boolean;
          option_id: number;
          poll_id: string;
          user_id: string;
        };
        Update: {
          id?: number;
          is_ai?: boolean;
          is_theliaison?: boolean;
          option_id?: number;
          poll_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "votes_option_id_fkey";
            columns: ["option_id"];
            isOneToOne: false;
            referencedRelation: "options";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "votes_poll_id_fkey";
            columns: ["poll_id"];
            isOneToOne: false;
            referencedRelation: "polls";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "votes_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      downvote_comment: {
        Args: {
          p_comment_id: number;
        };
        Returns: {
          downvotes: number;
        }[];
      };
      hnswhandler: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      ivfflathandler: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      search_polls: {
        Args: {
          query_embedding: string;
          similarity_threshold: number;
          match_count: number;
        };
        Returns: {
          id: string;
          question: string;
          image: string;
          similarity: number;
        }[];
      };
      upvote_comment: {
        Args: {
          p_comment_id: number;
        };
        Returns: {
          upvotes: number;
        }[];
      };
      vector_avg: {
        Args: {
          "": number[];
        };
        Returns: string;
      };
      vector_dims: {
        Args: {
          "": string;
        };
        Returns: number;
      };
      vector_norm: {
        Args: {
          "": string;
        };
        Returns: number;
      };
      vector_out: {
        Args: {
          "": string;
        };
        Returns: unknown;
      };
      vector_send: {
        Args: {
          "": string;
        };
        Returns: string;
      };
      vector_typmod_in: {
        Args: {
          "": unknown[];
        };
        Returns: number;
      };
    };
    Enums: {
      gender: "female" | "male" | "other";
      marital_status:
        | "single"
        | "married"
        | "divorced"
        | "widowed"
        | "separated"
        | "loving relationship";
      pricing_plan_interval: "day" | "week" | "month" | "year";
      pricing_type: "one_time" | "recurring";
      product_type: "gift" | "subscription";
      subscription_status:
        | "trialing"
        | "active"
        | "canceled"
        | "incomplete"
        | "incomplete_expired"
        | "past_due"
        | "unpaid"
        | "paused";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;
