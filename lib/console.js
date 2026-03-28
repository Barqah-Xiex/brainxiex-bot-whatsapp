const console_error = console.error;
const console_warn  = console.warn ;
const console_info  = console.info ;
const console_log   = console.log  ;

const fs = require('fs');
const util = require("util");

const red = '\x1b[31m';
const reset = '\x1b[0m';
const gray = '\x1b[90m';
const yellow = '\x1b[33m';

console.red = (...arg) => console_log(`${red}${util.format(...arg)}`)

console.info = function(){
    if(!require("util").format(...arguments).includes("Closing session: SessionEntry")) return console_info(...arguments);
}

console.error = function (err, evalCode = null) {
    if(typeof err == "undefined") return 0;
    if (err instanceof Error) {
        logDetailedError(err, evalCode);
    } else {
        console_error(err); // fallback
    }
};

console.raw = console_log;

module.exports = console;

function logDetailedError(err, evalCode = null) {
    const time = new Date().toISOString();

    // Jika input bukan Error, langsung log biasa
    if (!(err instanceof Error)) {
        process.stderr.write(`${red}[ERROR ${time}]${reset} ${String(err)}\n`);
        return;
    }

    const stackLines = err.stack.split('\n');
    const locationLine = stackLines[1]?.trim();

    process.stderr.write(`${red}[ERROR ${time}]${reset} ${err.message}\n`);


    // ==== HANDLE FILE NORMAL ====
    const match = locationLine.match(/\((.*):(\d+):(\d+)\)/);
    if (!match) {
        process.stderr.write(`${gray}Location not found in stack trace${reset}\n`);
        return;
    }

    const [, filePath, line, column] = match;
    const lineNumber = parseInt(line, 10);
    const columnNumber = parseInt(column, 10);

    process.stderr.write(`${yellow}Location:${reset} ${filePath}:${lineNumber}:${columnNumber}\n`);

    try {
        const codeLines = fs.readFileSync(filePath, 'utf-8').split('\n');
        const start = Math.max(0, lineNumber - 3);
        const end = Math.min(codeLines.length, lineNumber + 2);

        for (let i = start; i < end; i++) {
            const lineNum = (i + 1).toString().padStart(4, ' ');
            const lineContent = codeLines[i];
            if (i + 1 === lineNumber) {
                const before = lineContent.slice(0, columnNumber - 1);
                const errorChar = lineContent[columnNumber - 1] || '';
                const after = lineContent.slice(columnNumber);
                process.stderr.write(`${red}>${reset}${lineNum} | ${before}${red}${errorChar}${reset}${after}\n`);
            } else {
                process.stderr.write(`${gray} ${lineNum} | ${lineContent}${reset}\n`);
            }
        }
    } catch {
        process.stderr.write(`${gray}Could not read source file for context.${reset}\n`);
    }


    // ==== HANDLE EVAL / REPL ====
    if (/eval|<anonymous>|REPL/.test(locationLine)) {
        const evalMatch = locationLine.match(/:(\d+):(\d+)\)?$/);
        const evalLine = evalMatch ? parseInt(evalMatch[1], 10) : null;
        const evalColumn = evalMatch ? parseInt(evalMatch[2], 10) : null;

        process.stderr.write(`${yellow}Location:${reset} Eval/REPL context\n`);

        if (evalCode) {
            const codeLines = evalCode.split('\n');
            const start = Math.max(0, (evalLine || 1) - 3);
            const end = Math.min(codeLines.length, (evalLine || 1) + 2);

            for (let i = start; i < end; i++) {
                const lineNum = (i + 1).toString().padStart(4, ' ');
                const lineContent = codeLines[i];

                if (evalLine && i + 1 === evalLine) {
                    const before = lineContent.slice(0, evalColumn - 1);
                    const errorChar = lineContent[evalColumn - 1] || '';
                    const after = lineContent.slice(evalColumn);
                    process.stderr.write(`${red}>${reset}${lineNum} | ${before}${red}${errorChar}${reset}${after}\n`);
                } else {
                    process.stderr.write(`${gray} ${lineNum} | ${lineContent}${reset}\n`);
                }
            }
        } else {
            process.stderr.write(`${gray}No source code available for eval context.${reset}\n`);
        }
        return;
    }
}