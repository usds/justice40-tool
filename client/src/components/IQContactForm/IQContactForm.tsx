import React from 'react';

import * as CONTACT_COPY from '../../data/copy/contact';

interface IIQContactForm {
    messageType: string
  }

const IQContactForm = ({messageType}:IIQContactForm) => {
  if (messageType === '') return null;
  if (messageType === CONTACT_COPY.MESSAGE_TYPES.BUG_REPORT.defaultMessage) {
    return <iframe title="Bug Report Form" frameBorder="0" src="https://iqconnect.iqfed.com/iqextranet/EForm.aspx?__cid=46PREPROD1&__fid=100035&iframe=Y" width="100%" height="891"></iframe>;
  } else {
    return <iframe title="Feedback Form" frameBorder="0" src="https://iqconnect.iqfed.com/iqextranet/EForm.aspx?__cid=46PREPROD1&__fid=100039&iframe=Y" width="100%" height="579"></iframe>;
  }
};

export default IQContactForm;
