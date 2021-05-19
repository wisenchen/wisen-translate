export enum ApiId {
  /**
   * google翻译由于其网站设置了禁止以iframe加载所以删除
   */
  // Google = "google",
  Baidu = "百度翻译",
  Youdao = "有道翻译",
}
/**
 * 图标地址
 */
export const IconPathMap = new Map<ApiId, string>([
  // [ApiId.Google, "google.svg"],
  [ApiId.Baidu, "baidu.svg"],
  [ApiId.Youdao, "youdao.svg"],
]);

/**
 * 翻译页面地址
 */
export const PageUrl = new Map<ApiId, string>([
  // [ApiId.Google, "https://translate.google.cn"],
  [ApiId.Baidu, "https://fanyi.baidu.com"],
  [ApiId.Youdao, "http://fanyi.youdao.com"],
]);

/**
 * api 中文名
 */
export const ApiLabel = new Map<ApiId, string>([
  // [ApiId.Google, "谷歌翻译"],
  [ApiId.Baidu, "百度翻译"],
  [ApiId.Youdao, "有道翻译"],
]);
