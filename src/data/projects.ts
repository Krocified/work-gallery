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
        url: 'https://images.unsplash.com/photo-1547996160-81dfa63595dd?q=80&w=1974&auto=format&fit=crop',
        aspectRatio: 'portrait',
    },
    {
        id: 'f2',
        title: 'Modern Interior Design',
        category: 'featured',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop',
        aspectRatio: 'landscape',
    },
    {
        id: 'f3',
        title: 'Cosmetic Branding',
        category: 'featured',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1596462502278-27bfaf41099b?q=80&w=2080&auto=format&fit=crop',
        aspectRatio: 'square',
    },
    {
        id: 'f4',
        title: 'Minimalist Poster',
        category: 'featured',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1964&auto=format&fit=crop',
        aspectRatio: 'portrait',
    },
    {
        id: 'f5',
        title: 'Urban Architecture',
        category: 'featured',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
        aspectRatio: 'landscape',
    },
    {
        id: 'f6',
        title: 'Abstract Concept',
        category: 'featured',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop',
        aspectRatio: 'portrait',
    },
];

export const allCategories: Category[] = [
    {
        id: 'social-media',
        name: 'Social Media Feed',
        description: 'High-engagement social layouts and creative feeds.',
        brands: ['Nike', 'Coca Cola', 'Apple'],
        coverImage: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1974&auto=format&fit=crop'
    },
    {
        id: 'banners',
        name: 'Banners',
        description: 'Impactful digital and print banner designs.',
        brands: ['Samsung', 'Spotify'],
        coverImage: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?q=80&w=2071&auto=format&fit=crop'
    },
    {
        id: 'reels',
        name: 'Reels Video',
        description: 'Dynamic short-form video content.',
        brands: ['Red Bull', 'GoPro'],
        coverImage: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop'
    },
    {
        id: 'motion-graphics',
        name: 'Motion Graphics',
        description: 'Fluid animations and motion storytelling.',
        brands: ['Netflix', 'Airbnb'],
        coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop'
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
            url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop',
            aspectRatio: 'square',
        },
        {
            id: 'sm2b',
            title: 'Air Max Campaign',
            brand: 'Nike',
            category: 'social-media',
            type: 'image',
            url: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1925&auto=format&fit=crop',
            aspectRatio: 'square',
        },
        {
            id: 'sm2c',
            title: 'Nike Run Club',
            brand: 'Nike',
            category: 'social-media',
            type: 'image',
            url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop',
            aspectRatio: 'portrait',
        },
        {
            id: 'sm2d',
            title: 'Global Athletes',
            brand: 'Nike',
            category: 'social-media',
            type: 'image',
            url: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=2070&auto=format&fit=crop',
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
            url: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?q=80&w=1965&auto=format&fit=crop',
            aspectRatio: 'square',
        },
        {
            id: 'sm1b',
            title: 'Classic Red',
            brand: 'Coca Cola',
            category: 'social-media',
            type: 'image',
            url: 'https://images.unsplash.com/photo-1574510167683-10e6a8d3886f?q=80&w=2070&auto=format&fit=crop',
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
            url: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba3f21?q=80&w=2070&auto=format&fit=crop',
            aspectRatio: 'portrait',
        },
    ],
    'Samsung': [],
    'Spotify': [],
    'Red Bull': [
        {
            id: 'rb1',
            title: 'Extreme Motivation',
            brand: 'Red Bull',
            category: 'reels',
            type: 'image',
            url: 'https://images.unsplash.com/photo-1533107862482-0e6974b06bec?q=80&w=2070&auto=format&fit=crop',
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
            url: 'https://images.unsplash.com/photo-1502759683299-cdcd6974244f?q=80&w=2070&auto=format&fit=crop',
            aspectRatio: 'landscape',
        },
    ],
    'Netflix': [],
    'Airbnb': [],
};
