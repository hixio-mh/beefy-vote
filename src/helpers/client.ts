class Client {
  request(command, body?) {
    const url = `${process.env.VUE_APP_HUB_URL}/api/${command}`;
    let init;

    console.debug(`>>> Client.request`, url, command, body);

    if (body) {
      init = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      };
    }
    return new Promise((resolve, reject) => {
      fetch(url, init)
        .then(res => {
          console.debug(`>>> response`, res);
          
          if (res.ok) {
            return resolve(res.json());
          }
          throw res;
        })
        .catch(e => e.json().then(json => reject(json)));
    });
  }
}

const client = new Client();

export default client;
