class Client {
  get(ipfsHash) {
    const url = `https://ipfs.io/ipfs/${ipfsHash}`;
    return fetch(url).then(res => res.json());
  }
}

const client = new Client();

export default client;
