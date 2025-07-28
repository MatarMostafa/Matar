import fs from 'fs';
import path from 'path';

export function readData(fileName: string): any[] {
  const filePath = path.join(__dirname, '../../data', fileName);
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content || '[]');
}

export function writeData(fileName: string, data: any[]): void {
  const filePath = path.join(__dirname, '../../data', fileName);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}