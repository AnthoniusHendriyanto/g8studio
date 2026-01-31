import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Google Analytics Configuration
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || '';

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
        dataLayer?: unknown[];
    }
}

const Analytics = () => {
    const location = useLocation();

    useEffect(() => {
        // Only initialize if GA_MEASUREMENT_ID is provided
        if (!GA_MEASUREMENT_ID) {
            console.warn('Google Analytics Measurement ID not found. Please add VITE_GA_MEASUREMENT_ID to your .env file.');
            return;
        }

        // Load Google Analytics script
        const script1 = document.createElement('script');
        script1.async = true;
        script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
        document.head.appendChild(script1);

        // Initialize dataLayer
        window.dataLayer = window.dataLayer || [];
        window.gtag = function gtag(...args: unknown[]) {
            window.dataLayer?.push(args);
        };
        window.gtag('js', new Date());
        window.gtag('config', GA_MEASUREMENT_ID);

        return () => {
            // Cleanup on unmount
            document.head.removeChild(script1);
        };
    }, []);

    // Track page views on route change
    useEffect(() => {
        if (window.gtag && GA_MEASUREMENT_ID) {
            window.gtag('config', GA_MEASUREMENT_ID, {
                page_path: location.pathname + location.search,
            });
        }
    }, [location]);

    return null;
};

export default Analytics;
