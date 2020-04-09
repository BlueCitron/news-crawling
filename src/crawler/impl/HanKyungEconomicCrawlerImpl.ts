import NewsCrawlingDto from "../dto/NewsCrawlingDto";
import {BaseCrawler} from "../Crawler";
import {NEWSPAPER} from "../Newspaper";

const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

/**
 * 책임) 지정된 URL로부터 데이터를 안정적으로 긁어오는 역할
 *
 * 고려1) NavigationTimeout
 * 고려2) 태그 구성의 다양성
 */
class HanKyungEconomicCrawlerImpl extends BaseCrawler {

    corporation: NEWSPAPER = NEWSPAPER.HANKYUNG;
    targetURL: string;

    set setTargetURL(targetURL: string) {
        this.targetURL = targetURL;
    }

    crawling = async (): Promise<NewsCrawlingDto[]> => {
        const result: NewsCrawlingDto[] = [];

        const browser = await this.initBrowser();
        const page = await browser.newPage();
        await page.goto(this.targetURL);

        const titles = await page.$$('.tit > a');
        const totalSize = titles.length;

        try {
            for (let index = 0; index < totalSize; index++) {
                const link = (await page.$$('.tit > a'))[index];
                await link.click();
                await page.waitForNavigation({ waitUntil: 'networkidle2' });

                // Capture
                const $container = await page.$('#container');
                const html = await page.evaluate(container => container.outerHTML, $container);

                let $ = cheerio.load(html);
                const title = $('h1.title').text();

                const captured: NewsCrawlingDto = {
                    newspaper: this.corporation,
                    title,
                    html,
                };

                // Capture
                result.push(captured);
                await page.goBack();
            }
        } catch (e) {
            console.error(e);
        } finally {
            await browser.close();
            return result;
        }
    }

}

export default HanKyungEconomicCrawlerImpl;