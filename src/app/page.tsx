import styles from "./page.module.css";
import { BlogPost } from "@/interfaces/interface";
import { fetchBlogPosts } from "@/services/service";
import { normalizeSlug } from "@/utils/slug";
import Link from "next/link";
import Image from "next/image";
import { LimparImagemUrl } from "@/utils/limparUrlImagem";

// Revalida a página a cada 60 segundos (ISR)
export const revalidate = 60;

export default async function Home() {
  const blogPosts = await fetchBlogPosts();
  console.log(blogPosts);
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.header}>
          <h2>Blog PHP Tecnologia EBAC</h2>
        </div>

        <section className={styles.section}>
          {blogPosts.map((post: BlogPost) => (
            <article key={post.id} className={styles.card}>
              <div className={styles.cardImage}>
                <Image
                  className={styles.cardImg}
                  src={LimparImagemUrl(post.cover_image)}
                  alt={post.title}
                  width={600}
                  height={280}
                  unoptimized
                />
              </div>

              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>{post.title}</h3>
                <div className={styles.cardTags}>
                  {post.tag_list && post.tag_list.length > 0 ? (
                    post.tag_list.slice(0, 3).map((tag) => (
                      <span key={tag} className={styles.cardTag}>
                        #{tag}
                      </span>
                    ))
                  ) : (
                    <span className={styles.cardTag}>
                      #php
                    </span>
                  )}
                  {post.tag_list && post.tag_list.length > 3 && (
                    <span className={styles.cardTagMore}>
                      +{post.tag_list.length - 3}
                    </span>
                  )}
                </div>
              </div>

              <p className={styles.cardDescription}>{post.description}</p>

              <Link href={`/artigos/${normalizeSlug(post.slug)}`} className={styles.cardButton}>
                Saiba mais
              </Link>
            </article>
          ))}
        </section>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
