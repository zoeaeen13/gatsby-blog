const ghpages = require('gh-pages');

ghpages.publish(
  'public',
  {
    branch: 'master',
    repo: 'https://github.com/zoeaeen13/zoeaeen13.github.io.git',
  },
  () => {
    console.log('Deploy Complete!');
  }
);
