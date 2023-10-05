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

  /**
   * Propertys — `array`
   *
   *
   */
  properties?: Array<SanityKeyedReference<Property>>;
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
   * Property Image — `media`
   *
   *
   */
  image?: Media;

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

  /**
   * Units — `array`
   *
   *
   */
  unitsList?: Array<SanityKeyedReference<Unit>>;
}

/**
 * Property Type
 *
 *
 */
export interface PropertyType extends SanityDocument {
  _type: "propertyType";

  /**
   * Type Title — `string`
   *
   *
   */
  typeTitle?: string;

  /**
   * Type Value — `string`
   *
   *
   */
  typeValue?: string;

  /**
   * Related Cities — `array`
   *
   *
   */
  relatedCities?: Array<SanityKeyedReference<City>>;
}

/**
 * unit
 *
 *
 */
export interface Unit extends SanityDocument {
  _type: "unit";

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Available — `boolean`
   *
   *
   */
  available?: boolean;

  /**
   * Property — `reference`
   *
   *
   */
  property?: SanityReference<Property>;

  /**
   * Property Type — `reference`
   *
   *
   */
  propertyType?: SanityReference<PropertyType>;

  /**
   * Price — `string`
   *
   *
   */
  price?: string;

  /**
   * Area — `string`
   *
   *
   */
  area?: string;

  /**
   * Amenities — `richText`
   *
   *
   */
  amenities?: RichText;

  /**
   * Headline Image — `media`
   *
   *
   */
  headlineImage?: Media;

  /**
   * Photographs — `array`
   *
   *
   */
  photographs?: Array<SanityKeyed<Media>>;

  /**
   * Details — `richText`
   *
   *
   */
  details?: RichText;

  /**
   * Fact Sheet — `table`
   *
   *
   */
  factSheet?: Table;

  /**
   * Layout Images — `array`
   *
   *
   */
  layoutImages?: Array<SanityKeyed<Media>>;

  /**
   * More Info — `richText`
   *
   *
   */
  moreInfo?: RichText;
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
     *
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

export type Color = "black" | "white";

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

export type Figure = {
  _type: "figure";
  /**
   * Media — `media`
   *
   *
   */
  media?: Media;
};

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
   * Alternative text — `string`
   *
   * Important for SEO and accessiblity.
   */
  alt?: string;

  /**
   * caption — `richText`
   *
   *
   */
  caption?: RichText;

  /**
   * File — `file`
   *
   *
   */
  file?: { _type: "file"; asset: SanityReference<any> };
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

export type RichText = Array<SanityKeyed<SanityBlock>>;

export type PlainText = Array<SanityKeyed<SanityBlock>>;

export type Tooltip = {
  _type: "tooltip";
  /**
   * Linked Copy — `string`
   *
   *
   */
  linkedCopy?: string;

  /**
   * Tooltip Content — `plainText`
   *
   *
   */
  tooltipContent?: PlainText;
};

export type InventoryModule = {
  _type: "inventoryModule";
  /**
   * Headers — `array`
   *
   *
   */
  headers?: Array<SanityKeyed<string>>;

  /**
   * Rows — `table`
   *
   *
   */
  rows?: Table;
};

export type BlockContent = Array<
  | SanityKeyed<AccordionBlock>
  | SanityKeyed<CitiesBlock>
  | SanityKeyed<NewsletterBlock>
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
   * Headers — `array`
   *
   *
   */
  headers?: Array<SanityKeyed<string>>;

  /**
   * Cities — `array`
   *
   *
   */
  citiesList?: Array<SanityKeyedReference<City>>;

  /**
   * How It Works Content — `array`
   *
   *
   */
  howItWorksContent?: Array<SanityKeyed<Accordion>>;
};

export type NewsletterBlock = {
  _type: "newsletterBlock";
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

export type Documents =
  | City
  | Menus
  | Page
  | Property
  | PropertyType
  | Unit
  | SiteSettings;

/**
 * This interface is a stub. It was referenced in your sanity schema but
 * the definition was not actually found. Future versions of
 * sanity-codegen will let you type this explicity.
 */
type Table = any;
