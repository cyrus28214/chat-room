import { MD5 } from "crypto-js";

export function randomColor(str: string) {
    const salt = 'Cyrus28214.top';
    const hashStr = MD5(str + salt).toString();
    const hashNum1 = parseInt(hashStr.substring(0, 8), 16);
    const hashNum2 = parseInt(hashStr.substring(8, 16), 16);
    const hashNum3 = parseInt(hashStr.substring(16, 24), 16);
    const hue = hashNum1 % 360;
    const saturation = 40 + hashNum2 % 50;
    const lightness = 40 + hashNum3 % 40;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}