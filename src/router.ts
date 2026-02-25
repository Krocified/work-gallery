// ────────────────────────────────────────────────────────────────
//  Simple hash-based client-side router
//  Routes:
//    #/                      → main page
//    #/category/:id          → category brand listing
//    #/category/:id/:brandId → brand gallery
// ────────────────────────────────────────────────────────────────

export type Route =
    | { type: 'home' }
    | { type: 'category'; categoryId: string }
    | { type: 'brand'; categoryId: string; brandId: string };

function parseHash(hash: string): Route {
    // Normalise — strip leading #/ or #
    const path = hash.replace(/^#\/?/, '');
    const parts = path.split('/').filter(Boolean);

    if (parts[0] === 'category' && parts[1] && parts[2]) {
        return { type: 'brand', categoryId: parts[1], brandId: parts[2] };
    }
    if (parts[0] === 'category' && parts[1]) {
        return { type: 'category', categoryId: parts[1] };
    }
    return { type: 'home' };
}

export function getRoute(): Route {
    return parseHash(window.location.hash);
}

export function navigate(path: string): void {
    window.location.hash = path;
}

export function onRouteChange(callback: (route: Route) => void): () => void {
    const handler = () => callback(parseHash(window.location.hash));
    window.addEventListener('hashchange', handler);
    // Return cleanup fn
    return () => window.removeEventListener('hashchange', handler);
}
