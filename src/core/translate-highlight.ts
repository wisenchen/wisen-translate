import { ExtensionContext } from "vscode";
import * as vscode from "vscode";
import { translate } from "../utils/translate";
import { Language } from "../config/language";

/**
 * 翻译选中文字
 */
export class TranslateHighlightText {
  /**
   * 当前的环境对象
   */
  context: ExtensionContext;
  constructor(context: ExtensionContext) {
    this.context = context;
    this.main();
  }
  main() {
    vscode.commands.registerCommand(
      "Wisen-translate.translate-highlight",
      async () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
          // 获取鼠标选择区域文本
          const selectionText = editor.document.getText(editor.selection);
          if (!selectionText) {
            vscode.window.showInformationMessage('请先选择文本后在执行该命令！');
            return;
          }
          const translateResult = await translate(selectionText);
          if (translateResult.result) {
            vscode.window.showInformationMessage(`
            翻译结果：${translateResult.result.join("")}
            `);
          } else {
            vscode.window.showInformationMessage('翻译失败');
          }
        }
      }
    );
  }
}
