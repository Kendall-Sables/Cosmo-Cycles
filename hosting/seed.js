const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccount = require('./serviceAccountKey.json');

initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

const products = [
    // --- ROAD BIKES ---
    //beginner (1-3)
  {
    name: "Specialized Allez", price: 22500, category: "road", level: "beginner",
    brand: "Specialized", material: "Aluminum", weight: "9.6kg", sizes: ["XS", "S", "M", "L", "XL"],
    description: "The legendary entry-point for performance road cycling.",
    longDescription: "With a focus on weight, refinement, and reliability, the Allez is the first to make top-tier performance technologies accessible to everyone. Its E5 Aluminum frame and full carbon fork deliver a ride that`s as fast as it is comfortable.",
    image: "https://res.cloudinary.com/dzbriyw1o/image/upload/v1772349527/Specialized-Allez_wwpl2i.webp"
  },
  { 
    name: "Trek Domane AL 2", price: 25000, category: "road", level: "beginner",
    brand: "Trek", material: "Aluminum", weight: "10.5kg", sizes: ["XS", "S", "M", "L", "XL"],
    description: "A smooth, stable, and confidence-inspiring endurance bike.",
    longDescription: "The Domane AL 2 is the perfect gateway to comfortable road riding. It features a lightweight frame with hidden fender mounts and a carbon fork to soak up road vibrations, making it ideal for long weekend adventures or fast commutes.",
    image: "https://res.cloudinary.com/dzbriyw1o/image/upload/v1772349527/Trek-Domane-AL2_kk9jqm.jpg"
  },
  { 
    name: "Giant Contend 3", price: 12900, category: "road", level: "beginner",
    brand: "Giant", material: "Aluminum", weight: "10.2kg", sizes: ["XS", "S", "M", "L", "XL"],
    description: "The versatile all-rounder for aspiring roadies.",
    longDescription: "Designed for versatile performance, the Contend 3 combines an agile frame with comfortable geometry. It`s built using Giant's industry-leading aluminum technology to provide a balanced feel that's great for climbs and descents alike.",
    image: "https://res.cloudinary.com/dzbriyw1o/image/upload/v1772349526/Giant-Contend-3_uwa5tq.jpg"
  },
    //intermediate (4-6)
  { 
    name: "Giant TCR Advanced 2", price: 48500, category: "road", level: "intermediate",
    brand: "Giant", material: "Carbon", weight: "8.3kg", sizes: ["XS", "S", "M", "L", "XL"],
    description: "An award-winning racer that climbs and corners with precision.",
    longDescription: "The TCR Advanced 2 represents the 'total race bike' philosophy. Its carbon frameset is engineered for superior stiffness-to-weight, giving you an explosive feel on the pedals and pinpoint handling on technical descents.",
    image: "https://res.cloudinary.com/dzbriyw1o/image/upload/v1772349526/Giant-TCR-Advanced-2_epesto.webp"
  },
  { 
    name: "Scott Addict 30", price: 62000, category: "road", level: "intermediate",
    brand: "Scott", material: "Carbon", weight: "8.6kg", sizes: ["XS", "S", "M", "L", "XL"],
    description: "Endurance geometry meets carbon performance.",
    longDescription: "The Scott Addict 30 was redesigned from the ground up with those longer days in mind. With a geometry that is less focused on racing and more on enduring, this carbon machine is perfect for Gran Fondos and all-day epic rides.",
    image: "https://res.cloudinary.com/dzbriyw1o/image/upload/v1772349526/Scott-Addict-30_duk383.jpg"
  },
  { 
    name: "Cannondale SuperSix EVO 4", price: 54990, category: "road", level: "intermediate",
    brand: "Cannondale", material: "Carbon", weight: "8.4kg", sizes: ["XS", "S", "M", "L", "XL"],
    description: "The ultimate evolution of the classic race bike.",
    longDescription: "Lightweight, smooth, and ultra-fast. The SuperSix EVO 4 uses highly aerodynamic tube shapes to save you watts while maintaining the lively, connected feel that this model has been famous for over a decade.",
    image: "https://res.cloudinary.com/dzbriyw1o/image/upload/v1772349526/Cannondale-SuperSix-EVO4_lkkraa.jpg"
  },
    //advancedv (7-9)
  { 
    name: "Specialized S-Works Tarmac SL8", price: 265000, category: "road", level: "advanced",
    brand: "Specialized", material: "Carbon", weight: "6.8kg", sizes: ["XS", "S", "M", "L", "XL"],
    description: "One bike to rule them all—aerodynamics meets featherweight.",
    longDescription: "The SL8 is the fastest race bike in the world. By combining the aero properties of the Venge with the lightness of the Aethos, Specialized has created a pro-tour weapon that climbs like a dream and cuts through the wind like a knife.",
    image: "https://res.cloudinary.com/dzbriyw1o/image/upload/v1772349523/Specialized-S-Works-Tarmac-SL8_c6fhah.webp"
  },
  { 
    name: "Trek Madone SLR 9", price: 245000, category: "road", level: "advanced",
    brand: "Trek", material: "Carbon", weight: "7.1kg", sizes: ["XS", "S", "M", "L", "XL"],
    description: "The ultimate aero superbike for maximum velocity.",
    longDescription: "The Madone SLR 9 is the pinnacle of aerodynamic engineering. Featuring the unique IsoFlow seat tube hole for better aero and weight savings, it`s equipped with top-tier electronic shifting and deep-section carbon wheels for pure speed.",
    image: "https://res.cloudinary.com/dzbriyw1o/image/upload/v1772349522/Trek-Madone-SLR9_kbt7k7.webp"
  },
  { 
    name: "Cervélo S5 Force eTap", price: 195000, category: "road", level: "advanced",
    brand: "Cervélo", material: "Carbon", weight: "7.5kg", sizes: ["XS", "S", "M", "L", "XL"],
    description: "Pure, unadulterated speed for the wind-obsessed.",
    longDescription: "The S5 is an aerodynamic tour de force. Recognizable by its iconic V-stem, this bike is built for one thing: getting from point A to point B as fast as humanly possible. It is the chosen tool of world-class sprinters.",
    image: "https://res.cloudinary.com/dzbriyw1o/image/upload/v1772349522/Cerv%C3%A9lo-S5-Force-eTap_kcek0k.jpg"
  },


    // --- MOUNTAIN BIKES ---
    //beginner (10-12)
  { 
    name: "Specialized Rockhopper 29", price: 11500, category: "mountain", level: "beginner",
    brand: "Specialized", material: "Aluminum", weight: "13.8kg", sizes: ["XS", "S", "M", "L", "XL"],
    description: "The classic hardtail built for trail-ready performance.",
    longDescription: "A time-tested favorite for those entering the sport. The Rockhopper features a lightweight but durable aluminum frame and a geometry designed for nimble handling. It is the perfect companion for exploring local trails and gaining confidence in the dirt.",
    image: "https://res.cloudinary.com/dzbriyw1o/image/upload/v1772349522/Specialized-Rockhopper-29_bgeoav.jpg"
  },
  { 
    name: "Trek Marlin 7 Gen 3", price: 25000, category: "mountain", level: "beginner",
    brand: "Trek", material: "Aluminum", weight: "14.6kg", sizes: ["XS", "S", "M", "L", "XL"],
    description: "A trail-tough hardtail with a race-bred pedigree.",
    longDescription: "The Marlin 7 is where entry-level meets cross-country racing capability. It features an upgraded suspension fork and a simple 1x drivetrain, making it easy to manage while providing the durability needed for rugged South African terrain.",
    image: "https://res.cloudinary.com/dzbriyw1o/image/upload/v1772349522/Trek-Marlin-7-Gen3_ozhgz2.webp"
  },
  { 
    name: "Giant Talon 1", price: 17990, category: "mountain", level: "beginner",
    brand: "Giant", material: "Aluminum", weight: "13.2kg", sizes: ["XS", "S", "M", "L", "XL"],
    description: "Find your rhythm on the trail with this balanced hardtail.",
    longDescription: "Built on a classic ALUXX aluminum frame, the Talon 1 is designed for stability and control. With its 100mm suspension fork and hydraulic disc brakes, it offers a smooth, confident ride for riders looking to push their off-road skills further.",
    image: "https://res.cloudinary.com/dzbriyw1o/image/upload/v1772349522/Giant-Talon1_s4ksta.webp"
  },
    //intermediate (13-15)
  { 
    name: "Specialized Stumpjumper 15 Comp", price: 110000, category: "mountain", level: "intermediate",
    brand: "Specialized", material: "Carbon", weight: "13.9kg", sizes: ["XS", "S", "M", "L", "XL"],
    description: "The definitive 'do-it-all' trail bike with unmatched versatility.",
    longDescription: "The Stumpjumper 15 brings a new level of control and efficiency to the trail. Its carbon chassis is stiff yet compliant, paired with a suspension system that makes big hits feel small and technical climbs feel effortless.",
    image: "https://res.cloudinary.com/dzbriyw1o/image/upload/v1772349521/Specialized-Stumpjumper-15-Comp_ndk0jc.jpg"
  },
  { 
    name: "Trek Fuel EX 8 Gen 6", price: 85000, category: "mountain", level: "intermediate",
    brand: "Trek", material: "Aluminum", weight: "15.6kg", sizes: ["XS", "S", "M", "L", "XL"],
    description: "A versatile trail machine that punches well above its weight.",
    longDescription: "The Fuel EX 8 is built for riders who want to tackle everything from flow trails to chunky technical descents. It features high-end suspension and a geometry that can be adjusted to suit your specific riding style or local terrain.",
    image: "https://res.cloudinary.com/dzbriyw1o/image/upload/v1772349521/Trek-Fuel-EX-8-Gen6_lzv5kr.webp"
  },
  { 
    name: "Giant Anthem Advanced 29 2", price: 81990, category: "mountain", level: "intermediate",
    brand: "Giant", material: "Carbon", weight: "11.4kg", sizes: ["XS", "S", "M", "L", "XL"],
    description: "Pure speed for cross-country enthusiasts and marathon racers.",
    longDescription: "When efficiency is everything, the Anthem Advanced delivers. This full-carbon race bike is designed to be ultra-lightweight and incredibly fast on the climbs, featuring FlexPoint Pro rear suspension for maximum traction and power transfer.",
    image: "https://res.cloudinary.com/dzbriyw1o/image/upload/v1772350471/Giant-Anthem-Advanced-29-2-v2_ygbhgr.webp"
  },
    //advanced (16-18)
  { 
    name: "Specialized S-Works Epic 8", price: 295000, category: "mountain", level: "advanced",
    brand: "Specialized", material: "Carbon", weight: "10.2kg", sizes: ["XS", "S", "M", "L", "XL"],
    description: "The fastest cross-country race bike on the planet.",
    longDescription: "The S-Works Epic 8 is a masterpiece of carbon engineering. It features the Flight Attendant electronic suspension system which automatically adjusts your shocks in real-time, ensuring you are always in the most efficient setting for the trail ahead.",
    image: "https://res.cloudinary.com/dzbriyw1o/image/upload/v1772350472/Specialized-S-Works-Epic8-v2_ci9sqd.jpg"
  },
  { 
    name: "Scott Spark RC SL", price: 354000, category: "mountain", level: "advanced",
    brand: "Scott", material: "Carbon", weight: "10.1kg", sizes: ["XS", "S", "M", "L", "XL"],
    description: "The pinnacle of integration and World Cup winning performance.",
    longDescription: "Famous for its 'hidden' rear shock integrated into the frame, the Spark RC SL is the ultimate XC weapon. It is built with the highest-grade carbon and top-tier wireless components to provide a ride that is as aesthetically clean as it is fast.",
    image: "https://res.cloudinary.com/dzbriyw1o/image/upload/v1772349521/Scott-Spark-RC-SL_krfhbb.jpg"
  },
  { 
    name: "Giant Anthem Advanced SL SE", price: 269990, category: "mountain", level: "advanced",
    brand: "Giant", material: "Carbon", weight: "10.5kg", sizes: ["XS", "S", "M", "L", "XL"],
    description: "A professional-grade racer with smart suspension technology.",
    longDescription: "The SL SE is the crown jewel of the Anthem range. Equipped with Fox Live Valve or SRAM Flight Attendant technology, this bike thinks for you, adjusting the suspension hundreds of times per second to conquer the most technical XC courses in the world.",
    image: "https://res.cloudinary.com/dzbriyw1o/image/upload/v1772349520/Giant-Anthem-Advanced-SL-SE_bxcoic.jpg"
  },


    // --- GRAVEL BIKES ---
    //beginner (19-21)
  { 
    name: "Giant Revolt 2", price: 19500, category: "gravel", level: "beginner",
    brand: "Giant", material: "Aluminum", weight: "10.4kg", sizes: ["XS", "S", "M", "L", "XL"],
    description: "An versatile entry into the world of gravel and bike-packing.",
    longDescription: "The Revolt 2 features a lightweight aluminum frame with a flip-chip dropout that lets you adjust the wheelbase for stability or speed. It`s a perfect multi-surface explorer that doubles as a rugged daily commuter.",
    image: "https://res.cloudinary.com/dzbriyw1o/image/upload/v1772349520/Giant-Revolt2_hqttip.webp"
  },
  { 
    name: "Specialized Diverge E5", price: 32000, category: "gravel", level: "beginner",
    brand: "Specialized", material: "Aluminum", weight: "9.8kg", sizes: ["XS", "S", "M", "L", "XL"],
    description: "The most capable aluminum gravel bike on the market.",
    longDescription: "The Diverge E5 utilizes a premium aluminum frame and full carbon fork to deliver a fast and stable ride. With plenty of rack mounts and progressive geometry, it`s designed to handle everything from fire roads to thick mud with confidence.",
    image: "https://res.cloudinary.com/dzbriyw1o/image/upload/v1772349521/Specialized-Diverge-E5_ulr7el.webp"
  },
  { 
    name: "Canyon Grizl 5", price: 51000, category: "gravel", level: "beginner",
    brand: "Canyon", material: "Aluminum", weight: "10.8kg", sizes: ["XS", "S", "M", "L", "XL"],
    description: "A rugged, no-nonsense gravel machine built for adventure.",
    longDescription: "The Grizl is Canyon`s answer to rough gravel. Built with a 'do-it-all' attitude, it features massive tire clearance and a sturdy aluminum frame, making it the ideal choice for riders looking to push deep into the wilderness.",
    image: "https://res.cloudinary.com/dzbriyw1o/image/upload/v1772349519/Canyon-Grizl5_v5vcco.jpg"
  },
    //intermediate (22-24)
  { 
    name: "Trek Checkpoint ALR 5", price: 37700, category: "gravel", level: "intermediate",
    brand: "Trek", material: "Aluminum", weight: "9.7kg", sizes: ["XS", "S", "M", "L", "XL"],
    description: "A high-value alloy gravel bike with high-end performance.",
    longDescription: "The Checkpoint ALR 5 strikes the perfect balance. While the frame is aluminum, it`s paired with top-tier gravel-specific components and a geometry that keeps you comfortable during grueling 100km gravel races.",
    image: "https://res.cloudinary.com/dzbriyw1o/image/upload/v1772349520/Trek-Checkpoint-ALR5_b4tsyn.png"
  },
  { 
    name: "Giant Revolt Advanced 2", price: 59990, category: "gravel", level: "intermediate",
    brand: "Giant", material: "Carbon", weight: "9.2kg", sizes: ["XS", "S", "M", "L", "XL"],
    description: "Lightweight carbon efficiency for competitive gravel riding.",
    longDescription: "Featuring an Advanced-grade carbon frame, the Revolt Advanced 2 is designed for speed. Its D-Fuse seatpost and handlebar absorb road shocks, ensuring you stay fresh even when the terrain gets choppy.",
    image: "https://res.cloudinary.com/dzbriyw1o/image/upload/v1772349520/Giant-Revolt-Advanced2_vo5bty.webp"
  },
  { 
    name: "Canyon Grizl CF SL 7", price: 77000, category: "gravel", level: "intermediate",
    brand: "Canyon", material: "Carbon", weight: "9.4kg", sizes: ["XS", "S", "M", "L", "XL"],
    description: "The sweet spot of carbon performance and rugged capability.",
    longDescription: "The Grizl CF SL 7 takes the adventure-ready soul of the Grizl and sheds significant weight with a carbon frameset. It`s equipped with a gravel-specific Shimano GRX groupset for reliable shifting in the worst conditions.",
    image: "https://res.cloudinary.com/dzbriyw1o/image/upload/v1772349519/Canyon-Grizl-CF-SL7_hkrxdp.webp"
  },
    //advanced (25-27)
  { 
    name: "Specialized S-Works Diverge STR", price: 230000, category: "gravel", level: "advanced",
    brand: "Specialized", material: "Carbon", weight: "8.9kg", sizes: ["XS", "S", "M", "L", "XL"],
    description: "The world's most sophisticated gravel bike with dual suspension.",
    longDescription: "The Diverge STR features the revolutionary Future Shock suspension in both the front and rear. This 'suspends the rider' without losing power transfer, creating an incredibly fast and smooth ride over even the most technical washboard gravel.",
    image: "https://res.cloudinary.com/dzbriyw1o/image/upload/v1772349519/Specialized-S-Works-Diverge-STR_tcebkk.webp"
  },
  { 
    name: "Santa Cruz Stigmata", price: 119000, category: "gravel", level: "advanced",
    brand: "Santa Cruz", material: "Carbon", weight: "8.5kg", sizes: ["XS", "S", "M", "L", "XL"],
    description: "A mountain biker's gravel bike—fast, tough, and refined.",
    longDescription: "The Stigmata has a cult following for a reason. Built by a brand that lives for dirt, this carbon racer handles like a dream on technical descents while remaining stiff and light enough to win a high-paced gravel race.",
    image: "https://res.cloudinary.com/dzbriyw1o/image/upload/v1772349521/Santa-Cruz-Stigmata_ngqkjx.jpg"
  },
  { 
    name: "Trek Checkmate SLR 9", price: 255000, category: "gravel", level: "advanced",
    brand: "Trek", material: "Carbon", weight: "7.5kg", sizes: ["XS", "S", "M", "L", "XL"],
    description: "The ultimate aero-gravel racing weapon.",
    longDescription: "The Checkmate SLR 9 is Trek`s fastest gravel bike ever. It takes the aerodynamic lessons from the Madone road bike and applies them to gravel, creating a featherweight carbon machine designed to win the world's most prestigious gravel races.",
    image: "https://res.cloudinary.com/dzbriyw1o/image/upload/v1772350471/Trek-Checkmate-SLR9-v2_czq1yu.webp"
  },
];

async function seedData() {
  console.log("🚀 Syncing the Professional Fleet...");
  const collectionRef = db.collection('products');
  
  for (const product of products) {
    // This creates a clean URL-friendly ID like 'cosmo-start'
    const customId = product.name.toLowerCase().replace(/\s+/g, '-');
    await collectionRef.doc(customId).set(product);
    console.log(`✅ Synced: ${product.name}`);
  }
  console.log("✨ 27 Machines Commissioned.");
  process.exit();
}

seedData().catch(console.error);