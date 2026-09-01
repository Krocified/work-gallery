const assetUrlCache = new Map<string, string>();

const parseS3Uri = (uri: string) => {
    if (uri.startsWith('s3://')) {
        const parts = uri.replace('s3://', '').split('/');
        const bucket = parts[0];
        const key = parts.slice(1).join('/');
        return { bucket, key };
    }
    return {
        bucket: import.meta.env.VITE_AWS_BUCKET_NAME,
        key: uri
    };
};

export const getAssetUrl = async (uri: string): Promise<string> => {
    if (!uri) return '';
    if (uri.startsWith('http')) return uri;
    const cachedUrl = assetUrlCache.get(uri);
    if (cachedUrl) return cachedUrl;

    const { bucket, key } = parseS3Uri(uri);
    const encodedKey = key.split('/').map(encodeURIComponent).join('/');

    const cdnUrl = import.meta.env.VITE_CDN_URL;
    if (cdnUrl) {
        // Use CDN if available for instant loading
        let baseUrl = cdnUrl.endsWith('/') ? cdnUrl.slice(0, -1) : cdnUrl;
        if (!baseUrl.startsWith('http')) {
            baseUrl = `https://${baseUrl}`;
        }
        const resolvedUrl = `${baseUrl}/${encodedKey}`;
        assetUrlCache.set(uri, resolvedUrl);
        return resolvedUrl;
    }

    const region = import.meta.env.VITE_AWS_REGION;
    if (!bucket || !key || !region) {
        console.warn(`Invalid asset URI or missing public asset configuration for: ${uri}`);
        return uri;
    }

    const resolvedUrl = `https://${bucket}.s3.${region}.amazonaws.com/${encodedKey}`;
    assetUrlCache.set(uri, resolvedUrl);
    return resolvedUrl;
};
