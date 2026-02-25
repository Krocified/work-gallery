// ────────────────────────────────────────────────────────────────
//  Shared data model for the portfolio
// ────────────────────────────────────────────────────────────────

export interface WorkItem {
    id: string;
    src: string;          // image or video URL
    type: 'image' | 'video';
    alt: string;
    aspectRatio?: '1/1' | '4/3' | '16/9' | '3/4' | '9/16';
}

export interface Brand {
    id: string;
    name: string;
    thumbnail: string;    // card preview image
    works: WorkItem[];
}

export interface Category {
    id: string;
    name: string;
    description: string;
    coverImage: string;
    brands: Brand[];
}

// ────────────────────────────────────────────────────────────────
//  Featured Works — 6 hero showcase pieces
//  Mix of landscape and portrait to drive the dynamic layout
// ────────────────────────────────────────────────────────────────
export const featuredWorks: WorkItem[] = [
    {
        id: 'fw1', type: 'image', aspectRatio: '16/9',
        src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1400&q=80',
        alt: 'Brand Reawakening — Abstract gradient campaign',
    },
    {
        id: 'fw2', type: 'image', aspectRatio: '3/4',
        src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80',
        alt: 'Portrait series — editorial fashion',
    },
    {
        id: 'fw3', type: 'image', aspectRatio: '4/3',
        src: 'https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=1000&q=80',
        alt: 'Soft Architecture — minimalist interior',
    },
    {
        id: 'fw4', type: 'image', aspectRatio: '3/4',
        src: 'https://images.unsplash.com/photo-1565791380713-1756b9a05343?w=800&q=80',
        alt: 'Still Life — product photography',
    },
    {
        id: 'fw5', type: 'image', aspectRatio: '4/3',
        src: 'https://images.unsplash.com/photo-1492567291473-fe3dfc175b45?w=1200&q=80',
        alt: 'The Conference — event identity',
    },
    {
        id: 'fw6', type: 'image', aspectRatio: '1/1',
        src: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=900&q=80',
        alt: 'Parallels — colour study campaign',
    },
];

// ────────────────────────────────────────────────────────────────
//  Categories with brand sub-pages
// ────────────────────────────────────────────────────────────────
export const categories: Category[] = [
    {
        id: 'social-media',
        name: 'Social Media Feed',
        description: 'Curated visual content optimised for engagement across platforms.',
        coverImage: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?w=1600&q=80',
        brands: [
            {
                id: 'lumiere',
                name: 'Lumière Beauty',
                thumbnail: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80',
                works: [
                    { id: 'lb1', type: 'image', src: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80', alt: 'Birthday glow campaign', aspectRatio: '1/1' },
                    { id: 'lb2', type: 'image', src: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80', alt: 'Perfume close-up', aspectRatio: '1/1' },
                    { id: 'lb3', type: 'image', src: 'https://images.unsplash.com/photo-1503236823255-94609f598e71?w=800&q=80', alt: 'Skincare flatlays', aspectRatio: '4/3' },
                    { id: 'lb4', type: 'image', src: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&q=80', alt: 'Colour palette post', aspectRatio: '1/1' },
                    { id: 'lb5', type: 'image', src: 'https://images.unsplash.com/photo-1514315384763-ba401779410f?w=800&q=80', alt: 'Mirror selfie shoot', aspectRatio: '3/4' },
                    { id: 'lb6', type: 'image', src: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&q=80', alt: 'Cream texture #1', aspectRatio: '1/1' },
                ],
            },
            {
                id: 'arthouse',
                name: 'Arthouse Studio',
                thumbnail: 'https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=600&q=80',
                works: [
                    { id: 'as1', type: 'image', src: 'https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=800&q=80', alt: 'Brand post', aspectRatio: '1/1' },
                    { id: 'as2', type: 'image', src: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&q=80', alt: 'Typography post', aspectRatio: '1/1' },
                    { id: 'as3', type: 'image', src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', alt: 'Pattern grid', aspectRatio: '4/3' },
                    { id: 'as4', type: 'image', src: 'https://images.unsplash.com/photo-1509909756405-be0199881695?w=800&q=80', alt: 'Digital art reel cover', aspectRatio: '1/1' },
                ],
            },
            {
                id: 'terroir',
                name: 'Terroir Foods',
                thumbnail: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80',
                works: [
                    { id: 'tf1', type: 'image', src: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80', alt: 'Seasonal menu', aspectRatio: '4/3' },
                    { id: 'tf2', type: 'image', src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80', alt: 'Food flatlay', aspectRatio: '1/1' },
                    { id: 'tf3', type: 'image', src: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80', alt: 'Pancake stack hero', aspectRatio: '4/3' },
                    { id: 'tf4', type: 'image', src: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800&q=80', alt: 'Avocado toast', aspectRatio: '1/1' },
                ],
            },
        ],
    },
    {
        id: 'banners',
        name: 'Banners',
        description: 'High-impact display creative for digital and print campaigns.',
        coverImage: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?w=1600&q=80',
        brands: [
            {
                id: 'meridian',
                name: 'Meridian Finance',
                thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
                works: [
                    { id: 'mf1', type: 'image', src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80', alt: 'Leaderboard banner', aspectRatio: '16/9' },
                    { id: 'mf2', type: 'image', src: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80', alt: 'MPU banner', aspectRatio: '1/1' },
                    { id: 'mf3', type: 'image', src: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=600&q=80', alt: 'Skyscraper banner', aspectRatio: '9/16' },
                ],
            },
            {
                id: 'nova',
                name: 'Nova Apparel',
                thumbnail: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&q=80',
                works: [
                    { id: 'na1', type: 'image', src: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1200&q=80', alt: 'Sales banner wide', aspectRatio: '16/9' },
                    { id: 'na2', type: 'image', src: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80', alt: 'Launch banner square', aspectRatio: '1/1' },
                    { id: 'na3', type: 'image', src: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=80', alt: 'Season end clearance', aspectRatio: '4/3' },
                    { id: 'na4', type: 'image', src: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80', alt: 'Story banner', aspectRatio: '9/16' },
                ],
            },
        ],
    },
    {
        id: 'reels',
        name: 'Reels Video',
        description: 'Vertical short-form video content crafted for maximum retention.',
        coverImage: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1600&q=80',
        brands: [
            {
                id: 'pulse',
                name: 'Pulse Fitness',
                thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
                works: [
                    { id: 'pf1', type: 'image', src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80', alt: 'Workout reel thumbnail', aspectRatio: '9/16' },
                    { id: 'pf2', type: 'image', src: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80', alt: 'Gym equipment reel', aspectRatio: '9/16' },
                    { id: 'pf3', type: 'image', src: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=800&q=80', alt: 'Running motivation', aspectRatio: '9/16' },
                    { id: 'pf4', type: 'image', src: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&q=80', alt: 'Outdoor workout', aspectRatio: '9/16' },
                ],
            },
            {
                id: 'deco',
                name: 'Décor & Home',
                thumbnail: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
                works: [
                    { id: 'dh1', type: 'image', src: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', alt: 'Living room reveal reel', aspectRatio: '9/16' },
                    { id: 'dh2', type: 'image', src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80', alt: 'Before & after', aspectRatio: '9/16' },
                    { id: 'dh3', type: 'image', src: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&q=80', alt: 'Furniture close-up', aspectRatio: '9/16' },
                ],
            },
        ],
    },
    {
        id: 'motion',
        name: 'Motion Graphics',
        description: 'Animated design work — from refined transitions to full broadcast graphics.',
        coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1600&q=80',
        brands: [
            {
                id: 'vertex',
                name: 'Vertex Tech',
                thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80',
                works: [
                    { id: 'vt1', type: 'image', src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80', alt: 'Product launch animation frame', aspectRatio: '16/9' },
                    { id: 'vt2', type: 'image', src: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80', alt: 'Data viz motion', aspectRatio: '16/9' },
                    { id: 'vt3', type: 'image', src: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&q=80', alt: 'UI transition reel', aspectRatio: '16/9' },
                ],
            },
            {
                id: 'solstice',
                name: 'Solstice Events',
                thumbnail: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80',
                works: [
                    { id: 'se1', type: 'image', src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80', alt: 'Festival motion opener', aspectRatio: '16/9' },
                    { id: 'se2', type: 'image', src: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&q=80', alt: 'Stage graphics', aspectRatio: '16/9' },
                    { id: 'se3', type: 'image', src: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=1200&q=80', alt: 'Countdown animation', aspectRatio: '16/9' },
                    { id: 'se4', type: 'image', src: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&q=80', alt: 'Confetti finale frame', aspectRatio: '16/9' },
                ],
            },
        ],
    },
];

export function getCategoryById(id: string): Category | undefined {
    return categories.find((c) => c.id === id);
}

export function getBrandById(categoryId: string, brandId: string): Brand | undefined {
    return getCategoryById(categoryId)?.brands.find((b) => b.id === brandId);
}
