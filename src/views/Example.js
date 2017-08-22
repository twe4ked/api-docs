import React from 'react';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter, { registerLanguage } from "react-syntax-highlighter/dist/light"
import json from 'highlight.js/lib/languages/json';
import irBlack from 'react-syntax-highlighter/dist/styles/ir-black';
import Parameters from './Parameters.js';
import ResponseFields from './ResponseFields.js';
import RequestHeaders from './RequestHeaders.js';

registerLanguage('json', json);

const Example = ({example}) => {
  Object.assign(irBlack.hljs, {
    background: 'rgba(0, 0, 0, 0.25)',
    borderRadius: '3px',
    padding: '1rem',
    border: 'none',
  })

  return (
    <section>
      <div className="left">
        <div className="padding">
          <h2 id={example.name.toLowerCase().replace(/[^a-z]/g, '-')}>{example.name}</h2>
          { !!example.description &&
            <ReactMarkdown source={example.description} />
          }
          { Object.keys(example.notes).map((level, index) =>
              <p key={index} className={`note --${level}`}>{example.notes[level]}</p>
            )
          }
          <code className="path">
            {example.httpMethod} <strong>{example.path}</strong>
          </code>
          { !!example.parameters.length && <Parameters parameters={example.parameters} /> }
          { <RequestHeaders requestHeaders={example.requests[0].requestHeaders} /> }
          { !!example.responseFields.length && <ResponseFields responseFields={example.responseFields} /> }
        </div>
      </div>

      <div className="right">
        <div className="padding">
          {example.requests.map((request, index) =>
            <div key={index}>
              <code>{`${request.requestMethod} ${request.requestPath}`}</code>
              <br />
              <code className="response-status">{`${request.responseStatus} ${request.responseStatusText}`}</code>
              <SyntaxHighlighter language='json' style={irBlack}
                codeTagProps={{style: {fontFamily: 'inherit', fontSize: 'inherit'} }}>
                  {JSON.stringify(JSON.parse(request.responseBody), null, 2)}
              </SyntaxHighlighter>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Example
