import React from 'react';

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

export default Parameters
