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
 * Page
 *
 *
 */
export interface Brand extends SanityDocument {
  _type: "brand";

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
 * Page
 *
 *
 */
export interface Buy extends SanityDocument {
  _type: "buy";

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
   * Units List — `array`
   *
   *
   */
  unitsList?: Array<SanityKeyedReference<Unit>>;

  /**
   * SEO — `seo`
   *
   *
   */
  seo?: Seo;
}

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
   * Property Link — `link`
   *
   *
   */
  propertyLink?: Link;
}

/**
 * Inventory
 *
 *
 */
export interface Inventory extends SanityDocument {
  _type: "inventory";

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Unit — `reference`
   *
   *
   */
  unit?: SanityReference<Unit>;

  /**
   * Inventory Items — `array`
   *
   *
   */
  items?: Array<
    SanityKeyed<{
      _type: "inventoryItem";
      /**
       * Title — `string`
       *
       *
       */
      title?: string;

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
    }>
  >;
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
   * Password — `string`
   *
   * Password protect this page
   */
  password?: string;

  /**
   * Hide Menu Button — `boolean`
   *
   * Hide apply or tour button in header
   */
  hideMenuButton?: boolean;

  /**
   * Show Tour Link — `boolean`
   *
   * Show the tour link in the header instead of apply
   */
  showTourLink?: boolean;

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
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Long Title — `richText`
   *
   * Used on the Properties Block property link
   */
  longTitle?: RichText;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Available — `boolean`
   *
   *
   */
  available?: boolean;

  /**
   * Header Text — `string`
   *
   * Used for page breadcrumb
   */
  headerText?: string;

  /**
   * Body — `blockContent`
   *
   *
   */
  body?: BlockContent;

  /**
   * Location — `reference`
   *
   *
   */
  location?: SanityReference<City>;

  /**
   * Property Images — `array`
   *
   *
   */
  propertyImages?: Array<SanityKeyed<Media>>;

  /**
   * Property Types — `array`
   *
   *
   */
  propertyTypesList?: Array<SanityKeyedReference<PropertyType>>;

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
   * SEO — `seo`
   *
   *
   */
  seo?: Seo;
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
   * Header Text — `string`
   *
   *
   */
  headerText?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

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
   * Photographs — `array`
   *
   *
   */
  photographs?: Array<SanityKeyed<Media>>;

  /**
   * Summary — `richText`
   *
   *
   */
  summary?: RichText;

  /**
   * More Info — `richText`
   *
   *
   */
  moreInfo?: RichText;

  /**
   * Inventory — `reference`
   *
   *
   */
  inventory?: SanityReference<Inventory>;

  /**
   * Unit Details — `richText`
   *
   *
   */
  unitDetails?: RichText;

  /**
   * Layout Images — `array`
   *
   *
   */
  layoutImages?: Array<SanityKeyed<Media>>;

  /**
   * Body — `blockContent`
   *
   *
   */
  body?: BlockContent;

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
   * SEO — `seo`
   *
   *
   */
  seo?: Seo;
}

/**
 * R+D Page
 *
 *
 */
export interface RdPage extends SanityDocument {
  _type: "rdPage";

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
   * Header Text — `string`
   *
   *
   */
  headerText?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Hide Menu Button — `boolean`
   *
   * Hide apply or tour button in header
   */
  hideMenuButton?: boolean;

  /**
   * Show Tour Link — `boolean`
   *
   * Show the tour link in the header instead of apply
   */
  showTourLink?: boolean;

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
   * Address — `richText`
   *
   *
   */
  address?: RichText;

  /**
   * coordinates — `coordinates`
   *
   *
   */
  coordinates?: Coordinates;

  /**
   * Price — `string`
   *
   *
   */
  price?: string;

  /**
   * Hide Price — `boolean`
   *
   * Hide the price except on dossier page
   */
  hidePrice?: boolean;

  /**
   * Crypto Price — `string`
   *
   *
   */
  cryptoPrice?: string;

  /**
   * Area — `string`
   *
   *
   */
  area?: string;

  /**
   * Bedrooms — `number`
   *
   *
   */
  bedrooms?: number;

  /**
   * Bathrooms — `number`
   *
   *
   */
  bathrooms?: number;

  /**
   * Fact Sheet — `table`
   *
   *
   */
  factSheet?: Table;

  /**
   * CTAs — `array`
   *
   *
   */
  ctas?: Array<SanityKeyed<Cta>>;

  /**
   * Photographs — `array`
   *
   *
   */
  photographs?: Array<SanityKeyed<Media>>;

  /**
   * Unit List Photo Limit — `number`
   *
   * Limit the number of photos shown on the property
   */
  photoLimit?: number;

  /**
   * First Content Block — `richText`
   *
   *
   */
  summary?: RichText;

  /**
   * Inventory — `reference`
   *
   *
   */
  inventory?: SanityReference<Inventory>;

  /**
   * Second Content Block — `richText`
   *
   *
   */
  unitDetails?: RichText;

  /**
   * Layout Images — `array`
   *
   *
   */
  layoutImages?: Array<SanityKeyed<Media>>;

  /**
   * Closing Documents — `file`
   *
   * Upload closing documents zip file here
   */
  closingDocuments?: { _type: "file"; asset: SanityReference<any> };

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
   * SEO — `seo`
   *
   *
   */
  seo?: Seo;
}

/**
 * Dashboard Page
 *
 *
 */
export interface Dashboard extends SanityDocument {
  _type: "dashboard";

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
   * Password — `string`
   *
   * Password protect this page
   */
  password?: string;

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
   * Cookies Pane Copy — `richText`
   *
   *
   */
  cookiesPaneCopy?: RichText;

  /**
   * Cookies Accordions — `array`
   *
   *
   */
  cookiesAccordions?: Array<SanityKeyed<Accordion>>;

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
   * R+D Header Image — `image`
   *
   *
   */
  rdImage?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * R+D Header Image Link — `link`
   *
   *
   */
  rdLink?: Link;

  /**
   * Apply Link — `link`
   *
   * Link to apply page
   */
  applyLink?: Link;

  /**
   * Main Menu — `reference`
   *
   * Select menu for main navigation
   */
  mainMenu?: SanityReference<Menus>;

  /**
   * Footer Menu — `reference`
   *
   * Select menu for footer navigation
   */
  footerMenu?: SanityReference<Menus>;

  /**
   * Dashboard Menu — `reference`
   *
   * Select menu for dashboard navigation
   */
  dashboardMenu?: SanityReference<Menus>;

  /**
   * Footer Apply Copy — `richText`
   *
   *
   */
  applyCopy?: RichText;

  /**
   * Inquiry Audience ID — `string`
   *
   *
   */
  inquiryId?: string;

  /**
   * Inquiry Copy — `string`
   *
   *
   */
  inquiryCopy?: string;

  /**
   * Inquiry Success — `string`
   *
   *
   */
  inquirySuccess?: string;

  /**
   * Broker Inquiry Audience ID — `string`
   *
   *
   */
  brokerInquiryId?: string;

  /**
   * Broker Inquiry Copy — `richText`
   *
   *
   */
  brokerInquiryCopy?: RichText;

  /**
   * Broker Inquiry Success — `richText`
   *
   *
   */
  brokerInquirySuccess?: RichText;

  /**
   * Dashboard Image — `image`
   *
   *
   */
  dashImage?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Properties — `array`
   *
   *
   */
  properties?: Array<SanityKeyedReference<Property>>;

  /**
   * Inventory — `reference`
   *
   *
   */
  inventory?: SanityReference<Inventory>;

  /**
   * How It Works Accordions — `array`
   *
   * Currently shows in how to modal on unit
   */
  howItWorksContent?: Array<SanityKeyed<Accordion>>;
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
    reference?: SanityReference<
      Page | Property | PropertyType | Unit | Dashboard
    >;

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
   * Large Header — `boolean`
   *
   * Sets header to H2 size (Read More accordions only)
   */
  largeHeader?: boolean;

  /**
   * Open on desktop — `boolean`
   *
   *
   */
  openOnDesktop?: boolean;

  /**
   * Initial Text — `richText`
   *
   * Copy shown before accordion is expanded (Read More accordions only)
   */
  initialText?: RichText;

  /**
   * Accordion Text — `richText`
   *
   *
   */
  text?: RichText;

  /**
   * CTA — `cta`
   *
   *
   */
  cta?: Cta;
};

export type Carousel = {
  _type: "carousel";
  /**
   * Images — `array`
   *
   *
   */
  images?: Array<SanityKeyed<Media>>;
};

export type Color = "black" | "white";

export type ContentRow = {
  _type: "contentRow";
  /**
   * Cells — `object`
   *
   *
   */
  cells?: {
    _type: "cells";
    /**
     * Header — `string`
     *
     *
     */
    header?: string;

    /**
     * Content — `richText`
     *
     *
     */
    content?: RichText;
  };
};

export type CookiesToggle = {
  _type: "cookiesToggle";
  /**
   * Linked Copy — `string`
   *
   *
   */
  linkedCopy?: string;

  /**
   * Cookies Toggle — `boolean`
   *
   *
   */
  cookiesToggle?: boolean;
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

  /**
   * Color — `string`
   *
   *
   */
  color?: "Black" | "White";
};

export type Divider = {
  _type: "divider";
  /**
   * Divider — `boolean`
   *
   *
   */
  divider?: boolean;
};

export type Embed = {
  _type: "embed";
  /**
   * embed — `text`
   *
   * Paste the embed code here, will be wrapped with <script> tags
   */
  embed?: string;
};

export type FormField = {
  _type: "formField";
  /**
   * Field ID — `string`
   *
   * A unique identifier for this field from Hubspot etc. (first_name, last_name, email, etc.)
   */
  fieldId?: string;

  /**
   * Is required — `boolean`
   *
   * Is this field required for form submission?
   */
  isRequired?: boolean;

  /**
   * Field Type — `string`
   *
   *
   */
  fieldType?: "text" | "textArea" | "email" | "tel" | "select" | "hidden";

  /**
   * Text Area Rows — `number`
   *
   *
   */
  rows?: number;

  /**
   * Input Placeholder — `string`
   *
   *
   */
  placeholder?: string;

  /**
   * Options Label — `string`
   *
   *
   */
  optionsLabel?: string;

  /**
   * Select Type — `string`
   *
   *
   */
  selectType?: "radio" | "checkbox";

  /**
   * Options — `array`
   *
   *
   */
  options?: Array<
    SanityKeyed<{
      _type: "optionItem";
      /**
       * id — `string`
       *
       *
       */
      id?: string;

      /**
       * value — `string`
       *
       *
       */
      value?: string;

      /**
       * label — `string`
       *
       *
       */
      label?: string;
    }>
  >;
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

export type InventoryToggle = {
  _type: "inventoryToggle";
  /**
   * Linked Copy — `string`
   *
   *
   */
  linkedCopy?: string;

  /**
   * Inventory — `reference`
   *
   *
   */
  inventory?: SanityReference<Inventory>;
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
   * File — `file`
   *
   *
   */
  file?: { _type: "file"; asset: SanityReference<any> };

  /**
   * Video — `video`
   *
   *
   */
  video?: Video;

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

export type RichText = Array<SanityKeyed<SanityBlock> | SanityKeyed<Media>>;

export type PlainText = Array<SanityKeyed<SanityBlock>>;

export type TextAndImage = {
  _type: "textAndImage";
  /**
   * Aspect — `string`
   *
   *
   */
  aspect?: "short" | "square" | "tall";

  /**
   * Media — `media`
   *
   *
   */
  media?: Media;

  /**
   * Text — `richText`
   *
   *
   */
  text?: RichText;

  /**
   * Alt Crypto Text — `richText`
   *
   * Replaces text in crypto mode
   */
  altCryptoText?: RichText;
};

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

export type UnitGroup = {
  _type: "unitGroup";
  /**
   * Header — `string`
   *
   *
   */
  header?: string;

  /**
   * Property — `reference`
   *
   *
   */
  property?: SanityReference<Property>;

  /**
   * Units — `array`
   *
   *
   */
  units?: Array<SanityKeyedReference<Unit>>;
};

export type Video = {
  _type: "video";
  /**
   * files — `array`
   *
   * Video files (webm, m4v, mp4) beginning with webm
   */
  files?: Array<SanityKeyed<{ _type: "file"; asset: SanityReference<any> }>>;

  /**
   * poster — `image`
   *
   * Image that displays before the video is loaded
   */
  poster?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Caption — `string`
   *
   *
   */
  caption?: string;

  /**
   * loop — `boolean`
   *
   *
   */
  loop?: boolean;

  /**
   * autoplay — `boolean`
   *
   * Video will be muted if autoplay is enabled
   */
  autoplay?: boolean;
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
  | SanityKeyed<AnimatingBlock>
  | SanityKeyed<CalendarBlock>
  | SanityKeyed<CarouselBlock>
  | SanityKeyed<DividerBlock>
  | SanityKeyed<FormBlock>
  | SanityKeyed<FullbleedBlock>
  | SanityKeyed<ImagesBlock>
  | SanityKeyed<PropertyBlock>
  | SanityKeyed<PropertiesBlock>
  | SanityKeyed<NewsletterBlock>
  | SanityKeyed<ContactBlock>
  | SanityKeyed<TableBlock>
  | SanityKeyed<TextBlock>
  | SanityKeyed<TextAndAccordionBlock>
  | SanityKeyed<UnitBlock>
  | SanityKeyed<VideosBlock>
  | SanityKeyed<MessagingBlock>
  | SanityKeyed<DashboardBlock>
  | SanityKeyed<AccountBlock>
>;

export type AccordionBlock = {
  _type: "accordionBlock";
  /**
   * Columns — `number`
   *
   * Number of columns to display on larger screens. Defaults to 3 if blank
   */
  columns?: number;

  /**
   * Accordions — `array`
   *
   *
   */
  accordions?: Array<SanityKeyed<Accordion>>;

  /**
   * Read More — `boolean`
   *
   * Set to true to hide plus and minus and show read more copy
   */
  readMore?: boolean;

  /**
   * Black Bottom Border — `boolean`
   *
   *
   */
  bottomBorder?: boolean;
};

export type AnimatingBlock = {
  _type: "animatingBlock";
  /**
   * Header — `array`
   *
   *
   */
  header?: Array<SanityKeyed<string>>;

  /**
   * Text and Images — `array`
   *
   *
   */
  textAndImages?: Array<SanityKeyed<TextAndImage>>;

  /**
   * Cities — `array`
   *
   *
   */
  citiesList?: Array<SanityKeyedReference<City>>;

  /**
   * Cities Position — `number`
   *
   *
   */
  citiesPosition?: number;

  /**
   * Featured Property Types — `array`
   *
   *
   */
  featuredList?: Array<SanityKeyedReference<PropertyType>>;
};

export type CalendarBlock = {
  _type: "calendarBlock";
  /**
   * Header — `richText`
   *
   *
   */
  header?: RichText;

  /**
   * Calendar Type — `string`
   *
   * Add the type of calendar
   */
  calendarType?: "phone" | "tour";

  /**
   * email — `string`
   *
   *
   */
  email?: string;

  /**
   * Booking Notice — `string`
   *
   * Add the number of days to book out from today
   */
  notice?: "1" | "2" | "3" | "4" | "5" | "6" | "7";

  /**
   * Start of week — `string`
   *
   * Add the day of the week to start
   */
  start?: "1" | "2" | "3" | "4" | "5" | "6";

  /**
   * End of week — `string`
   *
   * Add the day of the week to end
   */
  end?: "2" | "3" | "4" | "5" | "6" | "7";

  /**
   * Times — `array`
   *
   * Add the times to show are possibly available to meet
   */
  times?: Array<SanityKeyed<string>>;

  /**
   * Success Message — `richText`
   *
   *
   */
  successMessage?: RichText;
};

export type CarouselBlock = {
  _type: "carouselBlock";
  /**
   * Images — `array`
   *
   *
   */
  images?: Array<SanityKeyed<Media>>;
};

export type DividerBlock = {
  _type: "dividerBlock";
  /**
   * Border Enabled — `boolean`
   *
   *
   */
  borderEnabled?: boolean;
};

export type FormBlock = {
  _type: "formBlock";
  /**
   * Header — `richText`
   *
   *
   */
  header?: RichText;

  /**
   * URL Submit — `string`
   *
   *
   */
  urlSubmit?: string;

  /**
   * Audience ID/Form GUID — `string`
   *
   *
   */
  audienceId?: string;

  /**
   * Success Message — `richText`
   *
   *
   */
  successMessage?: RichText;

  /**
   * Panes — `array`
   *
   *
   */
  panes?: Array<
    SanityKeyed<{
      _type: "pane";
      /**
       * Header — `string`
       *
       *
       */
      header?: string;

      /**
       * Copy — `string`
       *
       *
       */
      copy?: string;

      /**
       * Form Fields — `array`
       *
       *
       */
      formFields?: Array<SanityKeyed<FormField>>;
    }>
  >;

  /**
   * Background Color — `string`
   *
   * Background color for the form
   */
  backgroundColor?: "white" | "yellow";
};

export type FullbleedBlock = {
  _type: "fullbleedBlock";
  /**
   * Image — `media`
   *
   *
   */
  image?: Media;

  /**
   * Minimum Width — `number`
   *
   *
   */
  minWidth?: number;

  /**
   * Animate — `boolean`
   *
   *
   */
  animate?: boolean;

  /**
   * Columns — `number`
   *
   * Number of columns to display the fullbleed block in, setting to 2 will split the screen in half on desktop
   */
  columns?: number;
};

export type ImagesBlock = {
  _type: "imagesBlock";
  /**
   * Images — `array`
   *
   * Shows images in a row on desktop and as a vertical list on mobile
   */
  images?: Array<SanityKeyed<Media>>;
};

export type PropertyBlock = {
  _type: "propertyBlock";
  /**
   * Property Reference — `reference`
   *
   *
   */
  propertyRef?: SanityReference<Property>;

  /**
   * Footer Copy — `string`
   *
   *
   */
  footerCopy?: string;
};

export type PropertyTypesBlock = {
  _type: "propertyTypesBlock";
  /**
   * Header — `string`
   *
   *
   */
  header?: string;

  /**
   * Property Types — `array`
   *
   *
   */
  propertyTypes?: Array<SanityKeyedReference<PropertyType>>;
};

export type PropertiesBlock = {
  _type: "propertiesBlock";
  /**
   * Header — `string`
   *
   *
   */
  header?: string;

  /**
   * Properties — `array`
   *
   *
   */
  properties?: Array<SanityKeyedReference<Property>>;
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
   * Text — `richText`
   *
   *
   */
  text?: RichText;

  /**
   * URL Submit — `string`
   *
   *
   */
  urlSubmit?: string;

  /**
   * Audience ID/Form GUID — `string`
   *
   *
   */
  audienceId?: string;

  /**
   * Success Message — `richText`
   *
   *
   */
  successMessage?: RichText;

  /**
   * Hide Name — `boolean`
   *
   *
   */
  hideName?: boolean;

  /**
   * Brand Input Style — `boolean`
   *
   *
   */
  brandStyle?: boolean;
};

export type ContactBlock = {
  _type: "contactBlock";
  /**
   * Header — `string`
   *
   *
   */
  header?: string;

  /**
   * Text — `richText`
   *
   *
   */
  text?: RichText;

  /**
   * Audience ID/Form GUID — `string`
   *
   *
   */
  audienceId?: string;
};

export type TableBlock = {
  _type: "tableBlock";
  /**
   * Table — `array`
   *
   *
   */
  table?: Array<SanityKeyed<ContentRow>>;
};

export type TextBlock = {
  _type: "textBlock";
  /**
   * Anchor — `string`
   *
   * Add an anchor tag to this text block (ie ab-fab)
   */
  anchor?: string;

  /**
   * Columns — `number`
   *
   * Number of columns to display on larger screens. Defaults to 3 if blank
   */
  columns?: number;

  /**
   * Sticky Header — `boolean`
   *
   * This will make the header sticky on scroll
   */
  stickyHeader?: boolean;

  /**
   * Sticky Header Content — `richText`
   *
   * Content for the sticky header
   */
  header?: RichText;

  /**
   * Sticky Media — `media`
   *
   * Shows under header on scroll and in accordion on mobile
   */
  stickyMedia?: Media;

  /**
   * Text — `richText`
   *
   *
   */
  text?: RichText;

  /**
   * Accordion — `accordion`
   *
   *
   */
  accordion?: Accordion;

  /**
   * Yellow Background — `boolean`
   *
   * This will give the text block a full-width yellow background
   */
  yellowBackground?: boolean;
};

export type TextAndAccordionBlock = {
  _type: "textAndAccordionBlock";
  /**
   * Scroll Header — `richText`
   *
   *
   */
  scrollHeader?: RichText;

  /**
   * Header — `richText`
   *
   *
   */
  header?: RichText;

  /**
   * Items — `array`
   *
   *
   */
  items?: Array<
    SanityKeyed<{
      _type: "item";
      /**
       * Copy — `richText`
       *
       *
       */
      copy?: RichText;

      /**
       * Accordions — `array`
       *
       *
       */
      accordions?: Array<SanityKeyed<Accordion>>;

      /**
       * CTA — `string`
       *
       *
       */
      cta?: "waitlist" | "properties" | "inventory";
    }>
  >;
};

export type UnitBlock = {
  _type: "unitBlock";
  /**
   * Unit Reference — `reference`
   *
   *
   */
  unitRef?: SanityReference<Unit>;
};

export type VideosBlock = {
  _type: "videosBlock";
  /**
   * Videos — `array`
   *
   *
   */
  videos?: Array<SanityKeyed<Video>>;
};

export type MessagingBlock = {
  _type: "messagingBlock";
  /**
   * Messaging Name — `text`
   *
   *
   */
  messaginBlock?: string;
};

export type DashboardBlock = {
  _type: "dashboardBlock";
  /**
   * Header — `richText`
   *
   *
   */
  applyHeader?: RichText;

  /**
   * Joining Fee — `number`
   *
   * Fee to join the community in $USD
   */
  joiningFee?: number;

  /**
   * Logged In Header — `richText`
   *
   *
   */
  loggedInHeader?: RichText;

  /**
   * Dashboard Copy — `richText`
   *
   *
   */
  dashboardCopy?: RichText;
};

export type AccountBlock = {
  _type: "accountBlock";
  /**
   * Content — `richText`
   *
   *
   */
  content?: RichText;
};

export type Documents =
  | Brand
  | Buy
  | City
  | Inventory
  | Menus
  | Page
  | Property
  | PropertyType
  | RdPage
  | Unit
  | Dashboard
  | SiteSettings;

/**
 * This interface is a stub. It was referenced in your sanity schema but
 * the definition was not actually found. Future versions of
 * sanity-codegen will let you type this explicity.
 */
type Table = any;
