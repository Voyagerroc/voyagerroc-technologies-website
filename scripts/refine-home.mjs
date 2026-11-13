// Keep the landing page short; the complete catalogue lives at /calismalar/.
export function refineHome(html, {escape, projects}) {
  const scene=html.match(/<div id="scene-container"[\s\S]*?<div class="scene-toolbar">[\s\S]*?<\/button><\/div>/)?.[0];
  if (scene) html=html.replace('<div id="scene-home"></div>','<div id="scene-home">'+scene+'</div>');
  html=html.replace(/<section id="product-story"[\s\S]*?<\/section>/,'');
  html=html.replace(/<section id="collection"[\s\S]*?<\/section>/,'');
  html=html.replace(/<!-- brand-identity:start -->[\s\S]*?<!-- brand-identity:end -->/,'');
  html=html.replace(/(<h1 id="hero-title"[^>]*>)[\s\S]*?<\/h1>/,'$1Voyagerroc Technologies<br><em>Fikrinizi çalışan bir yazılıma dönüştürelim.</em></h1>');
  html=html.replace(/(<p class="hero-description"[^>]*>)[\s\S]*?<\/p>/,'$1Web ve Android uygulamaları, SaaS platformları ve yapay zekâ destekli iş akışları geliştiriyoruz. İhtiyacı, kapsamı ve teslim edilecek çıktıyı birlikte netleştirelim.</p>');
  const selected=projects.filter(p=>['eip','payradar','laserdeck'].includes(p.id));
  const cards=selected.map(p=>'<article class="feature-card" data-project="'+p.id+'"><div class="feature-info"><div><p class="feature-tag">'+escape(p.tr.tag)+'</p><h3><a href="/urunler/'+p.id+'/">'+escape(p.name)+'</a></h3><p class="feature-summary">'+escape(p.tr.summary)+'</p><a class="text-link" href="/urunler/'+p.id+'/">Ürün kapsamı ve erişimi ↗</a></div></div></article>').join('');
  html=html.replace('<div id="featured-projects" class="featured-grid"></div>','<div id="featured-projects" class="featured-grid">'+cards+'</div>');
  html=html.replace(/(<\/section>)(\s*<section id="technology")/,'$1<p class="shell portfolio-cta"><a class="button button-secondary" href="/calismalar/" data-i18n="allProjectPages">Tüm çalışmalar ↗</a></p>$2');
  return html.split('\n').map(line=>line.trimEnd()).join('\n');
}
