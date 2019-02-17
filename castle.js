const puppeteer = require('puppeteer');
var fs = require('fs');
var fichierJson = [];
(async function main() {
    try {
        const browser = await puppeteer.launch({ headless: false })
        const page = await browser.newPage()

        await page.goto('https://www.relaischateaux.com/us/destinations/europe/france')

        await page.setViewport({ width: 1440, height: 752 })
        await page.waitForSelector('.hotelQuickView');

        const sections = await page.$$('.hotelQuickView');
        console.log('Wait for your json file ');
        console.log(sections.length);

        for (const section of sections) {
            const link = await section.$$eval('.mainTitle3 > a ', as => as.map(a => a.href));
            const name = await section.$eval('h3 > a > span', span => span.innerText);
            const restaurant = await section.$eval('span', span => span.innerText);
            var Price = -1;
            if (await section.$('div > div:nth-child(2) > div.priceTag > div > span.price > span.price') !== null) {
                Price = await section.$eval('div > div:nth-child(2) > div.priceTag > div > span.price > span.price', span => span.innerText);
            }
            if (restaurant === "Hotel + Restaurant") {
                console.log("{\"name\":\"" + name + "\"," + "\"link\":\"" + link + "\"," + "\"genre\":\"" + restaurant + "\"," + "\"prix\":\"" + Price+ "\"}");
                fichierJson.push({ "name": name, "link": link, "restaurant ": restaurant,"price":Price })
            }
        }
        var url_page_ = [2, 4, 5, 6, 7, 7, 8];
        for (var i = 0; i < 7; i++) {
            await page.waitForSelector('#destinationResults > #destPagination > .pagination > li:nth-child(' + url_page_[i] + ') > a')
            await page.click('#destinationResults > #destPagination > .pagination > li:nth-child(' + url_page_[i] + ') > a')
            await page.waitFor(2000);
            await page.waitForSelector('.hotelQuickView');

            const sections = await page.$$('.hotelQuickView');
            console.log(sections.length);

            for (const section of sections) {
                const link = await section.$$eval('.mainTitle3 > a ', as => as.map(a => a.href));
                const name = await section.$eval('h3 > a > span', span => span.innerText);
                const restaurant = await section.$eval('span', span => span.innerText);
                var Price = -1;
                if (await section.$('div > div:nth-child(2) > div.priceTag > div > span.price > span.price') !== null) {
                    Price = await section.$eval('div > div:nth-child(2) > div.priceTag > div > span.price > span.price', span => span.innerText);
                }
                if (restaurant === "Hotel + Restaurant") {
                    console.log("{\"name\":\"" + name + "\"," + "\"link\":\"" + link + "\"," + "\"genre\":\"" + restaurant + "\"," + "\"prix\":\"" + Price+ "\"}");
                    fichierJson.push({ "name": name, "link": link, "restaurant ": restaurant,"price":Price })

                }
            }
        }
        fs.writeFileSync("restauHotel.json", JSON.stringify(fichierJson));




    }
    catch (e) { console.log("error"); }
})();

