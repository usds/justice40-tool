import * as React from 'react';
import {Table} from '@trussworks/react-uswds';
import * as constants from '../data/constants';

interface IPopupContentProps {
  properties: constants.J40Properties,
}


const PopupContent = ({properties}:IPopupContentProps) => {
  const readablePercent = (percent: number) => {
    return `${(percent * 100).toFixed(2)}%`;
  };

  const getCategorization = (percentile: number) => {
    let categorization;
    if (percentile >= 0.75 ) {
      categorization = 'Prioritized';
    } else if (0.60 <= percentile && percentile < 0.75) {
      categorization = 'Threshold';
    } else {
      categorization = 'Non-prioritized';
    }
    return categorization;
  };

  const getTitleContent = (properties: constants.J40Properties) => {
    const blockGroup = properties[constants.GEOID_PROPERTY];
    const score = properties[constants.SCORE_PROPERTY] as number;
    return (
      <table>
        <tbody>
          <tr>
            <td><strong>Census Block Group:</strong></td>
            <td>{blockGroup}</td>
          </tr>
          <tr>
            <td><strong>Just Progress Categorization:</strong></td>
            <td>{getCategorization(score)}</td>
          </tr>
          <tr>
            <td><strong>Cumulative Index Score:</strong></td>
            <td>{readablePercent(score)}</td>
          </tr>
        </tbody>
      </table>
    );
  };

  const getBodyContent = (properties: constants.J40Properties) => {
    const rows = [];
    for (const [key, value] of Object.entries(properties)) {
      // Filter out all caps
      if (!key.match(/^[A-Z0-9]+$/)) {
        rows.push(<tr key={key} >
          <td>{key}</td>
          <td>{value}</td>
        </tr>);
      }
    }
    return rows;
  };


  return (
    <>
      {properties ?
      <div>
        {getTitleContent(properties)}
        <Table bordered={false}>
          <thead>
            <tr>
              <th scope="col">Indicator</th>
              <th scope="col">Percentile(0-100)</th>
            </tr>
          </thead>
          <tbody>
            {getBodyContent(properties)}
          </tbody>
        </Table>
      </div> :
    '' }
    </>
  );
};

export default PopupContent;
