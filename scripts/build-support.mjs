import fs from 'node:fs';
import path from 'node:path';
import { supportPage, supportRecords } from '../content/support.mjs';

export function buildSupport({ dist, origin, shell, metadata, jsonld, escape }) {
  const ids = new Set();
  for (const record of supportRecords) {
    if (!record.confirmed || !/^[a-z0-9-]+$/.test(record.id) || ids.has(record.id)) throw new Error('Support records must be confirmed and have unique safe IDs.');
    for (const field of ['provider', 'program', 'type', 'status', 'duration', 'benefit', 'summary', 'evidence', 'terms']) {
      if (typeof record[field] !== 'string' || !record[field].trim()) throw new Error('Support record field missing: ' + field);
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(record.recordedOn) || !Number.isFinite(Date.parse(record.recordedOn)) || new Date(record.recordedOn).toISOString().slice(0, 10) !== record.recordedOn) throw new Error('Support record date must be a real ISO calendar date.');
    for (const link of [record.programUrl, record.informationUrl]) if (new URL(link).protocol !== 'https:') throw new Error('Support references must use HTTPS.');
    ids.add(record.id);
  }
  const url = origin + supportPage.path;
  const dateLabel = date => new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(date + 'T00:00:00Z'));
  const cards = supportRecords.map(record => {
    const rows = [
      ['Program', record.program], ['Sağlayan', record.provider], ['Destek türü', record.type],
      ['Kapsam', record.benefit], ['Destek süresi', record.duration], ['Kayıt durumu', record.status],
      ...(record.amount ? [['Tutar', record.amount]] : []),
      ['Sitede kayıt tarihi', dateLabel(record.recordedOn)]
    ];
    return '<article class="support-card" id="' + escape(record.id) + '"><p class="kicker">' + escape(record.type) + '</p><h2>' + escape(record.program) + '</h2><p class="description">' + escape(record.summary) + '</p><dl class="support-facts">' + rows.map(([label, value]) => '<div><dt>' + escape(label) + '</dt><dd>' + escape(value) + '</dd></div>').join('') + '</dl><p>' + escape(record.evidence) + '</p><p class="fineprint">' + escape(record.terms) + ' Sitede kayıt tarihi, desteğin başlangıç veya bitiş tarihi değildir.</p><div class="product-links"><a class="product-link" href="' + escape(record.programUrl) + '" target="_blank" rel="noopener noreferrer">Resmî program sayfası ↗</a><a class="product-link" href="' + escape(record.informationUrl) + '" target="_blank" rel="noopener noreferrer">Program koşulları ve bilgiler ↗</a></div></article>';
  }).join('');
  const body = '<nav class="breadcrumb" aria-label="Sayfa yolu"><a href="/">Ana sayfa</a><span>/</span><span>Program destekleri</span></nav><p class="kicker">GİRİŞİM VE ÜRÜN GELİŞTİRME</p><h1>' + escape(supportPage.heading) + '</h1><p class="lead">' + escape(supportPage.intro) + '</p>' + cards + '<section><h2>Kapsam ve açıklamalar</h2><p>' + escape(supportPage.scopeNote) + '</p><p>' + escape(supportPage.markNote) + '</p><p class="fineprint">Son içerik güncellemesi: ' + dateLabel(supportPage.modified) + '</p></section>';
  // Acknowledgements are WebPage content, never sponsorship/endorsement schema.
  const data = { '@context': 'https://schema.org', '@type': 'WebPage', '@id': url, url,
    name: supportPage.title, description: supportPage.description, inLanguage: 'tr',
    dateModified: supportPage.modified, isPartOf: { '@id': origin + '/#website' } };
  const dir = path.join(dist, supportPage.path);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), shell(supportPage.title,
    '<meta name="description" content="' + escape(supportPage.description) + '"><link rel="canonical" href="' + url + '">' + metadata(supportPage.title, supportPage.description, url) + jsonld(data), body));
  return url;
}
