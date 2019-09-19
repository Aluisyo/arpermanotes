import Arweave from 'arweave/web';

const arweave = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https'
});

export default arweave;
