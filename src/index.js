import app from './server';
import http from 'http';
import SocketIO from 'socket.io'
import SocketIOFile from 'socket.io-file'

const server = http.createServer(app);
const io = SocketIO(server);


let currentApp = app;

server.listen(process.env.PORT || 3000, (error) => {
  if (error) {
    console.log(error)
  }
  
  console.log('🚀 started')
});


io.on('connection', (socket) => {
  console.log('Socket connected.');

  var uploader = new SocketIOFile(socket, {
    // uploadDir: {			// multiple directories
    // 	music: 'data/music',
    // 	document: 'data/document'
    // },
    uploadDir: 'public/images',							// simple directory
    accepts: ['audio/mpeg', 'audio/mp3', 'image/png', 'image/jpg', 'image/jpeg'],		// chrome and some of browsers checking mp3 as 'audio/mp3', not 'audio/mpeg'
    maxFileSize: 4194304, 						// 4 MB. default is undefined(no limit)
    chunkSize: 10240,							// default is 10240(1KB)
    transmissionDelay: 0,						// delay of each transmission, higher value saves more cpu resources, lower upload speed. default is 0(no delay)
    overwrite: true 							// overwrite file if exists, default is true.
  });
  uploader.on('start', (fileInfo) => {
    console.log('Start uploading');
    console.log(fileInfo);
  });
  uploader.on('stream', (fileInfo) => {
    console.log(`${fileInfo.wrote} / ${fileInfo.size} byte(s)`);
  });
  uploader.on('complete', (fileInfo) => {
    console.log('Upload Complete.');
    console.log(fileInfo);
    console.log('file',fileInfo,'<br/>','username: ',fileInfo.data.username);
  });
  uploader.on('error', (err) => {
    console.log('Error!', err);
  });
  uploader.on('abort', (fileInfo) => {
    console.log('Aborted: ', fileInfo);
  });
});


if (module.hot) {
  console.log('✅  Server-side HMR Enabled!');

  module.hot.accept('./server', () => {
    console.log('🔁  HMR Reloading `./server`...');
    server.removeListener('request', currentApp);
    const newApp = require('./server').default;
    server.on('request', newApp);
    currentApp = newApp;
  });
}
