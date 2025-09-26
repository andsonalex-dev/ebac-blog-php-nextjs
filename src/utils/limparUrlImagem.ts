
export function LimparImagemUrl(url: string): string {
    const fallback = "/php-blog.svg";
  try {
    const parts = url.split("/");
    const lastPart = parts[parts.length - 1];
    const decodedUrl = decodeURIComponent(lastPart);
    

    // Se for uma URL válida, retorna a limpa
    if (decodedUrl.startsWith("http")) {
      return decodedUrl;
    }

    return fallback; // fallback caso não consiga decodificar
  } catch {
    return fallback; // fallback em caso de erro
  }
}
