import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
    region: import.meta.env.VITE_AWS_REGION,
    credentials: {
        accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
        secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
    },
});

/**
 * Parses an S3 URI (s3://bucket-name/key) or handles a raw key.
 * Returns the bucket name and the object key.
 */
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

/**
 * Asynchronously generates a signed URL for an S3 object.
 */
export const getAssetUrl = async (uri: string): Promise<string> => {
    if (!uri) return '';
    if (uri.startsWith('http')) return uri;

    const { bucket, key } = parseS3Uri(uri);

    if (!bucket || !key) {
        console.warn(`Invalid S3 URI or missing bucket name in .env for: ${uri}`);
        return uri;
    }

    try {
        const command = new GetObjectCommand({
            Bucket: bucket,
            Key: key,
        });

        // Generate a signed URL that expires in 1 hour
        return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    } catch (error) {
        console.error('Error generating signed URL:', error);
        return uri;
    }
};
