import {
  TreeItem,
  TreeItemCollapsibleState,
  TreeDataProvider,
  Uri,
  window,
} from "vscode";
import { join } from "path";
import { ApiId, ApiLabel, IconPathMap } from "../config/webViewConfgi";

// 创建每一项 label 对应的图片名称

// 第一步：创建单项的节点(item)的类
export class TreeItemNode extends TreeItem {
  constructor(
    public readonly id: ApiId,
    public readonly collapsibleState: TreeItemCollapsibleState
  ) {
    super(id, collapsibleState);
    this.tooltip = `打开${ApiLabel.get(id)}`;
    this.iconPath = this.getIconUriForLabel(id);
    this.command = {
      title: ApiLabel.get(this.id) as string, // 标题
      command: "itemClick", 
      arguments: [this.id],
    };
  }

  private getIconUriForLabel(label: ApiId) {
    return Uri.file(
      join(
        __filename,
        "..",
        "..",
        "..",
        "resource",
        IconPathMap.get(label) + ""
      )
    );
  }
}

export class TreeViewProvider implements TreeDataProvider<TreeItemNode> {
  // 获取树视图中的每一项 item,所以要返回 element
  getTreeItem(element: TreeItemNode): TreeItem | Thenable<TreeItem> {
    return element;
  }

  getChildren() {
    return Array.from(IconPathMap.keys()).map(
      (item) => new TreeItemNode(item, TreeItemCollapsibleState.None)
    );
  }

  public static init() {
    // 实例化 TreeViewProvider
    const treeViewProvider = new TreeViewProvider();
    // registerTreeDataProvider：注册树视图
    // 你可以类比 registerCommand(上面注册 Hello World)
    window.registerTreeDataProvider("WisenTranslate-item", treeViewProvider);
  }
}
