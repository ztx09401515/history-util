import React from 'react';
import ReactDOM from 'react-dom';
import {pushParam, mapParam} from '../src/historyutil.ts';
import {createBrowserHistory} from 'history'


class Page extends React.Component {
    state = {
        paramName: null,
        paramValue: null,
    }
    history = createBrowserHistory();

    enter(event, value) {
        if (event.keyCode === 13) {
            this.setState({paramValue: value})
            var param = {};
            var name = this.state.paramName.trim();
            var arrayPat = /\[]$/;
            var isarray = arrayPat.test(name);
            name = isarray ? name.replace('[]', '') : name;
            param[name] = isarray ? value.split('&') : value;
            pushParam(this.history, param);
            this.setState({})
        }
    }

    render() {
        let state = this.state;
        return <div>
            <div>
                <label>paramName(array:&lt;name&gt;[],eg:listnames[]):</label>
                <input type="text" onKeyPress={(e) => {
                    var event = e.nativeEvent, value = this.refs.valueInput.value;
                    this.enter(event, value);
                }} onChange={(e) => {
                    this.setState({paramName: e.target.value})
                }}/>
            </div>
            <div>
                <label>paramValue(array:&lt;value1&gt;&&lt;value2&gt;,eg:name1&name2):</label>
                <input ref={'valueInput'}
                       type="text"
                       onKeyPress={(e) => {
                           var event = e.nativeEvent,
                               value = e.target.value;
                           this.enter(event, value);
                       }}/>
            </div>
            <div>
                <h3>Params</h3>
                {mapParam(this.history, (value, index) => {
                    if (value instanceof Array) {
                        var str = '[';
                        for (var v of value) {
                            str += v + ',';
                        }
                        str = str.replace(/,$/, '');
                        str += ']';
                        return <div key={index}><label>{index + ':'}</label><label>{str}</label></div>
                    } else {
                        return <div key={index}><label>{index + ':'}</label><label>{value}</label></div>
                    }
                })}
            </div>
        </div>
    }
}

window.addEventListener('load', () => {
    ReactDOM.render(<Page></Page>, document.getElementById('approot'));
})