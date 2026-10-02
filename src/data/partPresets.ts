// Preset defaults for available parts
export const PART_PRESETS: Record<string, { price: number; image: string }> = {
  Transmission: {
    price: 1200.0,
    image: "/images/Transmission.jpg",
  },
  Engine: {
    price: 2500.0,
    image: "/images/engine_block.jpg",
  },
  "Brake Pads": {
    price: 150.0,
    image: "/images/brake_pads.jpg",
  },
  Alternator: {
    price: 300.0,
    image: "/public/images/",
  },
  Radiator: {
    price: 450.0,
    image: "/public/images/Radiator.jpg",
  },
};