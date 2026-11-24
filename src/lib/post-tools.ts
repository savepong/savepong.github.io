// Which tool logos appear on a post's cover.
// Order of precedence: explicit override → tags → brand names found in the title.
// Overrides come from counting tool mentions in each post body.
// Posts that aren't about a specific tool get none (they use a heroImage instead).
import { LOGOS, type Logo } from './logos';

const MAX = 3;

/** Hand-picked where tags/title don't tell the whole story. */
const OVERRIDES: Record<string, string[]> = {
    'proxmox-ve-self-hosted-virtualization': ['proxmox', 'terraform'],
    'remote-mac-tailscale-ssh-rustdesk': ['tailscale', 'rustdesk', 'apple'],
    'maw-js-สง-ai-agent-หลายตวพรอมกนจากเทอรมนลเดยว': ['tmux', 'bun'],
    'direnv-claude-code-profile-switch': ['claude', 'gnubash'],
    'ai-workflow-preferences-note': ['claude'],
    'future-of-ai-in-development': ['githubcopilot', 'openai'],
    'row-level-webhook-fanout-outage': ['supabase', 'postgresql'],
};

const TAGS: Record<string, string> = {
    docker: 'docker',
    supabase: 'supabase',
    postgres: 'postgresql',
    postgresql: 'postgresql',
    obsidian: 'obsidian',
    warp: 'warp',
    ollama: 'ollama',
    claude: 'claude',
    'claude-code': 'claude',
    terraform: 'terraform',
    proxmox: 'proxmox',
    tailscale: 'tailscale',
    macos: 'apple',
    bun: 'bun',
    tmux: 'tmux',
    github: 'github',
    openai: 'openai',
    bash: 'gnubash',
};

/** Extra title keywords beyond each logo's own name. */
const ALIASES: Record<string, string> = {
    'claude code': 'claude',
    postgres: 'postgresql',
    copilot: 'githubcopilot',
    macos: 'apple',
};

export function toolsFor(post: { slug: string; data: { title: string; tags?: string[] } }): Logo[] {
    const picked: string[] = [];
    const add = (k?: string) => {
        if (k && LOGOS[k] && !picked.includes(k) && picked.length < MAX) picked.push(k);
    };

    (OVERRIDES[post.slug] ?? []).forEach(add);
    (post.data.tags ?? []).forEach((t) => add(TAGS[t.toLowerCase()]));

    // Whole-word match so "Bun" doesn't fire on "bundle". \b treats Thai as non-word, which is what we want.
    const title = post.data.title;
    const find = (word: string) => {
        const m = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').exec(title);
        return m ? m.index : -1;
    };
    const hits: Array<[number, string]> = [];
    for (const [key, logo] of Object.entries(LOGOS)) {
        const i = find(logo.title);
        if (i >= 0) hits.push([i, key]);
    }
    for (const [alias, key] of Object.entries(ALIASES)) {
        const i = find(alias);
        if (i >= 0) hits.push([i, key]);
    }
    hits.sort((a, b) => a[0] - b[0]).forEach(([, k]) => add(k));

    return picked.map((k) => LOGOS[k]);
}
