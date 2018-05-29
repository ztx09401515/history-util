import _ from 'underscore'
import pathToReg from 'path-to-regexp';
import History from '@types/history/index';
function getParam(history:History.History,paramName:string) {
    var reg=new RegExp('[?&]('+paramName+')(\[])?=([^?\/\s\\=]*)(?=&([\w]+)(\[])?=([^?\/\s\\=]*)|$)');
    var result=reg.exec(history.location.search);
    if(result&&result[1]){
        var value=result[2]?result[3].split('&'):result[3].replace('&','');
        return value;
    }else{
        return null
    }
}
function eachParam(history:History.History,callback){
    var reg=/[?&]([\w]+)(\[])?=([^?\/\s\\=]*)(?=&([\w]+)(\[])?=([^?\/\s\\=]*)|$)/g;
    let result;
    while((result=reg.exec(history.location.search))){
        var value=result[2]?result[3].split('&'):result[3].replace('&','');
        callback(value,result[1]);
    }
}
function mapParam(history:History.History,callback){
    var reg=/[?&]([\w]+)(\[])?=([^?\/\s\\=]*)(?=&([\w]+)(\[])?=([^?\/\s\\=]*)|$)/g;
    var ret=[];
    let result;
    while((result=reg.exec(history.location.search))){
        var value=result[2]?result[3].split('&'):result[3].replace('&','');
        ret.push(callback(value,result[1]));
    }
    return ret;
}
function getQuery(pathReg,path,name){
    var paramNamePat=/:(\w+)/g
    var paramNameResult;
    var paramnames=[]
    while((paramNameResult=paramNamePat.exec(pathReg))){
        paramnames.push(paramNameResult[1])
    }
    var pat=pathToReg(pathReg)
    var result=pat.exec(path);
    if(result){
        var target;
        paramnames.forEach((paramname,index)=>{
            if(paramname==name){
                target=result[index+1]
            }
        })
        return target;
    }else{
        return null
    }
}
function push(history:History.History,pathname,params:object){
    var nSearch=figureSearch(history,params);
    history.push({pathname:pathname,search:nSearch})
}

function rawSearch(params:object){
    let resultSearch='',count=0;
    _.each(params, (param, index) => {
        if(param instanceof Array) {
            var array='';
            _.each(param,(el,aindex)=>{
                array+=el+(aindex===param.length-1?'':'&');
            });
            resultSearch+=(count===0?'?':'&')+index + '[]=' + array
        }else {
            resultSearch +=(count===0?'?':'&')+index + '=' + param ;
        }
        count++;
    });
    return resultSearch;
}

function figureSearch(history:History.History,params:object){
    let location = history.location;
    let search = history.location.search;
    let nSearch='';
    if (params&&typeof params==='object') {
        if (search === null || search === '') {
            nSearch = nSearch + '?';
        }
        let nparams={}
        eachParam(history,(value,index)=>{
            if(value!==null&&params[index]!==null) {
                nparams[index] = value;
            }
        })

        _.each(params, (param, index) => {
            if(param!==null) {
                    nparams[index] = param;
            }
        })

        nSearch=rawSearch(nparams);
    }else{
        nSearch=search;
    }
    return nSearch;
}

function pushParam(history:History.History, params) {
    var pathname=history.location.pathname;
    var nSearch=figureSearch(history,params)
    history.push({pathname: pathname, search: nSearch});
}
function cleanParam(history:History.History,paramnames){
    let location = history.location;
    let search = history.location.search;
   var nparams={};
    eachParam(history,(value,index)=>{
        if(!_.contains(paramnames,index)){
           nparams[index]=value;
        }
    })
    let nSearch=rawSearch(nparams);
    history.push({pathname:location.pathname,search:nSearch})
}
export default{
    push,
    getQuery,
    getParam,
    eachParam,
    mapParam,
    cleanParam,
    pushParam
}
export{
   push,
    getQuery,
    getParam,
    eachParam,
    mapParam,
    cleanParam,
    pushParam
}