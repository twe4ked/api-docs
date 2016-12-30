import React from 'react';

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

export default ResponseFields
