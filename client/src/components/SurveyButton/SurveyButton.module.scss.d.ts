declare namespace SurveyButtonNamespace {
    export interface ISurveyButtonScss {
        surveyButton: string;
        surveyButtonContainer: string;
        launchIcon: string;
    }
  }

declare const SurveyButtonScssModule: SurveyButtonNamespace.ISurveyButtonScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: SurveyButtonNamespace.ISurveyButtonScss;
  };

  export = SurveyButtonScssModule;
