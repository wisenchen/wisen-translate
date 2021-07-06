import { TranslateAPI } from "../config/translate-api";
import { TranslateOptions } from "../interfaces/translate-options";
import { youdao, baidu, google } from "translation.js";
import * as vscode from "vscode";
import { DEFAULT_FROM, DEFAULT_TO } from "../config";

export const translate = async (option: TranslateOptions | string) => {
  /**
   * 从配置中获取翻译源
   */
  const translateOrigin = vscode.workspace
    .getConfiguration()
    .get("WisenTranslate.origin");

  // 默认配置项
  const defualtOptions: TranslateOptions =
    typeof option === "object"
      ? option
      : {
          text: option,
          from: DEFAULT_FROM,
          to: DEFAULT_TO,
        };
  try {
    switch (translateOrigin) {
      case TranslateAPI.YouDao:
        return await youdao.translate(defualtOptions);
      case TranslateAPI.BaiDu:
        return await baidu.translate(defualtOptions);
      case TranslateAPI.Google:
        return await google.translate(defualtOptions);
      default:
        // eslint-disable-next-line no-throw-literal
        throw "请配置正确的翻译源";
    }
  } catch (error) {
    if (typeof error === "string") {
      vscode.window.showErrorMessage(error);
    } else {
      // vscode.window.showErrorMessage(
      //   "翻译出错啦，可能是网络原因，可以修改翻译源再次尝试下哦！"
      // );
    }
    throw error;
  }
};
