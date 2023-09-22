import type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
} from "sanity-codegen";

export type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
};

/**
 * City
 *
 *
 */
export interface City extends SanityDocument {
  _type: "city";

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Active — `boolean`
   *
   *
   */
  active?: boolean;
}

/**
 * Menus
 *
 *
 */
export interface Menus extends SanityDocument {
  _type: "menus";

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Menu Items — `array`
   *
   *
   */
  items?: Array<SanityKeyed<MenuItem>>;
}

/**
 * Page
 *
 *
 */
export interface Page extends SanityDocument {
  _type: "page";

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Preview Image — `image`
   *
   *
   */
  previewImage?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Body — `blockContent`
   *
   *
   */
  body?: BlockContent;

  /**
   * SEO — `seo`
   *
   *
   */
  seo?: Seo;
}

/**
 * Property
 *
 *
 */
export interface Property extends SanityDocument {
  _type: "property";

  /**
   * Header — `richText`
   *
   *
   */
  header?: RichText;

  /**
   * Image — `image`
   *
   *
   */
  image?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * coordinates — `coordinates`
   *
   *
   */
  coordinates?: Coordinates;

  /**
   * Description — `richText`
   *
   *
   */
  description?: RichText;

  /**
   * Location — `reference`
   *
   *
   */
  location?: SanityReference<City>;
}

/**
 * Site Settings
 *
 *
 */
export interface SiteSettings extends SanityDocument {
  _type: "siteSettings";

  /**
   * Site Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Site Description — `text`
   *
   *
   */
  description?: string;

  /**
   * Site Image — `image`
   *
   *
   */
  image?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Keyphrase — `string`
   *
   * Phrase that you want your site to rank for.
   */
  siteKeywords?: string;

  /**
   * Main Menu — `reference`
   *
   * Select menu for main navigation
   */
  mainMenu?: SanityReference<Menus>;
}

export type Link = {
  _type: "link";
  /**
   * Internal link — `object`
   *
   *
   */
  internalLink?: {
    _type: "internalLink";
    /**
     * reference — `reference`
     *
     *
     */
    reference?: SanityReference<Page>;

    /**
     * Anchor Slug — `slug`
     *
     * Optional block slug to scroll to
     */
    anchor?: { _type: "anchor"; current: string };
  };

  /**
   * External Link — `url`
   *
   *
   */
  externalLink?: string;
};

export type Accordion = {
  _type: "accordion";
  /**
   * Accordion Header — `string`
   *
   *
   */
  header?: string;

  /**
   * Accordion Text — `richText`
   *
   *
   */
  text?: RichText;
};

export type Cta = {
  _type: "cta";
  /**
   * Text — `string`
   *
   *
   */
  text?: string;

  /**
   * Link — `link`
   *
   *
   */
  link?: Link;
};

export type Coordinates = {
  _type: "coordinates";
  /**
   * Latitude — `string`
   *
   *
   */
  lat?: string;

  /**
   * Longitude — `string`
   *
   *
   */
  long?: string;
};

export type Color = "black" | "white";

export type Media = {
  _type: "media";
  /**
   * image — `image`
   *
   *
   */
  image?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * caption — `richText`
   *
   *
   */
  caption?: RichText;
};

export type Figure = {
  _type: "figure";
  /**
   * Media — `media`
   *
   *
   */
  media?: Media;
};

export type Seo = {
  _type: "seo";
  /**
   * SEO Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Meta Description — `string`
   *
   *
   */
  description?: string;

  /**
   * Keyphrase — `string`
   *
   * A phrase that you want your post or page to rank for.
   */
  keywords?: string;

  /**
   * Keyword/Keyphrase Synonyms — `string`
   *
   *
   */
  synonyms?: string;
};

export type MenuItem = {
  _type: "menuItem";
  /**
   * Menu Item Text — `string`
   *
   *
   */
  text?: string;

  /**
   * Menu Item URL — `link`
   *
   *
   */
  link?: Link;
};

export type RichText = Array<SanityKeyed<SanityBlock> | SanityKeyed<Media>>;

export type PlainText = Array<SanityKeyed<SanityBlock>>;

export type BlockContent = Array<
  | SanityKeyed<AccordionBlock>
  | SanityKeyed<CitiesBlock>
  | SanityKeyed<TextBlock>
  | SanityKeyed<WaitlistBlock>
>;

export type AccordionBlock = {
  _type: "accordionBlock";
  /**
   * Accordions — `array`
   *
   *
   */
  accordions?: Array<SanityKeyed<Accordion>>;
};

export type CitiesBlock = {
  _type: "citiesBlock";
  /**
   * Cities — `array`
   *
   *
   */
  citiesList?: Array<SanityKeyedReference<City>>;
};

export type TextBlock = {
  _type: "textBlock";
  /**
   * Text — `richText`
   *
   *
   */
  text?: RichText;
};

export type WaitlistBlock = {
  _type: "waitlistBlock";
  /**
   * Header — `string`
   *
   *
   */
  header?: string;

  /**
   * Text — `plainText`
   *
   *
   */
  text?: PlainText;

  /**
   * Audience ID — `string`
   *
   *
   */
  audienceId?: string;

  /**
   * Form Type — `string`
   *
   *
   */
  formType?: "general" | "unit";
};

export type Documents = City | Menus | Page | Property | SiteSettings;
