import crypto from 'crypto';
import { Builder, Parser } from 'xml2js';

const debug = require('debug')(
  'expo:prebuild-config:expo-splash-screen:ios:InterfaceBuilder'
) as typeof console.log;

export type IBBoolean = 'YES' | 'NO' | boolean;

export type IBItem<
  H extends Record<string, any>,
  B extends Record<string, any[]> = { [key: string]: any },
> = {
  $: H;
} & B;

export type Rect = {
  key: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type IBRect = IBItem<Rect>;

export type IBAutoresizingMask = IBItem<{
  /** @example `autoresizingMask` */
  key: string;
  flexibleMaxX: IBBoolean;
  flexibleMaxY: IBBoolean;
}>;

/** @example `<color key="textColor" systemColor="linkColor"/>` */
export type IBColor = IBItem<
  {
    /** @example `textColor` */
    key: string;
  } & (
    | /** Custom color */
    {
        /** @example `0.86584504117670746` */
        red: number;
        /** @example `0.26445041990630447` */
        green: number;
        /** @example `0.3248577810203549` */
        blue: number;
        /** @example `1` */
        alpha: number;
        colorSpace: 'custom' | string;
        customColorSpace: 'displayP3' | 'sRGB' | string;
      }
    /** Built-in color */
    | {
        systemColor: 'linkColor' | string;
      }
  )
>;

export type IBFontDescription = IBItem<{
  /** @example `fontDescription` */
  key: string;
  /** Font size */
  pointSize: number;

  /** Custom font */
  name?: 'HelveticaNeue' | string;
  family?: 'Helvetica Neue' | string;

  /** Built-in font */
  type?: 'system' | 'boldSystem' | 'UICTFontTextStyleCallout' | 'UICTFontTextStyleBody' | string;
}>;

export type ImageContentMode = 'scaleAspectFit' | 'scaleAspectFill';

export type ConstraintAttribute = 'top' | 'bottom' | 'trailing' | 'leading' | 'centerX' | 'centerY';

export type IBImageView = IBItem<
  {
    id: string;
    userLabel: string;
    image: string;
    clipsSubviews?: IBBoolean;
    userInteractionEnabled: IBBoolean;
    contentMode: IBContentMode;
    horizontalHuggingPriority?: number;
    verticalHuggingPriority?: number;
    insetsLayoutMarginsFromSafeArea?: IBBoolean;
    translatesAutoresizingMaskIntoConstraints?: IBBoolean;
  },
  {
    rect: IBRect[];
  }
>;

export type IBLabel = IBItem<
  {
    id: string;
    /** The main value. */
    text: string;

    opaque: IBBoolean;
    fixedFrame: IBBoolean;
    textAlignment?: IBTextAlignment;
    lineBreakMode:
      | 'clip'
      | 'characterWrap'
      | 'wordWrap'
      | 'headTruncation'
      | 'middleTruncation'
      | 'tailTruncation';
    baselineAdjustment?: 'none' | 'alignBaselines';
    adjustsFontSizeToFit: IBBoolean;
    userInteractionEnabled: IBBoolean;
    contentMode: IBContentMode;
    horizontalHuggingPriority: number;
    verticalHuggingPriority: number;
    translatesAutoresizingMaskIntoConstraints?: IBBoolean;
  },
  {
    /** @example `<rect key="frame" x="175" y="670" width="35" height="17"/>` */
    rect: IBRect[];
    /** @example `<autoresizingMask key="autoresizingMask" flexibleMaxX="YES" flexibleMaxY="YES"/>` */
    autoresizingMask?: IBAutoresizingMask[];
    /** @example `<fontDescription key="fontDescription" type="system" pointSize="19"/>` */
    fontDescription?: IBFontDescription[];
    /** @example `<color key="textColor" red="0.0" green="0.0" blue="0.0" alpha="1" colorSpace="custom" customColorSpace="sRGB"/>` */
    color?: IBColor[];
    nil?: IBItem<{
      /** @example `textColor` `highlightedColor` */
      key: string;
    }>[];
  }
>;

export type IBTextAlignment = 'left' | 'center' | 'right' | 'justified' | 'natural';

export type IBContentMode = string | 'left' | 'scaleAspectFill';

export type IBConstraint = IBItem<{
  firstItem: string;
  firstAttribute: ConstraintAttribute;
  secondItem: string;
  secondAttribute: ConstraintAttribute;
  constant?: number;
  id: string;
}>;

export type IBViewController = IBItem<
  {
    id: string;
    placeholderIdentifier?: string;
    userLabel: string;
    sceneMemberID: string;
  },
  {
    view: IBItem<
      {
        id: string;
        key: string;
        userInteractionEnabled: IBBoolean;
        contentMode: string | 'scaleToFill';
        insetsLayoutMarginsFromSafeArea: IBBoolean;
        userLabel: string;
      },
      {
        rect: IBRect[];
        autoresizingMask: IBItem<{
          key: string;
          flexibleMaxX: IBBoolean;
          flexibleMaxY: IBBoolean;
        }>[];

        subviews: IBItem<
          object,
          {
            imageView: IBImageView[];
            label: IBLabel[];
          }
        >[];
        color: IBItem<{
          key: string | 'backgroundColor';
          name?: string;
          systemColor?: string | 'systemBackgroundColor';
          red?: string;
          green?: string;
          blue?: string;
          alpha?: string;
          colorSpace?: string;
          customColorSpace?: string;
        }>[];
        constraints: IBItem<
          object,
          {
            constraint: IBConstraint[];
          }
        >[];
        viewLayoutGuide: IBItem<{
          id: string;
          key: string | 'safeArea';
        }>[];
      }
    >[];
  }
>;

export type IBPoint = IBItem<{
  key: string | 'canvasLocation';
  x: number;
  y: number;
}>;

export type IBScene = IBItem<
  { sceneID: string },
  {
    objects: {
      viewController: IBViewController[];
      placeholder: IBItem<{
        id: string;
        placeholderIdentifier?: string;
        userLabel: string;
        sceneMemberID: string;
      }>[];
    }[];
    point: IBPoint[];
  }
>;

export type IBResourceImage = IBItem<{
  name: string;
  width: number;
  height: number;
}>;

export type IBResourceNamedColor = IBItem<{
  name?: string;
  systemColor?: string | 'systemBackgroundColor';
  red?: string;
  green?: string;
  blue?: string;
  alpha?: string;
  colorSpace?: string;
  customColorSpace?: string;
}>;

export type IBDevice = IBItem<{
  id: string;
  orientation: string | 'portrait';
  appearance: string | 'light';
}>;

export type IBSplashScreenDocument = {
  document: IBItem<
    {
      type: 'com.apple.InterfaceBuilder3.CocoaTouch.Storyboard.XIB' | string;
      version: '3.0' | string;
      toolsVersion: number;
      targetRuntime: 'iOS.CocoaTouch' | string;
      propertyAccessControl: 'none' | string;
      useAutolayout: IBBoolean;
      launchScreen: IBBoolean;
      useTraitCollections: IBBoolean;
      useSafeAreas: IBBoolean;
      colorMatched: IBBoolean;
      initialViewController: string;
    },
    {
      device: IBDevice[];
      dependencies: unknown[];
      scenes: {
        scene: IBScene[];
      }[];
      resources: {
        image: IBResourceImage[];
        namedColor?: IBItem<{ name: string }, { color: IBResourceNamedColor[] }>[];
      }[];
    }
  >;
};

export function createConstraint(
  [firstItem, firstAttribute]: [string, ConstraintAttribute],
  [secondItem, secondAttribute]: [string, ConstraintAttribute],
  constant?: number
): IBConstraint {
  return {
    $: {
      firstItem,
      firstAttribute,
      secondItem,
      secondAttribute,
      constant,
      // Prevent updating between runs
      id: createConstraintId(firstItem, firstAttribute, secondItem, secondAttribute),
    },
  };
}

export function createConstraintId(...attributes: string[]) {
  return crypto.createHash('sha1').update(attributes.join('-')).digest('hex');
}

const IMAGE_ID = 'EXPO-SplashScreen';
const CONTAINER_ID = 'EXPO-ContainerView';

export function removeImageFromSplashScreen(
  xml: IBSplashScreenDocument,
  { imageName }: { imageName: string }
) {
  const mainView = xml.document.scenes[0].scene[0].objects[0].viewController[0].view[0];

  debug(`Remove all splash screen image elements`);

  removeExisting(mainView.subviews[0].imageView, IMAGE_ID);

  // Remove Constraints
  getAbsoluteConstraints(IMAGE_ID, CONTAINER_ID).forEach((constraint) => {
    // <constraint firstItem="EXPO-SplashScreen" firstAttribute="top" secondItem="EXPO-ContainerView" secondAttribute="top" id="2VS-Uz-0LU"/>
    const constrainsArray = mainView.constraints[0].constraint;
    removeExisting(constrainsArray, constraint);
  });

  // Remove resource
  xml.document.resources[0].image = xml.document.resources[0].image ?? [];
  const imageSection = xml.document.resources[0].image;

  const existingImageIndex = imageSection.findIndex((image) => image.$.name === imageName);
  if (existingImageIndex && existingImageIndex > -1) {
    imageSection?.splice(existingImageIndex, 1);
  }
  return xml;
}

function getAbsoluteConstraints(childId: string, parentId: string, legacy: boolean = false) {
  if (legacy) {
    return [
      createConstraint([childId, 'top'], [parentId, 'top']),
      createConstraint([childId, 'leading'], [parentId, 'leading']),
      createConstraint([childId, 'trailing'], [parentId, 'trailing']),
      createConstraint([childId, 'bottom'], [parentId, 'bottom']),
    ];
  }
  return [
    createConstraint([childId, 'centerX'], [parentId, 'centerX']),
    createConstraint([childId, 'centerY'], [parentId, 'centerY']),
  ];
}

export function applyImageToSplashScreenXML(
  xml: IBSplashScreenDocument,
  {
    imageName,
    contentMode,
    backgroundColor,
    enableFullScreenImage,
    imageWidth = 100,
  }: {
    imageName: string;
    contentMode: ImageContentMode;
    backgroundColor: string;
    enableFullScreenImage: boolean;
    imageWidth?: number;
  }
): IBSplashScreenDocument {
  const mainView = xml.document.scenes[0].scene[0].objects[0].viewController[0].view[0];
  const width = enableFullScreenImage ? 414 : imageWidth;
  const height = enableFullScreenImage ? 736 : imageWidth;
  const x = enableFullScreenImage ? 0 : (mainView.rect[0].$.width - width) / 2;
  const y = enableFullScreenImage ? 0 : (mainView.rect[0].$.height - height) / 2;

  const imageView: IBImageView = {
    $: {
      id: IMAGE_ID,
      userLabel: imageName,
      image: imageName,
      contentMode,
      clipsSubviews: true,
      userInteractionEnabled: false,
      translatesAutoresizingMaskIntoConstraints: false,
    },
    rect: [
      {
        $: {
          key: 'frame',
          x,
          y,
          width,
          height,
        },
      },
    ],
  };

  // Add ImageView
  ensureUniquePush(mainView.subviews[0].imageView, imageView);

  mainView.constraints[0].constraint = [];

  // Add Constraints
  getAbsoluteConstraints(IMAGE_ID, CONTAINER_ID, enableFullScreenImage).forEach(
    (constraint: IBConstraint) => {
      const constrainsArray = mainView.constraints[0].constraint;
      ensureUniquePush(constrainsArray, constraint);
    }
  );

  // Clear existing images
  xml.document.resources[0].image = [];

  // Add resource
  const imageSection = xml.document.resources[0].image;
  imageSection.push({
    $: {
      name: imageName,
      width,
      height,
    },
  });

  // Clear existing color
  mainView.color = [];
  // Add background color
  const colorSection = mainView.color;

  colorSection.push({
    $: {
      key: 'backgroundColor',
      name: 'SplashScreenBackground',
    },
  });

  // Clear existing named colors
  xml.document.resources[0].namedColor = [];

  const namedColorSection = xml.document.resources[0].namedColor;
  // Add background named color reference
  const color = parseColor(backgroundColor);

  namedColorSection.push({
    $: {
      name: 'SplashScreenBackground',
    },
    color: [
      {
        $: {
          alpha: '1.000',
          blue: color.rgb.blue,
          green: color.rgb.green,
          red: color.rgb.red,
          customColorSpace: 'sRGB',
          colorSpace: 'custom',
        },
      },
    ],
  });

  return xml;
}

/**
 * IB does not allow two items to have the same ID.
 * This method will add an item by first removing any existing item with the same `$.id`.
 */
export function ensureUniquePush<TItem extends { $: { id: string } }>(array: TItem[], item: TItem) {
  if (!array) return array;
  removeExisting(array, item);
  array.push(item);
  return array;
}

export function removeExisting<TItem extends { $: { id: string } }>(
  array: TItem[],
  item: TItem | string
) {
  const id = typeof item === 'string' ? item : item.$?.id;
  const existingItem = array?.findIndex((existingItem) => existingItem.$.id === id);
  if (existingItem > -1) {
    debug(`Removing existing IB item with id ${id}, from: %O`, array);
    array.splice(existingItem, 1);
  }
  return array;
}

// Attempt to copy Xcode formatting.
export function toString(xml: any): string {
  const builder = new Builder({
    // @ts-expect-error: untyped
    preserveChildrenOrder: true,
    xmldec: {
      version: '1.0',
      encoding: 'UTF-8',
    },
    renderOpts: {
      pretty: true,
      indent: '    ',
    },
  });
  return builder.buildObject(xml);
}

/** Parse string contents into an object. */
export function toObjectAsync(contents: string) {
  return new Parser().parseStringPromise(contents);
}

// Function taken from react-native-bootsplash
export const parseColor = (value: string): Color => {
  const color = value.toUpperCase().replace(/[^0-9A-F]/g, '');

  if (color.length !== 3 && color.length !== 6) {
    console.error(`"${value}" value is not a valid hexadecimal color.`);
    process.exit(1);
  }

  const hex =
    color.length === 3
      ? '#' + color[0] + color[0] + color[1] + color[1] + color[2] + color[2]
      : '#' + color;

  const rgb: Color['rgb'] = {
    red: (parseInt('' + hex[1] + hex[2], 16) / 255).toPrecision(15),
    green: (parseInt('' + hex[3] + hex[4], 16) / 255).toPrecision(15),
    blue: (parseInt('' + hex[5] + hex[6], 16) / 255).toPrecision(15),
  };

  return { hex, rgb };
};

type Color = {
  hex: string;
  rgb: {
    red: string;
    green: string;
    blue: string;
  };
};
