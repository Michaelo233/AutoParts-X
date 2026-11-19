export const PART_PRESETS: Record<
  string,
  { partId: number; category: string; categoryId: string }
> = {
  // CT002 - Transmission & Drivetrain
  Transmission: {
    partId: 1,
    category: "Transmission & Drivetrain",
    categoryId: "CT002",
  },
  Clutch: {
    partId: 6,
    category: "Transmission & Drivetrain",
    categoryId: "CT002",
  },

  // CT001 - Engine & Components
  Engine: {
    partId: 2,
    category: "Engine & Components",
    categoryId: "CT001",
  },
  "Spark Plugs": {
    partId: 7,
    category: "Engine & Components",
    categoryId: "CT001",
  },

  // CT003 - Brakes
  "Brake Pads": {
    partId: 3,
    category: "Brakes",
    categoryId: "CT003",
  },
  "Brake Rotors": {
    partId: 8,
    category: "Brakes",
    categoryId: "CT003",
  },

  // CT005 - Electrical & Lighting
  Alternator: {
    partId: 4,
    category: "Electrical & Lighting",
    categoryId: "CT005",
  },
  "Car Battery": {
    partId: 9,
    category: "Electrical & Lighting",
    categoryId: "CT005",
  },

  // CT007 - Cooling & Heating
  Radiator: {
    partId: 5,
    category: "Cooling & Heating",
    categoryId: "CT007",
  },
  Thermostat: {
    partId: 10,
    category: "Cooling & Heating",
    categoryId: "CT007",
  },

  // CT004 - Suspension & Steering
  "Shock Absorbers": {
    partId: 11,
    category: "Suspension & Steering",
    categoryId: "CT004",
  },
  "Control Arm": {
    partId: 12,
    category: "Suspension & Steering",
    categoryId: "CT004",
  },

  // CT006 - Body & Exterior
  "Front Bumper": {
    partId: 13,
    category: "Body & Exterior",
    categoryId: "CT006",
  },
  "Side Mirror": {
    partId: 14,
    category: "Body & Exterior",
    categoryId: "CT006",
  },

  // CT008 - Exhaust & Emissions
  "Catalytic Converter": {
    partId: 15,
    category: "Exhaust & Emissions",
    categoryId: "CT008",
  },
  Muffler: {
    partId: 16,
    category: "Exhaust & Emissions",
    categoryId: "CT008",
  },

  // CT009 - Tires & Wheels
  Tire: {
    partId: 17,
    category: "Tires & Wheels",
    categoryId: "CT009",
  },
  "Alloy Rim": {
    partId: 18,
    category: "Tires & Wheels",
    categoryId: "CT009",
  },

  // CT010 - Interior & Accessories
  "Floor Mats": {
    partId: 19,
    category: "Interior & Accessories",
    categoryId: "CT010",
  },
  "Seat Covers": {
    partId: 20,
    category: "Interior & Accessories",
    categoryId: "CT010",
  },
};