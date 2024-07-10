import { Language } from "../../config/language";
import { TranslateOptions } from "translation.js/declaration/api/types";

export const { translate } = require("bing-translate-api");

const langMap = new Map<Language, string>([
  [Language.Auto, "auto-detect"],
  [Language.ZhCn, "zh-Hans"],
  [Language.ZhTW, "zh-Hant"],
]);

export default class BingAPI {
  getLang(lang: Language) {
    return langMap.get(lang) || lang;
  }
  async translate(options: TranslateOptions) {
    const from = this.getLang((options.from as Language) || Language.Auto);
    const to = this.getLang((options.to as Language) || Language.ZhCn);
    const res = await translate(options.text, from, to);
    return {
      dict: [res.translation],
      result: [res.translation],
    };
  }
}
