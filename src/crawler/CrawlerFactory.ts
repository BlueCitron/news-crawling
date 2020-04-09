
import BeanNotFoundError from "./error/BeanNotFoundError";
import HanKyungEconomicCrawlerImpl from "./impl/HanKyungEconomicCrawlerImpl";
import {ICrawler} from "./Crawler";

const path = require('path');
const fs = require('fs');

interface IBeanFactoryElement {
    key: string,
    url: string,
    bean: ICrawler,
}

class CrawlerFactory {
    beanFactory: IBeanFactoryElement[] = [{
        key: 'HANKYUNG_ECONOMIC',
        url: 'https://www.hankyung.com/economy',
        bean: new HanKyungEconomicCrawlerImpl(),
    }];

    getBean(key:string): ICrawler {
        const find = this.beanFactory.find(element => element.key === key);
        if (find) {
            const { bean, url } = find;
            bean.targetURL = url;
            return bean;
        } else {
            throw new BeanNotFoundError(`입력받은 키에 해당하는 빈을 찾을 수 없습니다.(key=${key})`);
        }
    }
}

export default CrawlerFactory;