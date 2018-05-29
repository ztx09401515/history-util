history-util
==========
### API

#### getParam(history: History.History, paramName: string): string;

#### eachParam(history: History.History, callback: (value: string, index: string) => void): void;

#### mapParam(history: History.History, callback: (value: string, index: string) => any): Array;

#### getQuery(pathReg: string, path: string, name: string): string;

#### push(history: History.History, pathname: string, params: object): void;

#### pushParam(history: History.History, params: object): void;

#### cleanParam(history: History.History, paramnames: string[]): void;