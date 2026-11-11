export function portfolioTools(html,projects,en=false){
 const labels=en?['Find a project or technology','Category','All','Platforms','Applications','Research and AI','Tools','Web and experience']:['Proje veya teknoloji ara','Kategori','Tümü','Platformlar','Uygulamalar','Araştırma ve yapay zekâ','Araçlar','Web ve deneyim'];
 const categories=['all','platforms','apps','intelligence','tools','web'];
 for(const p of projects)html=html.replace('class="portfolio-entry" id="'+p.id+'"','class="portfolio-entry" data-category="'+p.category+'" id="'+p.id+'"');
 const controls='<div class="portfolio-tools" hidden><label for="portfolio-search">'+labels[0]+'</label><input id="portfolio-search" type="search" autocomplete="off"><label for="portfolio-category">'+labels[1]+'</label><select id="portfolio-category">'+categories.map((c,i)=>'<option value="'+c+'">'+labels[i+2]+'</option>').join('')+'</select><p id="portfolio-count" role="status"></p></div>';
 return html.replace('<article class="portfolio-entry"',controls+'<article class="portfolio-entry"').replace('</head>','<script defer src="/portfolio.js"></script></head>');
}
