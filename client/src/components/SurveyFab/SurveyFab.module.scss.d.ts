declare namespace SurveyFabNamespace {
    export interface ISurveyFabScss {
        surveyFabContainer: string;
    }
  }

declare const SurveyFabScssModule: SurveyFabNamespace.ISurveyFabScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: SurveyFabNamespace.ISurveyFabScss;
  };

  export = SurveyFabScssModule;
