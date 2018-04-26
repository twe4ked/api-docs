import React from 'react';
import Example from './Example.js';
import ReactMarkdown from 'react-markdown';

const Resource = ({resource}) => {
  function sanitizeId(input) {
    return input.toLowerCase().replace(/[^\w]/g, '-')
  }

  return (
    <div>
      <div className="resource-info">
        <div className="padding">
          <h1 id={sanitizeId(resource.name)}>{resource.name}</h1>
          { !!resource.description &&
            <ReactMarkdown source={resource.description} />
          }
        </div>
      </div>
      {resource.examples.map((example, index) =>
        <Example key={index} example={example} resourceName={resource.name} sanitizeId={sanitizeId} />
      )}
    </div>
  )
}

export default Resource
