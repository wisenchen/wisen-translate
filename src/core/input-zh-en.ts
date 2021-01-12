import { ExtensionContext } from "vscode";
import * as vscode from "vscode";
import { translate } from "../utils/translate";
import { Language } from "../config/language";
import { zhReg } from "../config";

/**
 * 输入中文翻译至英文
 */
export class InputZH2EN {
  /**
   * 当前的环境对象
   */
  context: ExtensionContext;
  constructor(context: ExtensionContext) {
    this.context = context;
    this.main();
  }
  main() {
    vscode.commands.registerCommand("wisen-translate.zh-en", async () => {
      const text = await vscode.window.showInputBox({
        prompt: "输入中文翻译至英文",
      });
      if (text) {
        if (!zhReg.test(text)) {
          vscode.window.showWarningMessage("请输入中文！");
          return;
        }
        try {
          const translateResult = await translate({
            text,
            from: Language.ZhCn,
            to: Language.En,
          });
          if (translateResult.result) {
            vscode.window.showInformationMessage(`
              翻译结果：${translateResult.result.join("")}
              `);
          } else {
          }
        } catch (error) {}
      }
    });
  }
}
