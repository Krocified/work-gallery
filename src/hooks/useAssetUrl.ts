import { useState, useEffect } from 'react';
import { getAssetUrl } from '../utils/assets';

/**
 * Hook to resolve an asset key or S3 URI to a usable URL.
 * Handles the asynchronous nature of signed URL generation.
 */
export const useAssetUrl = (key: string | undefined) => {
    const [url, setUrl] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        let isMounted = true;

        if (!key) {
            setLoading(false);
            return;
        }

        const fetchUrl = async () => {
            setLoading(true);
            try {
                const resolvedUrl = await getAssetUrl(key);
                if (isMounted) {
                    setUrl(resolvedUrl);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Failed to resolve asset URL:', error);
                if (isMounted) setLoading(false);
            }
        };

        fetchUrl();

        return () => {
            isMounted = false;
        };
    }, [key]);

    return { url, loading };
};
