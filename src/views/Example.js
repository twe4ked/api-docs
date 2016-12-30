import React from 'react';
import SimpleFormat from 'react-simple-format';
import SyntaxHighlighter, { registerLanguage } from "react-syntax-highlighter/dist/light"
import json from 'highlight.js/lib/languages/json';
import irBlack from 'react-syntax-highlighter/dist/styles/ir-black';
import Parameters from './Parameters.js';
import ResponseFields from './ResponseFields.js';

registerLanguage('json', json);

const Example = ({example}) => {
  return (
    <section>
      <div className="left">
        <div className="padding">
          <h2 id={example.name.toLowerCase().replace(/[^a-z]/g, '-')}>{example.name}</h2>
          { !!example.description &&
            <SimpleFormat text={example.description} />
          }
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
  )
}

export default Example
