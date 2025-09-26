import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>Artigo não encontrado</h2>
        <p className={styles.description}>
          O artigo que você está procurando não existe ou foi removido.
        </p>
        <Link href="/" className={styles.backButton}>
          Voltar para o Blog
        </Link>
      </div>
    </div>
  );
}