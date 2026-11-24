// Build-time logo cover for posts about specific tools.
// Output: /blog/<slug>/cover.jpg (1200×630, used for the banner and og:image).
import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import sharp from 'sharp';
import { logoCoverSvg } from '@/lib/cover';
import { postCover } from '@/lib/post-cover';

export const getStaticPaths = (async () => {
    const posts = await getCollection('blog');
    return posts.flatMap((post) => {
        const cover = postCover(post);
        // Only generate when the post has tools and no heroImage of its own (avoids path clashes).
        return cover?.generated ? [{ params: { slug: post.slug }, props: { logos: cover.tools } }] : [];
    });
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
    const svg = logoCoverSvg(props.logos);
    const jpg = await sharp(Buffer.from(svg)).jpeg({ quality: 88, mozjpeg: true, chromaSubsampling: '4:4:4' }).toBuffer();
    return new Response(new Uint8Array(jpg), { headers: { 'Content-Type': 'image/jpeg' } });
};
