import React from 'react';
import Example from './Example.js';
import ReactMarkdown from 'react-markdown';

const Resource = ({resource}) => {
  return (
    <div>
      <div className="resource-info">
        <div className="padding">
          <h1 id={resource.name.toLowerCase().replace(/[^a-z]/g, '-')}>{resource.name}</h1>
          { !!resource.description &&
            <ReactMarkdown source={resource.description} />
          }
        </div>
      </div>
      {resource.examples.map((example, index) =>
        <Example key={index} example={example} />
      )}
    </div>
  )
}

export default Resource
