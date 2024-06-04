/**
 * 用于快捷更新用户配置
 */
import { TranslateAPI } from "../config/translate-api";
import * as vscode from "vscode";

export function registerUpdateConfigCommand() {
  // 配置 cozeAI 的 botId 和 token
  vscode.commands.registerCommand("Wisen-translate.updateCozeAI", async () => {
    const botId = await vscode.window.showInputBox({
      placeHolder: "请输入 coze 的 botId",
    });
    const token = await vscode.window.showInputBox({
      placeHolder: "请输入 coze 的个人令牌",
    });
    //  更新到配置文件
    const configuration = vscode.workspace.getConfiguration();
    configuration.update("WisenTranslate.cozeBotId", botId, true);
    configuration.update("WisenTranslate.cozeToken", token, true);
  });

  // 修改翻译源
  vscode.commands.registerCommand("Wisen-translate.switchOrigin", async () => {
    const origin = await vscode.window.showQuickPick(Object.keys(TranslateAPI)) as keyof typeof TranslateAPI;

    
    //  更新到配置文件
    const configuration = vscode.workspace.getConfiguration();
    configuration.update("WisenTranslate.origin", TranslateAPI[origin], true);
  });
}
