# How to i18n copy for J40

We are using the following two libraries to achieve internationalization (i18n):

- react-intl
- gatsby-plugin-intl

Some common functions used by these libraries are:

```
import {defineMessages} from 'react-intl';
import {FormattedDate, FormattedMessage, FormattedNumber} from 'gatsby-plugin-intl';
```

When we are using a place text function with no links, or rich-text formatting, it is suggested to use `defineMessages`.

When we do have to apply rich-text formatting, we can achieve this with `FormattedDate`.

When havin to add Dates or Numbers, we can can use `FormattedDate` and `FormattedNumber` respectively.

More examples can be found [here](https://github.com/formatjs/formatjs/blob/main/packages/react-intl/examples/Messages.tsx)