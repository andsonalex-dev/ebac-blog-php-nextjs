export interface BlogPost {
  id: number;
  title: string;
  description: string;
  slug: string;
  url: string;
  cover_image: string;
  published_at: string;
  reading_time_minutes: number;
  created_at: string;
  tag_list: Array<string>;
  tags: string;
  body_html?: string;
  body_markdown?: string;
  user: {
    name: string;
    username: string;
    profile_image: string;
    profile_image_90: string;
  };
}