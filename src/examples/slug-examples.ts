// Exemplo de uso das funções de slug

import { generateSlug, normalizeSlug, isValidSlug, compareSlugs } from '../utils/slug';

// Exemplos de uso:

console.log('=== Exemplos de uso da biblioteca slugify ===');

// 1. Gerar slug a partir de texto
const title1 = 'Como Criar APIs REST com PHP';
const slug1 = generateSlug(title1);
console.log(`Título: "${title1}"`);
console.log(`Slug gerado: "${slug1}"`);
console.log('');

// 2. Gerar slug com caracteres especiais e acentos
const title2 = 'Programação Orientada a Objetos em PHP 8.x';
const slug2 = generateSlug(title2);
console.log(`Título: "${title2}"`);
console.log(`Slug gerado: "${slug2}"`);
console.log('');

// 3. Normalizar slug existente
const existingSlug = 'Como_Criar_APIs___REST-com-PHP';
const normalizedSlug = normalizeSlug(existingSlug);
console.log(`Slug original: "${existingSlug}"`);
console.log(`Slug normalizado: "${normalizedSlug}"`);
console.log('');

// 4. Validar slug
const validSlug = 'como-criar-apis-rest-com-php';
const invalidSlug = 'Como Criar APIs REST';
console.log(`"${validSlug}" é válido: ${isValidSlug(validSlug)}`);
console.log(`"${invalidSlug}" é válido: ${isValidSlug(invalidSlug)}`);
console.log('');

// 5. Comparar slugs
const slug1Comparison = 'como-criar-apis-rest-com-php';
const slug2Comparison = 'Como_Criar_APIs___REST-com-PHP';
console.log(`Slugs são equivalentes: ${compareSlugs(slug1Comparison, slug2Comparison)}`);

// 6. Casos especiais
const specialCases = [
  'PHP & MySQL: Conexão e Consultas',
  'Arrays em PHP: map(), filter() e reduce()',
  'Testes Unitários com PHPUnit 10.0',
  'Laravel vs Symfony: Qual Escolher?',
  'API RESTful: Boas Práticas de Desenvolvimento'
];

console.log('\n=== Casos especiais ===');
specialCases.forEach(title => {
  const slug = generateSlug(title);
  console.log(`"${title}" → "${slug}"`);
});

export {};