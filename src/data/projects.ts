import imagesData from '../assets/images.json';

type AspectRatio = 'square' | 'portrait' | 'landscape';

interface ImageItem {
    file?: string;
    files?: string[];
    title: string;
    aspectRatio?: AspectRatio;
}

type ImagesData = Record<string, ImageItem[] | string[]>;

const typedImagesData = imagesData as unknown as ImagesData;

export interface Project {
    id: string;
    title: string;
    category: 'social-media' | 'reels' | 'featured';
    brand: string;
    type: 'image' | 'video' | 'carousel';
    url: string; // Used for thumbnails and single files
    urls?: string[]; // Used for carousels
    aspectRatio: AspectRatio;
}

export interface Category {
    id: string;
    name: string;
    description: string;
    brands: string[];
    coverImage: string;
}

const BUCKET_NAME = import.meta.env.VITE_AWS_BUCKET_NAME || 'work-gallery';

const processedProjects: Project[] = [];
const brandsWithImages = new Set<string>();
const brandsWithVideos = new Set<string>();

Object.entries(typedImagesData).forEach(([brandKey, items]) => {
    if (brandKey === 'featured') return;

    (items as ImageItem[]).forEach((item, index) => {
        const { file: filename, files, title } = item;
        const isCarousel = Array.isArray(files);
        const isVideo = !isCarousel && filename?.toLowerCase().endsWith('.mp4');
        const category = isVideo ? 'reels' : 'social-media';

        if (isVideo) {
            brandsWithVideos.add(brandKey);
        } else {
            brandsWithImages.add(brandKey);
        }

        if (isCarousel) {
            processedProjects.push({
                id: `${brandKey}-${index}`,
                title: title,
                brand: brandKey,
                category: category,
                type: 'carousel',
                url: `s3://${BUCKET_NAME}/${brandKey}/${files[0]}`,
                urls: files.map((f: string) => `s3://${BUCKET_NAME}/${brandKey}/${f}`),
                aspectRatio: item.aspectRatio || 'square',
            });
        } else {
            processedProjects.push({
                id: `${brandKey}-${index}`,
                title: title,
                brand: brandKey,
                category: category,
                type: isVideo ? 'video' : 'image',
                url: `s3://${BUCKET_NAME}/${brandKey}/${filename}`,
                aspectRatio: isVideo ? 'portrait' : 'square',
            });
        }
    });
});

const featuredFilenames = Array.isArray(typedImagesData.featured)
    ? typedImagesData.featured.filter((filename): filename is string => typeof filename === 'string')
    : [];

const configuredFeaturedWorks = featuredFilenames.map((featuredFile: string) => {
    return processedProjects.find(p => {
        // Check if the original filename is in the URL or URLs
        const s3Prefix = `s3://${BUCKET_NAME}/${p.brand}/`;
        if (p.type === 'carousel') {
            return p.urls?.some(url => url === `${s3Prefix}${featuredFile}`);
        }
        return p.url === `${s3Prefix}${featuredFile}`;
    });
}).filter((project): project is Project => project !== undefined && project.type !== 'video');

const featuredIds = new Set(configuredFeaturedWorks.map((project) => project.id));
const additionalFeaturedWorks = processedProjects
    .filter((project) => project.type !== 'video' && !featuredIds.has(project.id))
    .sort(() => Math.random() - 0.5)
    .slice(0, 12 - configuredFeaturedWorks.length);

export const featuredWorks: Project[] = [...configuredFeaturedWorks, ...additionalFeaturedWorks].slice(0, 12);

export const allCategories: Category[] = [
    {
        id: 'social-media',
        name: 'Social Media Feed',
        description: 'High-engagement social layouts and creative feeds.',
        brands: Array.from(brandsWithImages),
        coverImage: 'https://images.unsplash.com/photo-1724862936518-ae7fcfc052c1?q=80&w=2000&auto=format&fit=crop'
    },
    {
        id: 'reels',
        name: 'Reels Video',
        description: 'Dynamic short-form video content.',
        brands: Array.from(brandsWithVideos),
        coverImage: 'https://images.unsplash.com/photo-1662479696175-6ca3b10830a6?q=80&w=2000&auto=format&fit=crop'
    },
];

export const projectsByBrand: Record<string, Project[]> = processedProjects.reduce((acc, project) => {
    if (!acc[project.brand]) {
        acc[project.brand] = [];
    }
    acc[project.brand].push(project);
    return acc;
}, {} as Record<string, Project[]>);
