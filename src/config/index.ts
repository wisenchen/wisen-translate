import { Language } from "./language";

/**
 * 默认原文为英文
 */
export const DEFAULT_FROM = Language.En;
/**
 * 默认译文为中文
 */
export const DEFAULT_TO = Language.ZhCn;

/**
 * 中文正则
 */
export const zhReg = /[\u4100-\u9fa5]+/;