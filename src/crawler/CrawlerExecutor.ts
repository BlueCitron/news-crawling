import {ICrawler} from "./Crawler";
import NewsRawHtml from "../infrastructure/sequelize/models/NewsRawHtml.model";
import {AutoIncrement, Column, CreatedAt, DataType, PrimaryKey, UpdatedAt} from "sequelize-typescript";
import {NewsCorp} from "../infrastructure/sequelize/models/NewsCorp";
const cron = require('node-cron');


interface ICrawlerExecutor {
    cron: string,
    crawler: ICrawler,
    start(): void,
}

/**
 * FlowControl
 *
 * 책임 1) 크롤러와 Cron식을 토대로 주기적으로 크롤링 수행
 * 책임 2) 크롤링의 결과를 Infrastructure로 전달
 */
class CrawlerExecutor implements ICrawlerExecutor{
    cron: string;
    crawler: ICrawler;

    constructor(cron: string, crawler: ICrawler) {
        this.cron = cron;
        this.crawler = crawler;
    }

    start(): void {
        cron.schedule(this.cron, async () => {
            console.log(`[${this.crawler.corporation}] Crawling Start.`);

            const newsCrawlingDtos = await this.crawler.crawling();

            // 추후 Infrastructure에 전달
            newsCrawlingDtos.forEach(async newsCrawlingDto => {
                const { newspaper, title, html } = newsCrawlingDto;
                try {
                    const newsRawHtml = NewsRawHtml.build({
                        corporation: newspaper,
                        title,
                        html
                    });
                    await newsRawHtml.save();
                    console.log(`${newspaper}의 새로운 뉴스 기사: ${title}`);
                } catch {

                }
            });
        });
    }
}

export default CrawlerExecutor;