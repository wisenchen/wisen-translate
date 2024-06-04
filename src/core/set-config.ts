/**
 * 用于快捷更新用户配置
 */
import { TranslateAPI } from "../config/translate-api";
import * as vscode from "vscode";

export function registerUpdateConfigCommand() {
  // 配置 cozeAI 的 botId 和 token
  vscode.commands.registerCommand("Wisen-translate.updateCozeAI", async () => {
    const configuration = vscode.workspace.getConfiguration();

    const botId = await vscode.window.showInputBox({
      placeHolder: "请输入 coze 的 botId",
    });
    // 配置成功
    if (botId) {
      configuration
        .update("WisenTranslate.cozeBotId", botId, true)
        .then((res) => {
          console.log(res);
          vscode.window.showInformationMessage("cozeAI botId 配置成功");
        });
    }
    const token = await vscode.window.showInputBox({
      placeHolder: "请输入 coze 的个人令牌",
    });

    if (token) {
      //  更新到配置文件
      configuration
        .update("WisenTranslate.cozeToken", token, true)
        .then((res) => {
          console.log(res);
          vscode.window.showInformationMessage("cozeAI 个人令牌配置成功");
        });
    }
  });

  // 修改翻译源
  vscode.commands.registerCommand("Wisen-translate.switchOrigin", async () => {
    const origin = (await vscode.window.showQuickPick(
      Object.keys(TranslateAPI)
    )) as keyof typeof TranslateAPI;

    //  更新到配置文件
    const configuration = vscode.workspace.getConfiguration();
    configuration
      .update("WisenTranslate.origin", TranslateAPI[origin], true)
      .then(() => {
        vscode.window.showInformationMessage("翻译源已切换为：" + origin);
      });
  });
}
