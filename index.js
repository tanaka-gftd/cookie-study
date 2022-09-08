'use strict';
const http = require('http');
const server = http.createServer((req, res) => {

  //現在時刻のミリ秒を取得して変数に格納
  const now = Date.now();

  //ブラウザ上で日本語が文字化けをするのを防ぐために、エンコードとしてUTF-8を指定
  res.setHeader('Content-Type', 'text/plain;charset=utf-8');

  //現在時刻（ミリ秒）をCookieとして、last_accessというキー名でヘッダにセット
  /* セットされたCookieは、デベロッパーツール内のApplicationタブのCookiesという項目で確認できる */
  /* expiresで有効期限を設定しているが、ブラウザによってCookieの最長保存期限が決まっている？（もしくはCookieの機能が廃止される？）模様 */
  res.setHeader('Set-Cookie', 'last_access=' + now + ';expires=Mon, 07 Jan 2036 00:00:00 GMT;');
  
  //Cookieが存在していたら（取得できたら）、ミリ秒を表す文字列を抜き出し、数値に変換して代入（Cookieがなければnowを代入）
  const last_access_time = req.headers.cookie ? parseInt(req.headers.cookie.split('last_access=')[1]) : now;

  //そして最後に、取得したミリ秒を引数としてnew Date()を実行し、その結果を文字列に変換したものをページ上に表示するようにする
  res.end(new Date(last_access_time).toString());
});

const port = 8000;

server.listen(port, () => {
  console.info('Listening on ' + port);
});