const https = require('https');

https.get('https://maps.app.goo.gl/d67ZM8hJYJxTRtnN7?g_st=ac', (res) => {
  console.log(res.headers.location);
}).on('error', (e) => {
  console.error(e);
});
