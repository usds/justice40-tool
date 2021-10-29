declare namespace LanguageNamespace {
    export interface ILanguageScss {
        languageContainer: string;
        languageIcon: string;
    }
  }

declare const LanguageScssModule: LanguageNamespace.ILanguageScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: LanguageNamespace.ILanguageScss;
  };

  export = LanguageScssModule;
