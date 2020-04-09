import CrawlerFactory from "./crawler/CrawlerFactory";
import {ICrawler} from "./crawler/Crawler";
import sequelize from "./infrastructure/sequelize/sequelize";
import CrawlerExecutor from "./crawler/CrawlerExecutor";


(async () => {
    try {
        await sequelize.sync({ force: false });

        // 크롤러 가져오기
        const crawlerFactory = new CrawlerFactory();
        const crawler: ICrawler = crawlerFactory.getBean('HANKYUNG_ECONOMIC');

        // 크롤러 실행
        const crawlerExecutor = new CrawlerExecutor('0 * * * * *', crawler);
        crawlerExecutor.start();
        
    } catch (e) {
        console.error(e);
    }

})();