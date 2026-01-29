import { supabase } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';

export interface PortfolioItem {
    id: string;
    title: string;
    category: string;
    year: string;
    description: string;
    location?: string;
    client?: string;
    status?: string;
    images: string[]; // Array of image URLs
    created_at: string;
}

export const portfolioService = {
    // Fetch all portfolio items
    async fetchProjects() {
        const { data, error } = await supabase
            .from('portfolio_items')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data as PortfolioItem[];
    },

    // Create a new portfolio item with multiple images
    async createProject(
        title: string,
        category: string,
        year: string,
        description: string,
        location: string,
        client: string,
        status: string,
        imageFiles: File[]
    ) {
        // 1. Validate files
        for (const file of imageFiles) {
            if (file.size > 5 * 1024 * 1024) {
                throw new Error(`File ${file.name} is too large (max 5MB)`);
            }
            if (!file.type.startsWith('image/')) {
                throw new Error(`File ${file.name} is not an image`);
            }
        }

        // 2. Upload all images to Storage
        const imageUrls: string[] = [];

        for (const file of imageFiles) {
            const fileExt = file.name.split('.').pop();
            const fileName = `${uuidv4()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('portfolio-images')
                .upload(filePath, file);

            if (uploadError) {
                // Cleanup: delete already uploaded files
                for (const url of imageUrls) {
                    const uploadedFileName = url.split('/').pop();
                    if (uploadedFileName) {
                        await supabase.storage.from('portfolio-images').remove([uploadedFileName]);
                    }
                }
                throw uploadError;
            }

            // Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('portfolio-images')
                .getPublicUrl(filePath);

            imageUrls.push(publicUrl);
        }

        // 3. Insert into Database
        const { data, error: insertError } = await supabase
            .from('portfolio_items')
            .insert([{
                title,
                category,
                year,
                description,
                location,
                client,
                status,
                images: imageUrls
            }])
            .select()
            .single();

        if (insertError) {
            // Cleanup: delete uploaded files if DB insert fails
            for (const url of imageUrls) {
                const fileName = url.split('/').pop();
                if (fileName) {
                    await supabase.storage.from('portfolio-images').remove([fileName]);
                }
            }
            throw insertError;
        }

        return data as PortfolioItem;
    },

    // Update a portfolio item
    async updateProject(id: string, updates: Partial<PortfolioItem>) {
        const { data, error } = await supabase
            .from('portfolio_items')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data as PortfolioItem;
    },

    // Delete a portfolio item
    async deleteProject(id: string, imageUrls: string[]) {
        // 1. Delete from Database
        const { error: deleteError } = await supabase
            .from('portfolio_items')
            .delete()
            .eq('id', id);

        if (deleteError) throw deleteError;

        // 2. Delete all images from Storage
        const fileNames = imageUrls.map(url => url.split('/').pop()).filter(Boolean) as string[];

        if (fileNames.length > 0) {
            const { error: storageError } = await supabase.storage
                .from('portfolio-images')
                .remove(fileNames);

            if (storageError) console.error('Failed to cleanup files:', storageError);
        }
    }
};
