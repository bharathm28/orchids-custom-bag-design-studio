export interface BagPart {
  id: string;
  name: string;
  description: string;
  defaultColor: string;
}

export interface BagConfig {
  id: string;
  name: string;
  parts: BagPart[];
  foamTypes: string[];
}

export const bagConfigs: Record<string, BagConfig> = {
  backpack: {
    id: "backpack",
    name: "Backpack",
    parts: [
      { id: "body", name: "Main Body", description: "The main compartment of the bag", defaultColor: "#2563eb" },
      { id: "front_pocket", name: "Front Pocket", description: "Front zippered pocket", defaultColor: "#1d4ed8" },
      { id: "side_pocket_left", name: "Left Side Pocket", description: "Left mesh side pocket", defaultColor: "#1e40af" },
      { id: "side_pocket_right", name: "Right Side Pocket", description: "Right mesh side pocket", defaultColor: "#1e40af" },
      { id: "shoulder_strap_left", name: "Left Shoulder Strap", description: "Left padded shoulder strap", defaultColor: "#1e293b" },
      { id: "shoulder_strap_right", name: "Right Shoulder Strap", description: "Right padded shoulder strap", defaultColor: "#1e293b" },
      { id: "top_handle", name: "Top Handle", description: "Carry handle on top", defaultColor: "#1e293b" },
      { id: "back_panel", name: "Back Panel", description: "Padded back panel", defaultColor: "#334155" },
      { id: "zipper", name: "Zippers", description: "Zipper hardware", defaultColor: "#94a3b8" },
      { id: "bottom", name: "Bottom Panel", description: "Reinforced bottom", defaultColor: "#0f172a" },
    ],
    foamTypes: ["Standard", "Memory Foam", "Gel-Infused", "EVA Foam"],
  },
  college: {
    id: "college",
    name: "College Bag",
    parts: [
      { id: "body", name: "Main Body", description: "Spacious main compartment for books", defaultColor: "#059669" },
      { id: "flap", name: "Front Flap", description: "Fold-over front flap", defaultColor: "#047857" },
      { id: "front_pocket", name: "Front Pocket", description: "Organizer pocket under flap", defaultColor: "#065f46" },
      { id: "laptop_sleeve", name: "Laptop Sleeve", description: "Padded internal sleeve", defaultColor: "#064e3b" },
      { id: "shoulder_strap_left", name: "Left Strap", description: "Adjustable left strap", defaultColor: "#1e293b" },
      { id: "shoulder_strap_right", name: "Right Strap", description: "Adjustable right strap", defaultColor: "#1e293b" },
      { id: "top_handle", name: "Top Handle", description: "Quick-grab handle", defaultColor: "#1e293b" },
      { id: "back_panel", name: "Back Panel", description: "Breathable back panel", defaultColor: "#334155" },
      { id: "buckle", name: "Buckle/Clasp", description: "Front closure hardware", defaultColor: "#d4d4d8" },
      { id: "bottom", name: "Bottom Panel", description: "Durable bottom panel", defaultColor: "#0f172a" },
    ],
    foamTypes: ["Standard", "Memory Foam", "Gel-Infused", "EVA Foam"],
  },
  duffel: {
    id: "duffel",
    name: "Duffel Bag",
    parts: [
      { id: "body", name: "Main Body", description: "Cylindrical main compartment", defaultColor: "#dc2626" },
      { id: "end_left", name: "Left End Panel", description: "Left circular end", defaultColor: "#b91c1c" },
      { id: "end_right", name: "Right End Panel", description: "Right circular end", defaultColor: "#b91c1c" },
      { id: "shoulder_strap", name: "Shoulder Strap", description: "Removable shoulder strap", defaultColor: "#1e293b" },
      { id: "carry_handles", name: "Carry Handles", description: "Dual carry handles", defaultColor: "#1e293b" },
      { id: "side_pocket", name: "Side Pocket", description: "Zippered side pocket", defaultColor: "#991b1b" },
      { id: "zipper", name: "Main Zipper", description: "Top-opening zipper", defaultColor: "#94a3b8" },
      { id: "bottom", name: "Bottom Panel", description: "Reinforced bottom", defaultColor: "#0f172a" },
    ],
    foamTypes: ["Standard", "Memory Foam", "EVA Foam"],
  },
  messenger: {
    id: "messenger",
    name: "Messenger Bag",
    parts: [
      { id: "body", name: "Main Body", description: "Main messenger compartment", defaultColor: "#7c3aed" },
      { id: "flap", name: "Front Flap", description: "Full-cover front flap", defaultColor: "#6d28d9" },
      { id: "shoulder_strap", name: "Shoulder Strap", description: "Cross-body strap", defaultColor: "#1e293b" },
      { id: "front_pocket", name: "Front Pocket", description: "Quick-access front pocket", defaultColor: "#5b21b6" },
      { id: "back_panel", name: "Back Panel", description: "Slip pocket back panel", defaultColor: "#334155" },
      { id: "buckle", name: "Buckle", description: "Magnetic buckle closure", defaultColor: "#d4d4d8" },
      { id: "bottom", name: "Bottom Panel", description: "Structured bottom", defaultColor: "#0f172a" },
    ],
    foamTypes: ["Standard", "Memory Foam", "EVA Foam"],
  },
  tote: {
    id: "tote",
    name: "Tote Bag",
    parts: [
      { id: "body", name: "Main Body", description: "Open-top main body", defaultColor: "#ec4899" },
      { id: "handle_left", name: "Left Handle", description: "Left carry handle", defaultColor: "#be185d" },
      { id: "handle_right", name: "Right Handle", description: "Right carry handle", defaultColor: "#be185d" },
      { id: "inner_pocket", name: "Inner Pocket", description: "Interior zip pocket", defaultColor: "#9d174d" },
      { id: "front_panel", name: "Front Panel", description: "Front decorative panel", defaultColor: "#db2777" },
      { id: "back_panel", name: "Back Panel", description: "Back panel", defaultColor: "#be185d" },
      { id: "bottom", name: "Bottom Panel", description: "Structured bottom insert", defaultColor: "#0f172a" },
    ],
    foamTypes: ["Standard", "Stiffener Board", "EVA Foam"],
  },
  laptop: {
    id: "laptop",
    name: "Laptop Bag",
    parts: [
      { id: "body", name: "Main Body", description: "Padded laptop compartment", defaultColor: "#0891b2" },
      { id: "front_pocket", name: "Front Pocket", description: "Accessory pocket", defaultColor: "#0e7490" },
      { id: "shoulder_strap", name: "Shoulder Strap", description: "Padded shoulder strap", defaultColor: "#1e293b" },
      { id: "top_handle", name: "Top Handle", description: "Quick-grab handle", defaultColor: "#1e293b" },
      { id: "laptop_pad", name: "Laptop Padding", description: "Internal cushioning", defaultColor: "#334155" },
      { id: "back_panel", name: "Back Panel", description: "Trolley-compatible back", defaultColor: "#334155" },
      { id: "zipper", name: "Zippers", description: "YKK zipper hardware", defaultColor: "#94a3b8" },
      { id: "bottom", name: "Bottom Panel", description: "Shock-absorbing bottom", defaultColor: "#0f172a" },
    ],
    foamTypes: ["Standard", "Memory Foam", "Gel-Infused", "Neoprene"],
  },
};
