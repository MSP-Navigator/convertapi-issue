const {basename} = require('path');
const axios = require('axios');
const fs = require('fs');

const convertapi = require('convertapi')('REPLACE_ME');

(async () => {
  const input = './202220.LiveBy Overview (Full).pdf';

  const readStream = fs.createReadStream(input);

  const thumbnailTarget = './tn-' + basename(input, 'pdf') + 'jpg';

  const upload = convertapi.upload(readStream, basename(input));
  const convertResult = await convertapi.convert('thumbnail', { PageRange: '1', File: upload }, 'pdf');

  const writeStream = fs.createWriteStream(thumbnailTarget);

  const thumbnailFile = await axios.get(convertResult.file.url, {responseType: 'stream'});
  await thumbnailFile.data
    .pipe(writeStream);

  console.log(':thumbsup:');
})();

