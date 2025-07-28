"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readData = readData;
exports.writeData = writeData;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function readData(fileName) {
    const filePath = path_1.default.join(__dirname, '../../data', fileName);
    if (!fs_1.default.existsSync(filePath))
        return [];
    const content = fs_1.default.readFileSync(filePath, 'utf-8');
    return JSON.parse(content || '[]');
}
function writeData(fileName, data) {
    const filePath = path_1.default.join(__dirname, '../../data', fileName);
    fs_1.default.writeFileSync(filePath, JSON.stringify(data, null, 2));
}
