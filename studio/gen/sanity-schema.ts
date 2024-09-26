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
   * Hide waitlist or tour button in header
   */
  hideMenuButton?: boolean;

  /**
   * Show Tour Link — `boolean`
   *
   * Show the tour link in the header instead of waitlist
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
   * Hide Menu Button — `boolean`
   *
   * Hide waitlist or tour button in header
   */
  hideMenuButton?: boolean;

  /**
   * Show Tour Link — `boolean`
   *
   * Show the tour link in the header instead of waitlist
   */
  showTourLink?: boolean;

  /**
   * Card Image — `media`
   *
   * Used for the Properties Block image
   */
  cardImage?: Media;

  /**
   * Header Text — `string`
   *
   * Used for page breadcrumb
   */
  headerText?: string;

  /**
   * Header — `richText`
   *
   *
   */
  header?: RichText;

  /**
   * Property Image — `media`
   *
   * Used for the Property Block image
   */
  image?: Media;

  /**
   * coordinates — `coordinates`
   *
   *
   */
  coordinates?: Coordinates;

  /**
   * Body — `blockContent`
   *
   *
   */
  body?: BlockContent;

  /**
   * Waitlist Link Text — `string`
   *
   *
   */
  waitlistLinkText?: string;

  /**
   * Location — `reference`
   *
   *
   */
  location?: SanityReference<City>;

  /**
   * Available Text — `string`
   *
   *
   */
  availableText?: string;

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
   * Summary — `richText`
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
   * More Info — `richText`
   *
   *
   */
  moreInfo?: RichText;

  /**
   * Second Unit Details — `array`
   *
   *
   */
  secondUnitDetails?: Array<SanityKeyed<Accordion>>;

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
   * Hide waitlist or tour button in header
   */
  hideMenuButton?: boolean;

  /**
   * Show Tour Link — `boolean`
   *
   * Show the tour link in the header instead of waitlist
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
   * Unit List Photo Limit — `number`
   *
   * Limit the number of photos shown on the property
   */
  photoLimit?: number;

  /**
   * Summary — `richText`
   *
   *
   */
  summary?: RichText;

  /**
   * Fact Sheet — `table`
   *
   *
   */
  factSheet?: Table;

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
   * More Info — `richText`
   *
   *
   */
  moreInfo?: RichText;

  /**
   * Second Unit Details — `array`
   *
   *
   */
  secondUnitDetails?: Array<SanityKeyed<Accordion>>;

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
   * Waitlist Audience ID — `string`
   *
   *
   */
  waitlistId?: string;

  /**
   * Waitlist Header — `string`
   *
   *
   */
  waitlistHeader?: string;

  /**
   * Waitlist Copy — `richText`
   *
   *
   */
  waitlistCopy?: RichText;

  /**
   * Waitlist Success — `richText`
   *
   *
   */
  waitlistSuccess?: RichText;

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
    reference?: SanityReference<Page | Property | PropertyType | Unit>;

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
  | SanityKeyed<FullbleedBlock>
  | SanityKeyed<ImagesBlock>
  | SanityKeyed<PropertyBlock>
  | SanityKeyed<PropertyTypesBlock>
  | SanityKeyed<PropertiesBlock>
  | SanityKeyed<NewsletterBlock>
  | SanityKeyed<ContactBlock>
  | SanityKeyed<TableBlock>
  | SanityKeyed<TextBlock>
  | SanityKeyed<TextAndAccordionBlock>
  | SanityKeyed<UnitBlock>
  | SanityKeyed<VideosBlock>
  | SanityKeyed<MessagingBlock>
  | SanityKeyed<WaitlistBlock>
  | SanityKeyed<FlexWaitlistBlock>
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
   * Divider — `boolean`
   *
   *
   */
  divider?: boolean;
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
   * Cities — `array`
   *
   *
   */
  cities?: Array<
    SanityKeyed<{
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
    }>
  >;
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
   * Audience ID — `string`
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
   * Audience ID — `string`
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
   * This will make the header sticky on scroll, note requires a header to be set and number of columns set to 2
   */
  stickyHeader?: boolean;

  /**
   * Sticky Header Content — `richText`
   *
   * Content for the sticky header
   */
  header?: RichText;

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

  /**
   * Black Bottom Border — `boolean`
   *
   *
   */
  bottomBorder?: boolean;

  /**
   * Black Top Border — `boolean`
   *
   *
   */
  topBorder?: boolean;
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

export type WaitlistBlock = {
  _type: "waitlistBlock";
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
   * Audience ID — `string`
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
};

export type FlexWaitlistBlock = {
  _type: "flexWaitlistBlock";
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
   * Audience ID — `string`
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
   * Form Panes — `array`
   *
   *
   */
  formPanes?: Array<SanityKeyed<string>>;
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
  | SiteSettings;

/**
 * This interface is a stub. It was referenced in your sanity schema but
 * the definition was not actually found. Future versions of
 * sanity-codegen will let you type this explicity.
 */
type Table = any;
