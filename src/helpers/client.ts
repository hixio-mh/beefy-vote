class Client {
  request(command, body?) {
    const url = `${process.env.VUE_APP_HUB_URL}/api/${command}`;
    const init: any = {
      mode: 'cors',
      cache: 'default',
    };

    if (body) {
      init.method = 'POST';
      init.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
      init.body = JSON.stringify(body);
    } else {
      init.method = 'GET';
    }

    const req = new Request(url, init);
    return new Promise((resolve, reject) => {
      fetch(req)
        .then(res => {
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
