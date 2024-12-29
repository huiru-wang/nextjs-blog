export type Frontmatter = {
    title?: string;
    category?: string;
    tags?: string[];
    keywords?: string;
    publishedAt?: string;
    description?: string;
}

export interface Event {
    id: number
    date: Date
    title: string
    content: string
}