'use strict';
const http = require('http');
const server = http.createServer((req, res) => {

  //現在時刻のミリ秒を取得して変数に格納
  const now = Date.now();

  //現在時刻（ミリ秒）をCookieとして、last_accessというキー名でヘッダにセット
  /* セットされたCookieは、デベロッパーツール内のApplicationタブのCookiesという項目で確認できる */
  res.setHeader('Set-Cookie', 'last_access=' + now + ';');

  //ブラウザに保存されたCookieを、webページ(ここではlocalhost:8000)に表示させる
  res.end(req.headers.cookie);
});

const port = 8000;

server.listen(port, () => {
  console.info('Listening on ' + port);
});