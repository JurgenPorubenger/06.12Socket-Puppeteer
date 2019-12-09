const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const puppeteer = require('puppeteer');


server.listen(3002);
// WARNING: app.listen(80) will NOT work here!

io.on('connection', function (socket) {
    async function getData( urlText, selectorText ) {
        try{
            // Запустим браузер
            const browser = await puppeteer.launch({ headless: true});

            // Откроем новую страницу
            const page = await browser.newPage();
            const url = urlText;
            const selector = selectorText;
            // const url = 'https://www.work.ua/ru/jobs-kyiv-javascript/';
            //const selector = '.card-visited'
            try {
                // Попробуем перейти по URL
                await page.goto(url);
                console.log(`Открываю страницу: ${url}`);
            } catch (e) {
                console.log(`Не удалось открыть страницу: ${url} из-за ошибки: ${e}`);
            }

            // Найдём блоки с вакансиями
            await page.waitForSelector(selector);
            const divSelectors = await page.$$eval(
                `${selector} > h2 > a`, selectors => selectors.map(data => data.href)
            );

            // Перейдём по каждой из них
            for (let link of divSelectors){
                try {
                    await page.goto(link);
                }catch (e) {
                    console.log(e);
                }
                // Получим pathname - оценка страницы
                let pagePathname = await page.evaluate(() => location.pathname);
                // ждем селектор
                await page.waitForSelector('.card');
                // переходим на дочерний селектор
                const pageTitle = await page.$('.card > #h1-name');
                const pageText = await page.$('.card > #job-description');

                // оценка страницы, возврам текста из селектора
                const title = await page.evaluate(title => title.textContent, pageTitle);
                const description = await page.evaluate(text => text.textContent, pageText);
                console.log(title);
                console.log('Нашёл url:', pagePathname);
                socket.emit('news', { message: title, url:`https://www.work.ua${pagePathname}`, text: description });
            }
            await browser.close();
            socket.emit('disconnectThatSoc');
            // process.exit();
        } catch (err) {
            console.log('err', err)
        }
    }
    socket.on('start',({urlText,selectorText})=>getData(urlText,selectorText)
        .then(data=>console.log(data))
        .catch(e=>console.log(e)))

});

module.exports = io;
