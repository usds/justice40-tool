# Design to developer pipeline
This document tries to capture the process for designers and developers
- Designer process
- Developer process

## Designer process
- Designers are using a Sketch library from USWDS to ensure elements brought into the design are using USWDS
components and tokens.
- <h> and <p> tags were defined using USWDS spacing, color, and typography tokens.
- Designs show <h> and <p> tags in context using realistic content (though content is subject to change).
- Designs also show additional spacing tokens used for containers.
- Designs show the various breakpoints (using USWDS tokens as guidance) to indicate how elements shift between
narrow and wide screen widths.
- If there is not a USWDS component available to fulfill an interaction need, a custom design is created,
keeping in mind scalability, the larger design system, and responsiveness.

## Developer process
There are a number of ways that the app is styled.
- global.scss
- trusswork styling
- sass modules (component level)
- map styling

### global.scss
This file is meant to be central location to capture all global styles that appear on all pages for reusables HTML
elements. This global sass file is in the styles folder. The theme folder in the styles folder houses all the styles
from USWDS.

The structure of the global.scss file is in accordance to the fundamental usage of USWDS:
https://designsystem.digital.gov/documentation/fundamentals/

There are 3 things that should be included in this file:
1. Include or point to a USWDS settings file:
- `@import "./uswds-settings.scss"`

2. Point to the USWDS source code:
- `@import "../../node_modules/uswds"`

3. Include or point to your project's custom Sass. This is the bulk of the file and may be separated out in the future.

Adding the following to the uswds-settings.scss file allows us to use the grid-prefixes and utilty mixins:

```
$theme-namespace: (
  "grid": (
    namespace: "grid-",
    output: true,
  ),
  "utility": (
    namespace: "u-",
    output: true,
  ),
);
```

With these available to the global.scss file, developers can implement designs that refer to tokens identified in the
designs.

### Trusswork styling
When importing a component from Trussworks, their components can be styled directly in-line with classes. A good
example of this is the Grid component.

### SASS modules
Each component has its own styling. This offers a way to keep the global.scss minimal with global styles only. It's
still TBD on how to get the USWDS styles to apply directly to components.

### Map styling
The map's styling is largely outside of SASS. It controlled via data/mapStyle.tsx
