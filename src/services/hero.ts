import { supabase } from '@/lib/supabase';

export interface HeroSlide {
    id: string;
    image_url: string;
    title: string | null;
    subtitle: string | null;
    order_index: number;
    use_random: boolean;
    is_global_text: boolean;
    created_at: string;
}

export interface CreateHeroSlideInput {
    image_url: string;
    title?: string;
    subtitle?: string;
    order_index?: number;
    use_random?: boolean;
    is_global_text?: boolean;
}

export const heroService = {
    /**
     * Fetch all hero slides, sorted by order_index
     */
    async fetchSlides(): Promise<HeroSlide[]> {
        const { data, error } = await supabase
            .from('hero_slides')
            .select('*')
            .order('order_index', { ascending: true });

        if (error) throw error;
        return data || [];
    },

    /**
     * Create a new hero slide
     */
    async createSlide(input: CreateHeroSlideInput): Promise<HeroSlide> {
        const { data, error } = await supabase
            .from('hero_slides')
            .insert([input])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    /**
     * Update an existing hero slide
     */
    async updateSlide(id: string, updates: Partial<CreateHeroSlideInput>): Promise<HeroSlide> {
        const { data, error } = await supabase
            .from('hero_slides')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    /**
     * Delete a hero slide
     */
    async deleteSlide(id: string): Promise<void> {
        const { error } = await supabase
            .from('hero_slides')
            .delete()
            .eq('id', id);

        if (error) throw error;
    },

    /**
     * Upload a hero image to storage
     */
    async uploadImage(file: File): Promise<string> {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('hero-images')
            .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
            .from('hero-images')
            .getPublicUrl(filePath);

        return data.publicUrl;
    },

    /**
     * Delete an image from storage
     */
    async deleteImage(imageUrl: string): Promise<void> {
        const path = imageUrl.split('/hero-images/').pop();
        if (!path) return;

        const { error } = await supabase.storage
            .from('hero-images')
            .remove([path]);

        if (error) throw error;
    },
};
