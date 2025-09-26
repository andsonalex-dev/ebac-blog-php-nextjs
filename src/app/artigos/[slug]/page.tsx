import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { fetchBlogPostBySlug, fetchBlogPosts } from '@/services/service';
import { BlogPost } from '@/interfaces/interface';
import { LimparImagemUrl } from '@/utils/limparUrlImagem';
import { normalizeSlug } from '@/utils/slug';
import Image from 'next/image';
import styles from '@/app/artigos/[slug]/page.module.css';
import Loading from '@/app/artigos/[slug]/loading';
import Link from 'next/link';

// Revalida a página a cada 3600 segundos (1 hora) - ISR
export const revalidate = 3600;

interface PostPageProps {
  params: {
    slug: string;
  };
}

async function PostContent({ slug }: Readonly<{ slug: string }>) {
  const post: BlogPost | null = await fetchBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  function normalizeTags(tags: unknown): string[] {
    if (Array.isArray(tags)) return tags;
    if (typeof tags === "string") return tags.split(",").map((t) => t.trim());
    return [];
  }

  const tags = normalizeTags(post.tag_list);

  return (
    <article className={styles.container}>
      <header className={styles.header}>
        {post.cover_image && (
          <div className={styles.coverImage}>
            <Image
              src={LimparImagemUrl(post.cover_image)}
              alt={post.title}
              width={800}
              height={400}
              priority
              className={styles.image}
            />
          </div>
        )}
        
        <div className={styles.headerContent}>
          <h1 className={styles.title}>{post.title}</h1>
          
          <div className={styles.meta}>
            <div className={styles.author}>
              <Image
                src={LimparImagemUrl(post.user.profile_image_90)}
                alt={post.user.name}
                width={40}
                height={40}
                className={styles.avatar}
              />
              <div>
                <p className={styles.authorName}>{post.user.name}</p>
                <p className={styles.username}>@{post.user.username}</p>
              </div>
            </div>
            
            <div className={styles.postInfo}>
              <time className={styles.date}>
                {formatDate(post.published_at)}
              </time>
              <span className={styles.readTime}>
                {post.reading_time_minutes} min de leitura
              </span>
            </div>
          </div>

          {tags.length > 0 && (
            <div className={styles.tags}>
              {tags.map((tag) => (
                <span key={tag.trim()} className={styles.tag}>
                  #{tag.trim()}
                </span>
              ))}
            </div>
          )}

          {post.description && (
            <p className={styles.description}>{post.description}</p>
          )}
        </div>
      </header>

      <div className={styles.content}>
        {(() => {
          if (post.body_html) {
            return (
              <div 
                className={styles.htmlContent}
                dangerouslySetInnerHTML={{ __html: post.body_html }} 
              />
            );
          }
          
          if (post.body_markdown) {
            return (
              <div className={styles.markdownContent}>
                <pre>{post.body_markdown}</pre>
              </div>
            );
          }
          
          return <p>Conteúdo não disponível.</p>;
        })()}
      </div>

      <footer className={styles.footer}>
        <Link href="/" className={styles.homeLink}>
          Voltar para a página inicial
        </Link>
        <a 
          href={post.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.originalLink}
        >
          Ver post original no DEV.to
        </a>
      </footer>
    </article>
  );
}

export default function PostPage({ params }: Readonly<PostPageProps>) {
  return (
    <Suspense fallback={<Loading />}>
      <PostContent slug={params.slug} />
    </Suspense>
  );
}

// Gera as páginas estáticas para os posts mais recentes
export async function generateStaticParams() {
  try {
    const posts = await fetchBlogPosts();
    
    // Gera páginas estáticas apenas para os 10 posts mais recentes
    return posts.slice(0, 10).map((post) => ({
      slug: normalizeSlug(post.slug),
    }));
  } catch (error) {
    console.error('Erro ao gerar parâmetros estáticos:', error);
    return [];
  }
}

// Geração de metadados dinâmicos
export async function generateMetadata({ params }: Readonly<PostPageProps>) {
  const post = await fetchBlogPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post não encontrado - Blog EBAC',
      description: 'O post solicitado não foi encontrado.',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const baseTitle = post.title;
  const siteTitle = 'Blog EBAC';
  const fullTitle = `${baseTitle} | ${siteTitle}`;
  const description = post.description || `Artigo sobre ${baseTitle} por ${post.user.name} no Blog EBAC`;
  const coverImage = post.cover_image ? LimparImagemUrl(post.cover_image) : null;
  
  const normalizedTags = Array.isArray(post.tag_list) 
    ? post.tag_list 
    : [];

  const keywords = normalizedTags.length > 0 
    ? normalizedTags.join(', ') 
    : `${post.user.name}, blog, artigo, desenvolvimento`;

  return {
    title: fullTitle,
    description: description,
    keywords: keywords,
    authors: [{ name: post.user.name, url: `https://dev.to/${post.user.username}` }],
    creator: post.user.name,
    publisher: 'Blog EBAC',
    category: 'Blog',
    
    // Metadados de artigo
    articleSection: normalizedTags[0] || 'Blog',
    publishedTime: post.published_at,
    
    // Open Graph
    openGraph: {
      title: baseTitle,
      description: description,
      url: `/artigos/${normalizeSlug(post.slug)}`,
      siteName: siteTitle,
      locale: 'pt_BR',
      type: 'article',
      publishedTime: post.published_at,
      authors: [post.user.name],
      tags: normalizedTags,
      images: coverImage ? [
        {
          url: coverImage,
          width: 800,
          height: 400,
          alt: post.title,
        }
      ] : [
        {
          url: '/php-blog.svg',
          width: 1200,
          height: 630,
          alt: `${post.title} - Blog EBAC`,
        }
      ],
    },

    // Metadados adicionais para SEO
    alternates: {
      canonical: `/artigos/${normalizeSlug(post.slug)}`,
    },
    
    // Robots
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
