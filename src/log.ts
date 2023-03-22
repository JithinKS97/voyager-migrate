const fs = require('fs');

export const addLog = (log) => {
    const timestamp = new Date().toLocaleString();
    const logToAdd = `${timestamp}: ${log}\n`;
    fs.appendFileSync('log.txt', logToAdd);
}
