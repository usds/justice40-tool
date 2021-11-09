import React from 'react';
import {navigate} from 'gatsby-plugin-intl';

// Contexts:
import {useFlags} from '../../contexts/FlagContext';

// Components:
import {Fab} from 'react-tiny-fab';

const surveyFabContainer: React.CSSProperties = {
  width: '100%',
  borderRadius: '4px',
  padding: '0 8px',
  backgroundColor: '#face00',
  color: '#1c1c1c',
};


const SurveyFab = () => {
  const flags = useFlags();

  return 'ips' in flags ? (
        <Fab
          mainButtonStyles={surveyFabContainer}
          icon={'Take our survey'}
          onClick={() => navigate('/survey')}
        />
  ) : (
        <Fab
          mainButtonStyles={surveyFabContainer}
          icon={'Take our survey'}
          onClick={() => Object.assign(document.createElement('a'), {target: '_blank', href: 'https://www.surveymonkey.com/r/cejst-survey'}).click()}
        />
  )
  ;
};

export default SurveyFab;
