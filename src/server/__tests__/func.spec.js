const { getTeams, getXML } = require('../func');

describe('getTeams test', () => {
  test('should show output', async () => {
    const result = await getTeams(2015);
    console.log('result:', result);
  }, 30000);
});

const urls = [
  '',
  'about',
  'faq',
  'faq/0',
  'faq/1',
  'faq/2',
  'faq/3',
  'faq/4',
  'faq/5',
  'faq/6',
  'faq/0/0',
  'faq/0/1',
  'faq/0/2',
  'faq/0/3',
  'faq/0/4',
  'faq/0/5',
  'faq/0/6',
  'faq/0/7',
  'faq/0/8',
  'faq/0/9',
  'faq/1/0',
  'faq/1/1',
  'faq/1/2',
  'faq/1/3',
  'faq/1/4',
  'faq/1/5',
  'faq/1/6',
  'faq/1/7',
  'faq/2/0',
  'faq/2/1',
  'faq/2/2',
  'faq/2/3',
  'faq/2/4',
  'faq/2/5',
  'faq/2/6',
  'faq/2/7',
  'faq/2/8',
  'faq/2/9',
  'faq/3/0',
  'faq/3/1',
  'faq/3/2',
  'faq/3/3',
  'faq/3/4',
  'faq/3/5',
  'faq/4/0',
  'faq/4/1',
  'faq/4/2',
  'faq/4/3',
  'faq/5/0',
  'faq/5/1',
  'faq/5/2',
  'faq/5/3',
  'faq/5/4',
  'faq/5/5',
  'faq/6/0',
  'faq/6/1',
  'faq/6/2',
  'faq/6/3',
  'faq/6/4',
  'faq/6/5',
  'getting-started',
  'statistic',
  'fees',
  'login',
  'sign-up',
  'sign-up/personal-information',
  'sign-up/financial-data',
  'sign-up/identify-verification',
  'user-agreement',
  'user-agreement-v2',
  'privacy-policy',
  'cookies-policy',
  'reset-password',
  'blog',
  'logout',
];

describe('getJSON test', () => {
  test('should show output', async () => {
    const result = await getXML(urls, {
      stringify: true,
      justLinks: false,
    });
    console.log('result:', result);
  });
});
