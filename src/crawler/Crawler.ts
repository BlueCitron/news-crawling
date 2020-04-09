import NewsCrawlingDto from "./dto/NewsCrawlingDto";
import {NEWSPAPER} from "./Newspaper";

const puppeteer = require('puppeteer');

export interface ICrawler {
    // 크롤링하는 책임
    corporation: NEWSPAPER,
    targetURL: string,
    browserOptions: object,
    crawling(): Promise<NewsCrawlingDto[]>
    initBrowser(): Promise<any>
}

export abstract class BaseCrawler implements ICrawler {
    corporation: NEWSPAPER;
    targetURL: string;
    browserOptions: object = {
        headless: false,
    };

    abstract crawling(): Promise<NewsCrawlingDto[]>;

    async initBrowser(): Promise<any> {
        return await puppeteer.launch(this.browserOptions);
    }
}

