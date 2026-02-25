export interface Project {
    id: string;
    title: string;
    category: 'social-media' | 'banners' | 'reels' | 'motion-graphics' | 'featured';
    brand?: string;
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

export const featuredWorks: Project[] = [
    {
        id: 'f1',
        title: 'Luxury Watch Ad',
        category: 'featured',
        type: 'image',
        url: 's3://work-gallery/featured/watch-ad.jpg',
        aspectRatio: 'portrait',
    },
    {
        id: 'f2',
        title: 'Modern Interior Design',
        category: 'featured',
        type: 'image',
        url: 's3://work-gallery/featured/interior.jpg',
        aspectRatio: 'landscape',
    },
    {
        id: 'f3',
        title: 'Cosmetic Branding',
        category: 'featured',
        type: 'image',
        url: 's3://work-gallery/featured/cosmetic.jpg',
        aspectRatio: 'square',
    },
    {
        id: 'f4',
        title: 'Minimalist Poster',
        category: 'featured',
        type: 'image',
        url: 's3://work-gallery/featured/poster.jpg',
        aspectRatio: 'portrait',
    },
    {
        id: 'f5',
        title: 'Urban Architecture',
        category: 'featured',
        type: 'image',
        url: 's3://work-gallery/featured/architecture.jpg',
        aspectRatio: 'landscape',
    },
    {
        id: 'f6',
        title: 'Abstract Concept',
        category: 'featured',
        type: 'image',
        url: 's3://work-gallery/featured/abstract.jpg',
        aspectRatio: 'portrait',
    },
];

export const allCategories: Category[] = [
    {
        id: 'social-media',
        name: 'Social Media Feed',
        description: 'High-engagement social layouts and creative feeds.',
        brands: ['Nike', 'Coca Cola', 'Apple'],
        coverImage: 's3://work-gallery/categories/social-media.jpg'
    },
    {
        id: 'banners',
        name: 'Banners',
        description: 'Impactful digital and print banner designs.',
        brands: ['Samsung', 'Spotify'],
        coverImage: 's3://work-gallery/categories/banners.jpg'
    },
    {
        id: 'reels',
        name: 'Reels Video',
        description: 'Dynamic short-form video content.',
        brands: ['Red Bull', 'GoPro'],
        coverImage: 's3://work-gallery/categories/reels.jpg'
    },
    {
        id: 'motion-graphics',
        name: 'Motion Graphics',
        description: 'Fluid animations and motion storytelling.',
        brands: ['Netflix', 'Airbnb'],
        coverImage: 's3://work-gallery/categories/motion-graphics.jpg'
    },
];

export const projectsByBrand: Record<string, Project[]> = {
    'Nike': [
        {
            id: 'sm2',
            title: 'Just Do It Feed',
            brand: 'Nike',
            category: 'social-media',
            type: 'image',
            url: 's3://work-gallery/brands/nike/feed.jpg',
            aspectRatio: 'square',
        },
        {
            id: 'sm2b',
            title: 'Air Max Campaign',
            brand: 'Nike',
            category: 'social-media',
            type: 'image',
            url: 's3://work-gallery/brands/nike/air-max.jpg',
            aspectRatio: 'square',
        },
        {
            id: 'sm2c',
            title: 'Nike Run Club',
            brand: 'Nike',
            category: 'social-media',
            type: 'image',
            url: 's3://work-gallery/brands/nike/run-club.jpg',
            aspectRatio: 'portrait',
        },
        {
            id: 'sm2d',
            title: 'Global Athletes',
            brand: 'Nike',
            category: 'social-media',
            type: 'image',
            url: 's3://work-gallery/brands/nike/athletes.jpg',
            aspectRatio: 'landscape',
        },
    ],
    'Coca Cola': [
        {
            id: 'sm1',
            title: 'Summer Refreshment',
            brand: 'Coca Cola',
            category: 'social-media',
            type: 'image',
            url: 's3://work-gallery/brands/coca-cola/summer.jpg',
            aspectRatio: 'square',
        },
        {
            id: 'sm1b',
            title: 'Classic Red',
            brand: 'Coca Cola',
            category: 'social-media',
            type: 'image',
            url: 's3://work-gallery/brands/coca-cola/classic.jpg',
            aspectRatio: 'landscape',
        },
    ],
    'Apple': [
        {
            id: 'ap1',
            title: 'iPhone 16 Launch',
            brand: 'Apple',
            category: 'social-media',
            type: 'image',
            url: 's3://work-gallery/brands/apple/iphone-16.jpg',
            aspectRatio: 'portrait',
        },
    ],
    'Red Bull': [
        {
            id: 'rb1',
            title: 'Extreme Motivation',
            brand: 'Red Bull',
            category: 'reels',
            type: 'image',
            url: 's3://work-gallery/brands/red-bull/motivation.jpg',
            aspectRatio: 'portrait',
        },
    ],
    'GoPro': [
        {
            id: 'gp1',
            title: 'Adventure Awaits',
            brand: 'GoPro',
            category: 'reels',
            type: 'image',
            url: 's3://work-gallery/brands/gopro/adventure.jpg',
            aspectRatio: 'landscape',
        },
    ],
    'Samsung': [],
    'Spotify': [],
    'Netflix': [],
    'Airbnb': [],
};
