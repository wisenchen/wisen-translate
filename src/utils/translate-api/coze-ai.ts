import { Language } from "../../config/language";
import { TranslateOptions } from "translation.js/declaration/api/types";
import * as vscode from "vscode";

const https = require("https");

interface CozeAIResponse {
  /**
   *
   * 状态码。
   * 0 代表调用成功。
   */
  code: number;
  /**
   * 会话 ID
   */
  conversation_id: string;
  /**
   * 全部消息都处理完成后，以 JSON 数组形式返回。
   * 详情请参考返回参数内容中 Message 消息结构的具体说明。
   */
  messages: MessageItem[];
  /**
   * 状态信息。
   */
  msg: string;
}

type MessageItem = {
  content: string;
  content_type: string;
  role: string;
  type: string;
};

class CozeAITranslate {
  cozeBotId = "";
  cozeToken = "";

  getCozeAIConfig() {
    const config = vscode.workspace.getConfiguration();
    this.cozeBotId = config.get("WisenTranslate.cozeBotId") || "";
    this.cozeToken = config.get("WisenTranslate.cozeToken") || "";
  }
  async translate(options: TranslateOptions) {
    this.getCozeAIConfig();
    if (!this.cozeBotId || !this.cozeToken) {
      vscode.window.showErrorMessage("请先配置 cozeAI 的 botId 和 token");
      return {
        dict: [],
        result: [],
      };
    }

    if (!this.validateText(options.text, options)) {
      return {
        dict: [],
        result: [],
      };
    }

    const data = JSON.stringify({
      conversation_id: Date.now() + "",
      bot_id: this.cozeBotId,
      user: "29032201862555",
      query: options.text,
      stream: false,
    });

    const res = await this.requestCozeAI(data);
    console.info(`翻译文本：${options.text}`)
    console.info('接口返回结果：', res)
    if (res.code === 0) {
      return {
        dict: [res.messages[0].content],
        result: [res.messages[0].content],
      };
    }
    vscode.window.showErrorMessage("cozeAI 翻译出错：" + res.msg);
    return {
      dict: [],
      result: [],
    };
  }

  requestCozeAI(data: any): Promise<CozeAIResponse> {
    const requestOptions = {
      hostname: "api.coze.cn",
      path: "/open_api/v2/chat",
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.cozeToken}`,
        "Content-Type": "application/json",
        Accept: "*/*",
        Host: "api.coze.cn",
        Connection: "keep-alive",
      },
    };

    return new Promise((resolve, reject) => {
      const req = https.request(requestOptions, (res: any) => {
        let responseBody = "";

        res.on("data", (chunk: string) => {
          responseBody += chunk;
        });

        res.on("end", () => {
          resolve(JSON.parse(responseBody));
        });
      });

      req.on("error", (error: any) => {
        reject(error);
      });

      req.write(data);
      req.end();
    });
  }

  /**
   * 校验选中的文本是否符合翻译条件
   */
  validateText(text: string, options: TranslateOptions) {
    if (!text) {
      return false;
    }
    // 如果包含中文，并且目标语言也是中文则不翻译
    if (
      /[\u4e00-\u9fa5]/.test(text) &&
      [Language.ZhCn, Language.ZhTW].includes(options.to as Language)
    ) {
      return false;
    }
    return true;
  }
}
export const CozeAI = new CozeAITranslate();

export default {};
