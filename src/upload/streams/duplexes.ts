import createExcelWorkbookStream from 'excel-row-stream';
import * as ExcelRowStream from 'excel-row-stream';

export const getAllDuplexStreams = () => {
    const workbookStream = createExcelWorkbookStream({
        matchSheet: /.*/, // Get all workbook, generic regex
        dropEmptyRows: true,
    });

    const withColumnsStream = ExcelRowStream.createRowToRowWithColumnsStream({
        sanitizeColumnName: (columnName) => {
            return columnName.toLowerCase().replace(/\W/g, '_');
        },
    });

    return { workbookStream, withColumnsStream };
};
