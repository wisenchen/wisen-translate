import { ExtensionContext, languages } from "vscode";
import * as vscode from "vscode";
import { translate } from "../utils/translate";
/**
 * 鼠标悬停至某个单词，在上方显示翻译信息
 */
export class HoverTranslate {
  /**
   * 匹配所有文件正则
   */
  private patternAll = "**";
  /**
   * 当前的环境对象
   */
  context: ExtensionContext;
  disposable?: vscode.Disposable;
  constructor(context: ExtensionContext) {
    this.context = context;
    this.provideHover = this.provideHover.bind(this);
  }
  onHover() {
    // 注册鼠标悬停提示
    this.disposable = languages.registerHoverProvider(
      { pattern: this.patternAll },
      { provideHover: this.provideHover }
    );
  }

  removeHover() {
    this.disposable?.dispose();
  }

  async provideHover(document: vscode.TextDocument, position: vscode.Position) {
    const editor = vscode.window.activeTextEditor;
    let text = document.getText(document.getWordRangeAtPosition(position)).trim();
    if (editor) {
      // 获取鼠标选择区域文本
      const selectionText = editor.document.getText(editor.selection);
      if (selectionText) {
        text = selectionText;
      }
    }
    const result = await translate(text);
    if (result.dict) {
      return new vscode.Hover(`译：${result.dict.join('\n')}`);
    }
  }
}
