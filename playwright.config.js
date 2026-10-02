// // @ts-check
const { devices} = require ('@playwright/test');
const { report } = require('node:process');

const config = {
  testDir: './tests',
   timeout: 30 *1000,
   expect: {
       timeout: 5000
           },
           
   //reporter : 'html',

    use: {

      browserName : 'chromium',
      headless : false,
      viewport: { width: 1920, height: 1080 },

      //screenshot: 'on',
      //trace: 'retain-on-failure' //off,on
        },

};
module.exports = config
