// / <reference types="Cypress" />

describe('Will it zoom into territories correctly?',
    {
      retries: {
        runMode: 3,
        openMode: 3,
      },
      defaultCommandTimeout: 4000,
      execTimeout: 10000,
      taskTimeout: 10000,
      pageLoadTimeout: 10000,
      requestTimeout: 5000,
      responseTimeout: 10000,
    },
    () => {
      beforeEach(() => {
        cy.viewport('macbook-13');
        cy.visit('http://localhost:8000/en/cejst');
      });

      // The below values all assume a 13-inch MB as set in viewport above.
      // Values will be different for different screens

      // Removing z as each tests has variance on it's value
      const tests = {
        'Lower 48': '3/33.47/-97.5',

        // Todo: Understand what causes these two to hang intermittently ticket #579
        // 'Puerto Rico': '7.71/18.2/-66.583',
        // 'Alaska': '3/63.28/-162.39',
        // 'American Samoa': '6.55/-13.804/-171.117',
        // 'Commonwealth of Northern Mariana Islands': '5.98/16.901/145.472',
        // 'Hawaii': '5.73/20.657/-157.697',
      };
      for (let i=0; i<1; i++) {
        for (const [territory, zxy] of Object.entries(tests)) {
          it(`Can focus on ${territory} `, () => {
            cy.getMap().then((map) => {
              cy.get(`[aria-label="Focus on ${territory}"]`).click();
              cy.waitForMapIdle(map);
              cy.log(cy.url());
              cy.url().should('include', zxy);
            });
          });
        };
      }
    });
