const https = require('https');

async function getTeams(year = 2015, k = 9) {
  const link = (year, page) =>
    `https://jsonmock.hackerrank.com/api/football_matches?competition=UEFA%20Champions%20League&year=${year}&page=${page}`;
  let loading = true;
  let data = [];
  let page = 0;

  while (loading) {
    const result = await getData(page);
    if (parseInt(result.total_pages) === page) {
      loading = false;
    } else {
      data.push(...result.data.map(({ team1, team2 }) => [team1, team2]));
      page++;
    }
  }

  function getData(page) {
    return new Promise(resolve => {
      https.get(link(year, page), response => {
        response.on('data', d => {
          let parsedData = JSON.parse(d);
          resolve(parsedData);
        });
      });
    });
  }

  return new Promise(resolve => {
    if (!loading) {
      let result = {};
      const flattedResult = data
        .reduce((a, c) => {
          a.push(...c);
          return a;
        }, [])
        .sort();

      flattedResult.forEach(it => {
        result[it] = (result[it] || 0) + 1;
      });

      resolve(Object.keys(result).filter(it => result[it] >= k));
    }
  });
}

// example

const res = {
  url: [
    {
      loc: 'https://swaper.com/',
      changefreq: 'weekly',
      '#text': 'z',
      priority: '1.0',
      lastmod: '2020-02-01',
    },
    {
      loc: 'https://swaper.com/de/',
      changefreq: 'weekly',
      '#text': 'z',
      priority: '0.9',
      lastmod: '2020-02-01',
    },
  ],
};

function getXML(urls, params) {
  const { stringify, justLinks } = params;
  let domain = 'https://swaper.com/';
  const links = urls
    .map(it => {
      return [domain + it, domain + 'de/' + it];
    })
    .flat();

  if (justLinks) {
    return links;
  }

  const result = links.map(loc => {
    return {
      loc,
      changefreq: 'weekly',
      priority: '0.1',
      lastmod: '2020-07-07',
    };
  });

  return stringify ? JSON.stringify(result) : result;
}

module.exports = { getTeams, getXML };

// const getLink = (year, page) => {
//   return `https://jsonmock.hackerrank.com/api/football_matches?competition=UEFA%20Champions%20League&year=${year}&page=${page}`;
// };
//
// async function func(year = 2015, k = 8) {
//   const firstCall = await getData(0);
//   let data = [];
//   let totalPages = firstCall.total_pages;
//   let loading = true;
//
//   for (let i = 0; i <= totalPages; i++) {
//     const result = await getData(i);
//     data.push(result.data);
//     if (i === totalPages) {
//       loading = false;
//     }
//   }
//
//   function getData(page) {
//     return new Promise(resolve => {
//       https.get(getLink(year, page), res => {
//         res.on('data', d => {
//           const parsedData = JSON.parse(d.toString('utf-8'));
//           resolve(parsedData);
//         });
//       });
//     });
//   }
//
//   return new Promise(resolve => {
//     if (!loading) {
//       resolve(data);
//     }
//   });
// }
