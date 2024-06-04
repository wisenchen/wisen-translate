/**
 * 用于快捷更新用户配置
 */
import * as vscode from "vscode";

// 配置 cozeAI 的 botId 和 token
export function registerUpdateConfigCommand() {
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
}
