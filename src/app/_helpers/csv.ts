import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class CSVHelper {
    getColumns(data: any[]): string[] {
        const columns: string[] = [];
        data.forEach(row => {
          Object.keys(row).forEach(col => {
            if (!columns.includes(col)) {
              columns.push(col);
            }
          });
        });
        return columns;
      }
    
      convertToCsv(data: any[], columns: string[]): string {
        let csv = '';
        csv += columns.join(',') + '\n';
        data.forEach(row => {
          const values: any[] = [];
          columns.forEach(col => {
            values.push(row[col] || '');
          });
          csv += values.join(',') + '\n';
        });
        return csv;
      }
}