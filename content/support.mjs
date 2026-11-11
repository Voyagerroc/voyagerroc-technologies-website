// Publish only confirmed benefits. Keep emails, workspace IDs and codes private.
// A record date is not an activation date; never infer a financial value or expiry.
export const supportPage = {
  path: '/destekler/',
  modified: '2026-10-30',
  title: 'Program Destekleri | Voyagerroc Technologies',
  heading: 'Program destekleri',
  description: 'Voyagerroc Technologies çalışmalarına sağlanan girişim programı ve yazılım kullanım destekleri: kapsam, süre ve kayıt bilgileri.',
  intro: 'Ürün geliştirme çalışmalarımız için sağlanan program desteklerini burada paylaşıyoruz. Her kayıt, desteğin türünü, kapsamını ve süresini kendi koşullarıyla açıklar.',
  scopeNote: 'Bu sayfa, sağlanan desteklerin kurumsal bilgilendirme kaydıdır. Yazılım kullanım hakkı, hibe, yatırım ve iş ortaklığı farklı destek türleridir; her kayıt yalnızca açıklanan kapsamı ifade eder.',
  markNote: 'Program ve marka adları, desteğin kaynağını belirtmek için kullanılır. Bu kayıtlar ürünlerimizin ilgili kuruluşlarca onaylandığı, yatırım alındığı veya genel bir temsil ve iş ortaklığı kurulduğu anlamına gelmez. Marka hakları ilgili sahiplerine aittir.'
};

export const supportRecords = [{
  id: 'notion-for-startups',
  confirmed: true,
  provider: 'Notion',
  program: 'Notion for Startups',
  type: 'Yazılım kullanım desteği',
  status: 'Sağlandı',
  duration: '3 ay',
  benefit: 'Notion Business ve AI',
  recordedOn: '2026-10-30',
  summary: 'Notion for Startups programı kapsamında çalışma alanımıza 3 aylık Notion Business ve AI kullanım desteği tanımlandı. Program ekibine teşekkür ederiz.',
  evidence: 'Program ekibinin desteğin kullanıma açıldığına ilişkin bildirimine dayanır.',
  terms: 'Belirtilen üç aylık süre, bize tanımlanan teklifin kapsamıdır. Kullanım program ve plan koşullarına tabidir.',
  programUrl: 'https://www.notion.com/startups',
  informationUrl: 'https://www.notion.com/help/notion-for-startups'
}];
