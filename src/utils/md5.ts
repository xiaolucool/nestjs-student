import { MD5 } from "crypto-js";

/**
 * @description: hash加密
 * @param {string} val 要加密的字符串
 * @param {*} salt 盐
 * @Author: clue
 */
export function hash(val: string, salt = "") {
    return MD5(`${val}${salt}`).toString();
}

/**
 * @description: 比对加密后的字符串
 * @param {string} val 要比对的字符串
 * @param {string} hashVal 加密后的字符串
 * @param {*} salt 盐
 * @Author: clue
 */
export function verify(val: string, hashVal: string, salt = "") {
    return hash(val, salt) === hashVal;
}