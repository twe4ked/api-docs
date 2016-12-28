import './App.css';
import React, { Component } from 'react';
import tocbot from 'tocbot'
import SyntaxHighlighter, { registerLanguage } from "react-syntax-highlighter/dist/light"
import json from 'highlight.js/lib/languages/json';
import irBlack from 'react-syntax-highlighter/dist/styles/ir-black';
registerLanguage('json', json);

const Parameters = ({parameters}) => {
  return (
    <div>
      <h3>Parameters</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {parameters.map((parameter, index) =>
            <tr key={index}>
              <td>
                <code className="inline">{parameter.name}</code>
                { parameter.required &&
                  <abbr title="required">*</abbr>
                }
              </td>
              <td>{parameter.description}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

const ResponseFields = ({responseFields}) => {
  return (
    <div>
      <h3>Response Fields</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {responseFields.map((field, index) =>
            <tr key={index}>
              <td><code className="inline">{field.name}</code></td>
              <td>{field.description}</td>
              <td>{field.type}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

const Resource = ({resource}) => {
  return (
    <div className="resource">
      <div className="padding">
        <h1 id={resource.name.toLowerCase().replace(/[^a-z]/g, '-')}>{resource.name}</h1>
        { !!resource.description &&
          <p>{resource.description}</p>
        }
      </div>
      {resource.examples.map((example, index) =>
        <section key={index}>
          <div className="left">
            <div className="padding">
              <h2 id={example.name.toLowerCase().replace(/[^a-z]/g, '-')}>{example.name}</h2>
              <p>{example.description}</p>
              <code className="path">
                {example.httpMethod} <strong>{example.path}</strong>
              </code>
              { !!example.parameters.length && <Parameters parameters={example.parameters} /> }
              { !!example.responseFields.length && <ResponseFields responseFields={example.responseFields} /> }
            </div>
          </div>
          <div className="right">
            <div className="padding">
              {example.requests.map((request, index) =>
                <div key={index}>
                  <code>{`${request.request_method} ${request.request_path}`}</code>
                  <SyntaxHighlighter language='json' style={irBlack}>
                    {JSON.stringify(JSON.parse(request.response_body), null, 2)}
                  </SyntaxHighlighter>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

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
        <div className="navigation"></div>
        <div className="background"></div>
        <div className="content">
          {this.state.resources.map((resource, index) =>
            <Resource key={index}
              resource={resource}
              resources={this.state.resources}></Resource>
          )}
        </div>
      </div>
    );
  }
}

export default App;
