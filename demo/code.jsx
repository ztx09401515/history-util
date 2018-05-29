import React from 'react';
import ReactDOM from 'react-dom';
import hljs from 'highlight.js';
window.addEventListener('load', function () {
    const codeString="import React from 'react';\n" +
        "import ReactDOM from 'react-dom';\n" +
        "import {pushParam, mapParam} from '../src/historyutil.ts';\n" +
        "import {createBrowserHistory} from 'history'\n" +
        "\n" +
        "\n" +
        "class Page extends React.Component {\n" +
        "    state = {\n" +
        "        paramName: null,\n" +
        "        paramValue: null,\n" +
        "    }\n" +
        "    history = createBrowserHistory();\n" +
        "\n" +
        "    enter(event, value) {\n" +
        "        if (event.keyCode === 13) {\n" +
        "            this.setState({paramValue: value})\n" +
        "            var param = {};\n" +
        "            var name = this.state.paramName.trim();\n" +
        "            var arrayPat = /\\[]$/;\n" +
        "            var isarray = arrayPat.test(name);\n" +
        "            name = isarray ? name.replace('[]', '') : name;\n" +
        "            param[name] = isarray ? value.split('&') : value;\n" +
        "            pushParam(this.history, param);\n" +
        "            this.setState({})\n" +
        "        }\n" +
        "    }\n" +
        "\n" +
        "    render() {\n" +
        "        let state = this.state;\n" +
        "        return <div>\n" +
        "            <div>\n" +
        "                <label>paramName(array:&lt;name&gt;[],eg:listnames[]):</label>\n" +
        "                <input type=\"text\" onKeyPress={(e) => {\n" +
        "                    var event = e.nativeEvent, value = this.refs.valueInput.value;\n" +
        "                    this.enter(event, value);\n" +
        "                }} onChange={(e) => {\n" +
        "                    this.setState({paramName: e.target.value})\n" +
        "                }}/>\n" +
        "            </div>\n" +
        "            <div>\n" +
        "                <label>paramValue(array:&lt;value1&gt;&&lt;value2&gt;,eg:name1&name2):</label>\n" +
        "                <input ref={'valueInput'}\n" +
        "                       type=\"text\"\n" +
        "                       onKeyPress={(e) => {\n" +
        "                           var event = e.nativeEvent,\n" +
        "                               value = e.target.value;\n" +
        "                           this.enter(event, value);\n" +
        "                       }}/>\n" +
        "            </div>\n" +
        "            <div>\n" +
        "                <h3>Params</h3>\n" +
        "                {mapParam(this.history, (value, index) => {\n" +
        "                    if (value instanceof Array) {\n" +
        "                        var str = '[';\n" +
        "                        for (var v of value) {\n" +
        "                            str += v + ',';\n" +
        "                        }\n" +
        "                        str = str.replace(/,$/, '');\n" +
        "                        str += ']';\n" +
        "                        return <div key={index}><label>{index + ':'}</label><label>{str}</label></div>\n" +
        "                    } else {\n" +
        "                        return <div key={index}><label>{index + ':'}</label><label>{value}</label></div>\n" +
        "                    }\n" +
        "                })}\n" +
        "            </div>\n" +
        "        </div>\n" +
        "    }\n" +
        "}\n" +
        "\n" +
        "window.addEventListener('load', () => {\n" +
        "    ReactDOM.render(<Page></Page>, document.getElementById('approot'));\n" +
        "})";
    class Page extends React.Component{
        componentDidMount(){
            var nodes=hljs.highlightBlock(this.refs.code);
        }
        render(){
            return <div>
                <pre><code ref={'code'} className="jsx">
                    {codeString}
                </code></pre>
            </div>
        }
    }
    ReactDOM.render(<Page></Page>, window.document.getElementById("code"))
})