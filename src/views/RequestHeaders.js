import React from 'react';

const RequestHeaders = ({requestHeaders}) => {
  return (
    <div>
      <h3>Request Headers</h3>
      <table>
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(requestHeaders).map((key, index) =>
            !!requestHeaders[key] &&
              <tr key={index}>
                <td><code className="inline">{key}</code>
                </td><td>
                  <code className="inline">{requestHeaders[key]}</code></td>
              </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default RequestHeaders
