import React from 'react';
import {render} from '@testing-library/react';
import {PageAlerts} from './PageAlerts';
import {LocalizedComponent} from '../test/testHelpers';

describe('PageAlert', () => {
  const alertBetaTitle = `Public beta`;
  const alertDataLimitTitle = `Limited data sources`;

  it('renders correctly', () => {
    const {asFragment} = render(<LocalizedComponent><PageAlerts/></LocalizedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders only info', async () => {
    const {baseElement} = await render(
        <LocalizedComponent>
          <PageAlerts/>
        </LocalizedComponent>);
    // WARNING:
    // The following line is standard BUT DOES NOT WORK. I think it has to do
    // with jest and intl issues. `baseElement.textContent` is a work around
    // expect(await screen.getAllByText(alertBetaTitle)).toBeInTheDocument();

    const textElement = baseElement.textContent;
    expect(textElement).toContain(alertBetaTitle);
    expect(textElement).not.toContain(alertDataLimitTitle);
  });

  it('renders only warning', async () => {
    const {baseElement} = render(
        <LocalizedComponent>
          <PageAlerts betaWarning={false} dataSourceWarning={true}/>
        </LocalizedComponent>);
    const textElement = baseElement.textContent;
    expect(textElement).not.toContain(alertBetaTitle);
    expect(textElement).toContain(alertDataLimitTitle);
  });

  it('renders both', async () => {
    const {baseElement} = render(
        <LocalizedComponent>
          <PageAlerts betaWarning={true} dataSourceWarning={true}/>
        </LocalizedComponent>);
    const textElement = baseElement.textContent;
    expect(textElement).toContain(alertBetaTitle);
    expect(textElement).toContain(alertDataLimitTitle);
  });
});
