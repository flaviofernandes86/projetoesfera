# SEO Checklist - Home (Projeto Esfera)

## 1) Indexacao e idioma
- [ ] `canonical` aponta para `https://projetoesfera.com.br/`
- [ ] `hreflang` da home usa `?lang=` para `en`, `es`, `fr`, `zh-CN`
- [ ] `x-default` aponta para `https://projetoesfera.com.br/`
- [ ] Links do seletor de idioma na home continuam com `?lang=...`

## 2) Snippet (Google)
- [ ] `<title>` descreve claramente o tema da home
- [ ] `meta description` clara, objetiva e coerente com o conteudo
- [ ] Texto de snippet atualizado quando houver mudanca de posicionamento

## 3) Social preview (Facebook / WhatsApp)
- [ ] `og:url` = `https://projetoesfera.com.br/`
- [ ] `og:image` usa `assets/img/preview-social.jpg`
- [ ] `og:image:type` = `image/jpeg`
- [ ] `og:image:width` = `1200`
- [ ] `og:image:height` = `630`
- [ ] `twitter:card` = `summary_large_image`
- [ ] `twitter:image` usa o mesmo preview social

## 4) Dados estruturados (JSON-LD)
- [ ] Existe `Organization` com `name`, `url`, `logo`, `description`, `contactPoint`
- [ ] Existe `WebSite` com `publisher`
- [ ] Existe `WebPage` com `name`, `description`, `inLanguage`
- [ ] Existe `BreadcrumbList` (Home)
- [ ] JSON-LD valido sem erros de sintaxe

## 5) Core Web Vitals (home)
- [ ] Todas as imagens possuem `width` e `height`
- [ ] Imagens nao criticas usam `loading=\"lazy\"`
- [ ] Imagens usam `decoding=\"async\"`
- [ ] Sem regressao visual apos ajustes de imagem

## 6) Sitemap e robots
- [ ] `robots.txt` referencia o sitemap oficial
- [ ] `sitemap.xml` contem apenas URLs oficiais da home e idiomas por `?lang=`
- [ ] `lastmod` do sitemap atualizado em publicacoes relevantes

## 7) Validacao pos-deploy
- [ ] Testar URL da home no Rich Results Test (Google)
- [ ] Testar URL da home no Facebook Sharing Debugger
- [ ] Compartilhar URL no WhatsApp e validar preview (titulo, descricao, imagem)
- [ ] Validar idioma com `?lang=en`, `?lang=es`, `?lang=fr`, `?lang=zh-CN`

## 8) Regra operacional
- [ ] Toda alteracao SEO: `alterar -> revisar -> commit -> informar comando de push`
