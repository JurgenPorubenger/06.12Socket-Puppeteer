// const app = require('express')();
// const server = require('http').createServer(app);
// const io = require('socket.io')(server);
// const puppeteer = require('puppeteer');
//
//
// server.listen(3001);
// // WARNING: app.listen(80) will NOT work here!
//
// io.on('connection', function (socket) {
//
//     (async function getData() {
//         try{
//             const browser = await puppeteer.launch({ headless: true });
//             const page = await browser.newPage();
//             await page.evaluate('navigator.userAgent');
//
//             await page.goto('https://www.work.ua/jobs-kyiv-it/?advs=1');
//             await page.waitForSelector('.card-visited');
//             const sections = await page.$$('.card-visited');
//
//             for (let i = 0; i < sections.length; i++ ){
//
//                 await page.goto('https://www.work.ua/jobs-kyiv-it/?advs=1');
//                 await page.waitForSelector('.card-visited');
//                 const sections = await page.$$('.card-visited');
//
//                 const section = sections[i];
//                 const link = await section.$('h2 > a');
//                 const linkName = await page.evaluate(link => link.innerText, link);
//                 console.log('MY LINK', linkName );
//                 link.click();
//
//                 const contentSelector = '#job-description';
//                 await page.waitForSelector('#job-description');
//                 const pageContent = await page.$eval(contentSelector,
//                     contentSelector => contentSelector.innerText);
//                 console.log('Контент: ', pageContent);
//                 socket.emit('news', { message: pageContent })
//                 // fs.writeFile(__dirname + /jobOffer/${linkName}.txt, pageContent, err => {
//                 //   console.log('SAVE ERROR', err)
//                 // })
//             }
//             console.log('DONE');
//             await browser.close();
//         } catch (e) {
//             console.log('err', e)
//         }
//     })();
//     // socket.on('event', function (data) {
//     //     console.log(data);
//     //     // socket.emit('news', { hello: 'world' });
//     });
// // });
//
// // module.exports = io;
