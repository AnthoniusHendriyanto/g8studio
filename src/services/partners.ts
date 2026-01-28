
import { supabase } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';

export interface Partner {
    id: string;
    name: string;
    logo_url: string;
    display_order: number;
    created_at: string;
}

export const partnerService = {
    // Fetch all partners ordered by display_order
    async fetchPartners() {
        const { data, error } = await supabase
            .from('partners')
            .select('*')
            .order('display_order', { ascending: true });

        if (error) throw error;
        return data as Partner[];
    },

    // Create a new partner with logo upload
    async createPartner(name: string, logoFile: File) {
        // 1. Validate file
        if (logoFile.size > 2 * 1024 * 1024) {
            throw new Error('File size too large (max 2MB)');
        }
        if (!logoFile.type.startsWith('image/')) {
            throw new Error('Invalid file type. Only images allowed.');
        }

        // 2. Upload logo to Storage
        const fileExt = logoFile.name.split('.').pop();
        const fileName = `${uuidv4()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('partner-logos')
            .upload(filePath, logoFile);

        if (uploadError) throw uploadError;

        // 3. Get Public URL
        const { data: { publicUrl } } = supabase.storage
            .from('partner-logos')
            .getPublicUrl(filePath);

        // 4. Insert into Database
        const { data, error: insertError } = await supabase
            .from('partners')
            .insert([{ name, logo_url: publicUrl }])
            .select()
            .single();

        if (insertError) {
            // Cleanup: delete uploaded file if DB insert fails
            await supabase.storage.from('partner-logos').remove([filePath]);
            throw insertError;
        }

        return data as Partner;
    },

    // Delete a partner
    async deletePartner(id: string, logoUrl: string) {
        // 1. Delete from Database
        const { error: deleteError } = await supabase
            .from('partners')
            .delete()
            .eq('id', id);

        if (deleteError) throw deleteError;

        // 2. Extract filename from URL and delete from Storage
        // URL format: .../partner-logos/filename.ext
        const fileName = logoUrl.split('/').pop();
        if (fileName) {
            const { error: storageError } = await supabase.storage
                .from('partner-logos')
                .remove([fileName]);

            if (storageError) console.error('Failed to cleanup file:', storageError);
        }
    }
};
