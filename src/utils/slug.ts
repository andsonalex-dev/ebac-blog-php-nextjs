import slugify from 'slugify';

/*https://www.npmjs.com/package/slugify*/

/**
 * Gera um slug a partir de um texto
 * @param text - Texto a ser convertido em slug
 * @returns String com o slug gerado
 */
export const generateSlug = (text: string): string => {
  return slugify(text, {
    lower: true,           // Converte para minúsculas
    strict: true,          // Remove caracteres especiais
    locale: 'pt',          // Configuração para português
    trim: true,            // Remove espaços no início e fim
    replacement: '-',      // Caractere de substituição para espaços
  });
};

/**
 * Normaliza um slug existente
 * @param slug - Slug a ser normalizado
 * @returns String com o slug normalizado
 */
export const normalizeSlug = (slug: string): string => {
  return generateSlug(slug);
};

/**
 * Verifica se um slug é válido
 * @param slug - Slug a ser verificado
 * @returns Boolean indicando se o slug é válido
 */
export const isValidSlug = (slug: string): boolean => {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug);
};

/**
 * Compara dois slugs, considerando normalização
 * @param slug1 - Primeiro slug
 * @param slug2 - Segundo slug
 * @returns Boolean indicando se os slugs são equivalentes
 */
export const compareSlugs = (slug1: string, slug2: string): boolean => {
  return normalizeSlug(slug1) === normalizeSlug(slug2);
};