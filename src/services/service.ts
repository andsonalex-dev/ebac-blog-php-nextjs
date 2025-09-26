import { api } from "@/utils/api";
import { BlogPost } from "@/interfaces/interface";
import { compareSlugs, normalizeSlug } from "@/utils/slug";

export const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  const response = await api().get("/articles?tag=php&top=10");
  return response.data;
};

export const fetchBlogPostById = async (id: string): Promise<BlogPost> => {
  const response = await api().get(`/articles/${id}`);
  return response.data;
};

export const fetchBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  try {
    const posts = await fetchBlogPosts();
    
    // Normaliza o slug de entrada para comparação
    const normalizedSlug = normalizeSlug(slug);
    
    // Busca o post comparando slugs normalizados
    const post = posts.find(p => compareSlugs(p.slug, normalizedSlug));
    console.log('Post encontrado:', post);
    
    if (!post) {
      return null;
    }
    
    const fullPost = await fetchBlogPostById(post.id.toString());
    return fullPost;
  } catch (error) {
    console.error('Erro ao buscar post por slug:', error);
    return null;
  }
};
