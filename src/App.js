import './App.css';
import React, { Component } from 'react';
import tocbot from 'tocbot'
import Resource from './views/Resource.js';
import Login from './views/Login.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      resources: [],
      authorized: true,
    };
  }

  fetchData(headers) {
    fetch(process.env.REACT_APP_JSON_URL, {headers: headers, credentials: "cors"})
      .then((response) => {
        if (response.status === 401) {
          this.setState({authorized: false});
        } else {
          this.setState({authorized: true});
          return response;
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({resources: responseJson});
        tocbot.refresh()
        var anchor = document.getElementById(window.location.hash.slice(1))
        anchor && anchor.scrollIntoView()
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount() {
    this.fetchData();

    tocbot.init({
      tocSelector: '.navigation',
      contentSelector: '.content',
      headingSelector: 'h1, h2',
      headingsOffset: 80,
    });
  };

  render() {
    return (
      <div className="container">
        <div className="sidebar">
          <h1><a href="#">{process.env.REACT_APP_TITLE || "API Docs"}</a></h1>
          <div className="navigation"></div>
        </div>
        <div className="background"></div>
        <div className="content">
          {!this.state.authorized && <Login fetchData={this.fetchData.bind(this)} />}
          {this.state.resources.map((resource, index) =>
            <Resource key={index} resource={resource} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
