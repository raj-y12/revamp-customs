// types.ts

export interface ColourOption {
  name: string;
  hex: string;
}

export interface Pattern {
  name: string;
  image: string;
}

export interface Brand {
  name: string;
  logo: string;
}

export interface Material {
  name: string;
  image: string;
  colours: ColourOption[];
}

export interface CenteringStrip {
  name: string;
  image: string;
}

export interface StitchingColour {
  name: string;
  image: string;
}

export interface FiberStyle {
  name: string;
  image: string;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  price: number;
  
  image: string;
  images: string[];
  category: string;

  fiberStyles: FiberStyle[];
  centeringStrips: CenteringStrip[];
  materials: Material[];
  stitchingColours: StitchingColour[];
  brands: Brand[];
}