import {NEWSPAPER} from "../Newspaper";

interface NewsCrawlingDto {
    newspaper: NEWSPAPER,
    title: string,
    html: string,
}

export default NewsCrawlingDto;