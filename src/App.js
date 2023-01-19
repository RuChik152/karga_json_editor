import React, { Component } from 'react';

import axios from 'axios'

import JSONEditorDemo from './JSONEditorDemo';
import './App.css';

class App extends Component {
  state = {
    json: {
      // array: [1, 2, 3, 4, 5],
      // 'boolean': true,
      // 'null': null,
      // 'number': 123,
      // 'object': {'a': 'b', 'c': 'd'},
      // 'string': 'Hello World'
    }
  };

  async getSettingsData() {
    const request = await axios.get('http://localhost:5555/dev-client/63c7db2b426ebe25623e921a');
    return request.data
  }

  async updateSettingsData() {
    const request = await axios.put('http://localhost:5555/dev-client/63c7db2b426ebe25623e921a', this.state.json);
    return request
  }

  componentDidMount () {
      this.getSettingsData().then((data) => this.setState({json: data}))
  }

  render() {
    return (
      <div className="app">
        <h1>JSONEditor React demo</h1>
        <div className="contents">
          <div className="menu">
            <button onClick={this.updateTime}>
              Create/update a field "time"
            </button>
          </div>
          <JSONEditorDemo
              json={this.state.json}
              onChangeJSON={this.onChangeJSON}
          />
          <div className="code">
            <pre>
              <code>
                {JSON.stringify(this.state.json, null, 2)}
              </code>
            </pre>
          </div>
        </div>
      </div>
    );
  }

  onChangeJSON = (json) => {
    this.setState({ json });
  };

  updateTime = () => {
    const time = new Date().toISOString();

    this.setState({
      json: Object.assign({}, this.state.json, { time })
    })

    this.updateSettingsData().then((data) => console.log('data', data))

  };
}

export default App;
