import './App.css';
import React, { Component } from 'react';
import tocbot from 'tocbot'
import Resource from './views/Resource.js';

class App extends Component {
  constructor() {
    super();
    this.state = { resources: [] };
  }

  componentDidMount() {
    fetch(process.env.REACT_APP_JSON_URL)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({resources: responseJson});
        tocbot.refresh()
      })
      .catch((error) => {
        console.error(error);
      });

    tocbot.init({
      tocSelector: '.navigation',
      contentSelector: '.content',
      headingSelector: 'h1, h2',
      headingsOffset: 20,
    });
  };

  render() {
    return (
      <div className="container">
        <div className="sidebar">
          <h1>{process.env.REACT_APP_TITLE || "API Docs"}</h1>
          <div className="navigation"></div>
        </div>
        <div className="background"></div>
        <div className="content">
          {this.state.resources.map((resource, index) =>
            <Resource key={index} resource={resource} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
