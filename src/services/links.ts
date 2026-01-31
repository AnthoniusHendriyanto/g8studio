import { supabase } from '@/lib/supabase';

export interface QuickLink {
    id: string;
    title: string;
    url: string;
    icon_name: string;
    color: string;
    order_index: number;
    is_active: boolean;
    created_at: string;
}

export interface CreateQuickLinkInput {
    title: string;
    url: string;
    icon_name: string;
    color: string;
    order_index?: number;
    is_active?: boolean;
}

export const linkService = {
    /**
     * Fetch all active quick links, sorted by order_index
     */
    async fetchActiveLinks(): Promise<QuickLink[]> {
        const { data, error } = await supabase
            .from('quick_links')
            .select('*')
            .eq('is_active', true)
            .order('order_index', { ascending: true });

        if (error) throw error;
        return data || [];
    },

    /**
     * Fetch all quick links (admin view)
     */
    async fetchAllLinks(): Promise<QuickLink[]> {
        const { data, error } = await supabase
            .from('quick_links')
            .select('*')
            .order('order_index', { ascending: true });

        if (error) throw error;
        return data || [];
    },

    /**
     * Create a new quick link
     */
    async createLink(input: CreateQuickLinkInput): Promise<QuickLink> {
        const { data, error } = await supabase
            .from('quick_links')
            .insert([input])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    /**
     * Update an existing quick link
     */
    async updateLink(id: string, updates: Partial<CreateQuickLinkInput>): Promise<QuickLink> {
        const { data, error } = await supabase
            .from('quick_links')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    /**
     * Delete a quick link
     */
    async deleteLink(id: string): Promise<void> {
        const { error } = await supabase
            .from('quick_links')
            .delete()
            .eq('id', id);

        if (error) throw error;
    },

    /**
     * Toggle link active status
     */
    async toggleActive(id: string, isActive: boolean): Promise<QuickLink> {
        return this.updateLink(id, { is_active: isActive });
    },
};
