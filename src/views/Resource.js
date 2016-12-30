import React from 'react';
import Example from './Example.js';
import SimpleFormat from 'react-simple-format';

const Resource = ({resource}) => {
  return (
    <div>
      <div className="resource-info">
        <div className="padding">
          <h1 id={resource.name.toLowerCase().replace(/[^a-z]/g, '-')}>{resource.name}</h1>
          { !!resource.description &&
            <SimpleFormat text={resource.description} />
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
