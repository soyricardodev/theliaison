export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export type Database = {
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
				];
			};
			customers: {
				Row: {
					id: string;
					stripe_customer_id: string | null;
				};
				Insert: {
					id?: string;
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
				Relationships: [];
			};
			gift_payments: {
				Row: {
					created_at: string;
					delivery_fee: number | null;
					gift_id: number | null;
					id: number;
					invoice_link: string | null;
					payment_status: Database["public"]["Enums"]["gift_payment_status"];
					service_fee: number | null;
					total_price: number | null;
					updated_at: string | null;
				};
				Insert: {
					created_at?: string;
					delivery_fee?: number | null;
					gift_id?: number | null;
					id?: number;
					invoice_link?: string | null;
					payment_status?: Database["public"]["Enums"]["gift_payment_status"];
					service_fee?: number | null;
					total_price?: number | null;
					updated_at?: string | null;
				};
				Update: {
					created_at?: string;
					delivery_fee?: number | null;
					gift_id?: number | null;
					id?: number;
					invoice_link?: string | null;
					payment_status?: Database["public"]["Enums"]["gift_payment_status"];
					service_fee?: number | null;
					total_price?: number | null;
					updated_at?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "gift_payments_gift_id_fkey";
						columns: ["gift_id"];
						isOneToOne: false;
						referencedRelation: "gifts";
						referencedColumns: ["id"];
					},
				];
			};
			gift_recipient_addresses: {
				Row: {
					address_line_1: string;
					address_line_2: string | null;
					appartment: string | null;
					city: string | null;
					country: string;
					created_at: string;
					id: number;
					is_private: boolean;
					postal_code: string | null;
					recipient_id: string;
					updated_at: string;
				};
				Insert: {
					address_line_1: string;
					address_line_2?: string | null;
					appartment?: string | null;
					city?: string | null;
					country?: string;
					created_at?: string;
					id?: number;
					is_private?: boolean;
					postal_code?: string | null;
					recipient_id: string;
					updated_at?: string;
				};
				Update: {
					address_line_1?: string;
					address_line_2?: string | null;
					appartment?: string | null;
					city?: string | null;
					country?: string;
					created_at?: string;
					id?: number;
					is_private?: boolean;
					postal_code?: string | null;
					recipient_id?: string;
					updated_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: "gift_recipient_addresses_recipient_id_fkey";
						columns: ["recipient_id"];
						isOneToOne: false;
						referencedRelation: "gift_recipients";
						referencedColumns: ["id"];
					},
				];
			};
			gift_recipient_contacts: {
				Row: {
					created_at: string;
					email: string | null;
					id: string;
					phone_number: string | null;
					recipient_id: string;
					social_media_handle: string | null;
					social_media_platform: string | null;
				};
				Insert: {
					created_at?: string;
					email?: string | null;
					id?: string;
					phone_number?: string | null;
					recipient_id?: string;
					social_media_handle?: string | null;
					social_media_platform?: string | null;
				};
				Update: {
					created_at?: string;
					email?: string | null;
					id?: string;
					phone_number?: string | null;
					recipient_id?: string;
					social_media_handle?: string | null;
					social_media_platform?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "gift_recipient_contacts_recipient_id_fkey";
						columns: ["recipient_id"];
						isOneToOne: false;
						referencedRelation: "gift_recipients";
						referencedColumns: ["id"];
					},
				];
			};
			gift_recipients: {
				Row: {
					created_at: string;
					id: string;
					knows_address: boolean;
					name: string;
					provided_contact: boolean;
				};
				Insert: {
					created_at?: string;
					id?: string;
					knows_address?: boolean;
					name: string;
					provided_contact?: boolean;
				};
				Update: {
					created_at?: string;
					id?: string;
					knows_address?: boolean;
					name?: string;
					provided_contact?: boolean;
				};
				Relationships: [];
			};
			gifts: {
				Row: {
					created_at: string;
					id: number;
					recipient_id: string;
					sender_id: string;
					status: Database["public"]["Enums"]["gift_status"];
					type: Database["public"]["Enums"]["gift_order_type"];
					updated_at: string;
				};
				Insert: {
					created_at?: string;
					id?: number;
					recipient_id: string;
					sender_id: string;
					status?: Database["public"]["Enums"]["gift_status"];
					type?: Database["public"]["Enums"]["gift_order_type"];
					updated_at?: string;
				};
				Update: {
					created_at?: string;
					id?: number;
					recipient_id?: string;
					sender_id?: string;
					status?: Database["public"]["Enums"]["gift_status"];
					type?: Database["public"]["Enums"]["gift_order_type"];
					updated_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: "gifts_recipient_id_fkey";
						columns: ["recipient_id"];
						isOneToOne: false;
						referencedRelation: "gift_recipients";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "gifts_sender_id_fkey";
						columns: ["sender_id"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					},
				];
			};
			gifts_orders_links: {
				Row: {
					created_at: string;
					gift_order_id: number;
					id: number;
					link: string;
					specs: string;
				};
				Insert: {
					created_at?: string;
					gift_order_id: number;
					id?: number;
					link: string;
					specs: string;
				};
				Update: {
					created_at?: string;
					gift_order_id?: number;
					id?: number;
					link?: string;
					specs?: string;
				};
				Relationships: [
					{
						foreignKeyName: "gifts_orders_links_gift_order_id_fkey";
						columns: ["gift_order_id"];
						isOneToOne: true;
						referencedRelation: "gifts";
						referencedColumns: ["id"];
					},
				];
			};
			gifts_products: {
				Row: {
					created_at: string;
					gift_id: number;
					id: number;
					product_id: string;
					quantity: number;
				};
				Insert: {
					created_at?: string;
					gift_id: number;
					id?: number;
					product_id: string;
					quantity: number;
				};
				Update: {
					created_at?: string;
					gift_id?: number;
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
			number_test: {
				Row: {
					float8: number | null;
					id: number;
					int8: number | null;
					numeric: number | null;
				};
				Insert: {
					float8?: number | null;
					id?: number;
					int8?: number | null;
					numeric?: number | null;
				};
				Update: {
					float8?: number | null;
					id?: number;
					int8?: number | null;
					numeric?: number | null;
				};
				Relationships: [];
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
				Relationships: [];
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
					embedding: string | null;
					id: string;
					image: string | null;
					metadata: Json | null;
					name: string | null;
					type: Database["public"]["Enums"]["product_type"];
				};
				Insert: {
					active?: boolean | null;
					description?: string | null;
					embedding?: string | null;
					id: string;
					image?: string | null;
					metadata?: Json | null;
					name?: string | null;
					type?: Database["public"]["Enums"]["product_type"];
				};
				Update: {
					active?: boolean | null;
					description?: string | null;
					embedding?: string | null;
					id?: string;
					image?: string | null;
					metadata?: Json | null;
					name?: string | null;
					type?: Database["public"]["Enums"]["product_type"];
				};
				Relationships: [];
			};
			role_permissions: {
				Row: {
					id: number;
					permission: Database["public"]["Enums"]["app_permission"];
					role: Database["public"]["Enums"]["app_role"];
				};
				Insert: {
					id?: number;
					permission: Database["public"]["Enums"]["app_permission"];
					role: Database["public"]["Enums"]["app_role"];
				};
				Update: {
					id?: number;
					permission?: Database["public"]["Enums"]["app_permission"];
					role?: Database["public"]["Enums"]["app_role"];
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
			user_roles: {
				Row: {
					id: number;
					role: Database["public"]["Enums"]["app_role"];
					user_id: string;
				};
				Insert: {
					id?: number;
					role: Database["public"]["Enums"]["app_role"];
					user_id: string;
				};
				Update: {
					id?: number;
					role?: Database["public"]["Enums"]["app_role"];
					user_id?: string;
				};
				Relationships: [];
			};
			users: {
				Row: {
					avatar_url: string | null;
					billing_address: Json | null;
					city: string | null;
					country: string | null;
					email: string | null;
					full_name: string | null;
					gender: Database["public"]["Enums"]["gender"] | null;
					id: string;
					payment_method: Json | null;
					relationship_status:
						| Database["public"]["Enums"]["marital_status"]
						| null;
					state: string | null;
					zip_code: number | null;
				};
				Insert: {
					avatar_url?: string | null;
					billing_address?: Json | null;
					city?: string | null;
					country?: string | null;
					email?: string | null;
					full_name?: string | null;
					gender?: Database["public"]["Enums"]["gender"] | null;
					id: string;
					payment_method?: Json | null;
					relationship_status?:
						| Database["public"]["Enums"]["marital_status"]
						| null;
					state?: string | null;
					zip_code?: number | null;
				};
				Update: {
					avatar_url?: string | null;
					billing_address?: Json | null;
					city?: string | null;
					country?: string | null;
					email?: string | null;
					full_name?: string | null;
					gender?: Database["public"]["Enums"]["gender"] | null;
					id?: string;
					payment_method?: Json | null;
					relationship_status?:
						| Database["public"]["Enums"]["marital_status"]
						| null;
					state?: string | null;
					zip_code?: number | null;
				};
				Relationships: [
					{
						foreignKeyName: "users_id_fkey";
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
				];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			authorize: {
				Args: {
					requested_permission: Database["public"]["Enums"]["app_permission"];
				};
				Returns: boolean;
			};
			custom_access_token_hook: {
				Args: {
					event: Json;
				};
				Returns: Json;
			};
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
			search_gifts: {
				Args: {
					query_embedding: string;
					similarity_threshold: number;
					match_count: number;
				};
				Returns: {
					id: string;
					name: string;
					description: string;
					image: string;
					similarity: number;
					unit_amount: number;
				}[];
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
			app_permission: "gifts.delete" | "gifts.edit";
			app_role: "admin";
			gender: "female" | "male" | "other";
			gift_order_type: "link" | "custom" | "store";
			gift_payment_status: "pending" | "paid" | "failed";
			gift_status:
				| "awaiting_recipient_confirmation"
				| "awaiting_invoice_payment"
				| "preparing_gift"
				| "shipped"
				| "delivered"
				| "cancelled";
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
};

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
