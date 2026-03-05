import imagesData from '../assets/images.json';

export interface Project {
    id: string;
    title: string;
    category: 'social-media' | 'reels' | 'featured';
    brand: string;
    type: 'image' | 'video';
    url: string;
    aspectRatio: 'square' | 'portrait' | 'landscape';
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

Object.entries(imagesData).forEach(([brandKey, items]) => {
    (items as { file: string; title: string }[]).forEach((item, index) => {
        const { file: filename, title } = item;
        const isVideo = filename.toLowerCase().endsWith('.mp4');
        const category = isVideo ? 'reels' : 'social-media';

        if (isVideo) {
            brandsWithVideos.add(brandKey);
        } else {
            brandsWithImages.add(brandKey);
        }

        processedProjects.push({
            id: `${brandKey}-${index}`,
            title: title,
            brand: brandKey,
            category: category,
            type: isVideo ? 'video' : 'image',
            url: `s3://${BUCKET_NAME}/${brandKey}/${filename}`,
            aspectRatio: isVideo ? 'portrait' : 'square',
        });
    });
});

export const featuredWorks: Project[] = processedProjects.slice(1, 7);

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
