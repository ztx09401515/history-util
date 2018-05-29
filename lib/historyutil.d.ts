import History from '@types/history/index';


function getParam(history: History.History, paramName: string): string;

function eachParam(history: History.History, callback: (value: string, index: string) => void): void;

function mapParam(history: History.History, callback: (value: string, index: string) => any): Array;

function getQuery(pathReg: string, path: string, name: string): string;

function push(history: History.History, pathname: string, params: object): void;

function pushParam(history: History.History, params: object): void;

function cleanParam(history: History.History, paramnames: string[]): void;

export default {
    push,
    getQuery,
    getParam,
    eachParam,
    mapParam,
    cleanParam,
    pushParam
}
export {
    push,
    getQuery,
    getParam,
    eachParam,
    mapParam,
    cleanParam,
    pushParam
}