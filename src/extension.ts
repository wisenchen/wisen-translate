// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { ApiId } from "./config/webViewConfgi";
import { createWebView } from "./container/google.view";
import { TreeViewProvider } from "./container/translate-provider";
import { HoverTranslate } from "./core/hover-translate";
import { InputZH2EN } from "./core/input-zh-en";
import { TranslateHighlightText } from "./core/translate-highlight";
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "wisen-translate" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json

  // 鼠标悬停翻译

  const hoverTranslate = new HoverTranslate(context);

  const isDisableHover = vscode.workspace
    .getConfiguration()
    .get("wisenTranslate.disableHover");

  isDisableHover || hoverTranslate.onHover();
  // 输入中文翻译至英文
  new InputZH2EN(context);
  new TranslateHighlightText(context);
  // 监听配置更改
  vscode.workspace.onDidChangeConfiguration((e) => {
    if (e.affectsConfiguration("wisenTranslate.disableHover")) {
      const isDisableHover = vscode.workspace
        .getConfiguration()
        .get("wisenTranslate.disableHover");
      if (isDisableHover) {
        hoverTranslate.removeHover();
      } else {
        hoverTranslate.onHover();
      }
    }
  });

  // 视图容器
  // 实现树视图的初始化
  TreeViewProvider.init();
  context.subscriptions.push(
    vscode.commands.registerCommand("itemClick", (label: ApiId) => {
      const webView = createWebView(context, vscode.ViewColumn.Active, label);
      context.subscriptions.push(webView);
    })
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
