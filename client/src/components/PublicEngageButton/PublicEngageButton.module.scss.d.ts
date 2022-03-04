declare namespace PublicEngagementButton {
    export interface IPublicEventScss {
        tag: string;
        tagContainer: string;
        container: string;
        link: string;
    }
  }

declare const PublicEventScssModule: PublicEngagementButton.IPublicEventScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: PublicEngagementButton.IPublicEventScss;
  };

  export = PublicEventScssModule;
