import { ApiId, ApiLabel, PageUrl } from "../config/webViewConfgi";
import { ExtensionContext, ViewColumn, WebviewPanel, window } from "vscode";
import { of } from "rxjs";
// 创建一个全局变量，类型为：WebviewPanel 或者 undefined
let webviewPanel: WebviewPanel | undefined;

// 创建一个可导出的方法,并且带上参数
export function createWebView(
  context: ExtensionContext, // 上面的代码刚介绍过，可忽略
  viewColumn: ViewColumn, // 窗口编辑器
  id: ApiId
) {
  if (webviewPanel === undefined) {
    // 上面重点讲解了 createWebviewPanel 传递4个参数
    webviewPanel = window.createWebviewPanel(
      "webView", // 标识，随意命名
      ApiLabel.get(id) as string, // 面板标题
      viewColumn, // 展示在哪个面板上
      {
        retainContextWhenHidden: true,
        enableScripts: true,
      }
    );

    webviewPanel.webview.html = getIframeHtml(id);
  } else {
    // 如果面板已经存在，重新设置标题
    webviewPanel.title = ApiLabel.get(id) as string;
    webviewPanel.webview.postMessage({
      command: "refresh",
      url: PageUrl.get(id),
    });
    webviewPanel.reveal(); // Webview面板一次只能显示在一列中。如果它已经显示，则此方法将其移动到新列。
  }

  // onDidDispose: 如果关闭该面板，将 webviewPanel 置 undefined
  webviewPanel.onDidDispose(() => {
    webviewPanel = undefined;
  });

  webviewPanel.webview.onDidReceiveMessage((message) => {
    console.log(webviewPanel, message);
    // webviewPanel.webview.html = getIframeHtml(message.id);
  });

  return webviewPanel;
}

// 这个方法没什么了，就是一个 最简单的嵌入 iframe 的 html 页面
export function getIframeHtml(id: ApiId) {
  return `
    <!DOCTYPE html>
    <html lang="en">
        <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>
            html,
            body {
                margin: 0 !important;
                padding: 0 !important;
                width: 100%;
                height: 100%;
            }
            .iframeDiv {
                width: 100%;
                height: 100%;
            }
        </style>
        </head>
        <script>
            window.addEventListener('message', (e) => {
                if(e.data.command === "refresh"){
                    document.getElementById('iframe1').src = e.data.url;
                }
            })
            
        </script>
        <body>
            <iframe id='iframe1' class="iframeDiv" src="${PageUrl.get(
              id
            )}" scrolling="auto" onError="alert('加载失败了')"></iframe>
        </body>
    </html>
    `;
}
