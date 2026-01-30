import emailjs from '@emailjs/browser';

interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    message: string;
}

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export const sendContactEmail = async (formData: ContactFormData): Promise<void> => {
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
        throw new Error('EmailJS configuration is missing. Please check your environment variables.');
    }

    try {
        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            phone: formData.phone,
            message: formData.message,
            to_email: 'anthonlotus9@gmail.com',
        };

        await emailjs.send(
            SERVICE_ID,
            TEMPLATE_ID,
            templateParams,
            PUBLIC_KEY
        );
    } catch (error) {
        console.error('Failed to send email:', error);
        throw new Error('Failed to send message. Please try again later.');
    }
};
