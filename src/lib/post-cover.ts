// One place to resolve everything a post's cover needs.
import { coverFor } from './cover';
import { COVER_CREDITS } from './cover-credits';
import { toolsFor } from './post-tools';

export function postCover(post: { slug: string; data: { title: string; tags?: string[]; heroImage?: string } }) {
    const tools = toolsFor(post);
    const cover = coverFor(post, tools.length > 0);
    if (!cover) return null;
    const alt = cover.generated
        ? `Logos: ${tools.map((t) => t.title).join(', ')}`
        : '';
    return { ...cover, tools, alt, credit: COVER_CREDITS[post.slug] ?? null };
}
