const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// 1. Ensure your serviceAccountKey.json is in the same folder!
const serviceAccount = require('./serviceAccountKey.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

const products = [
  { name: "Cosmo Carbon G-1", price: 85000, category: "Road", description: "Precision-engineered carbon layup. Built to order for maximum power transfer.", image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=800", featured: true },
  { name: "Nebula Trail-X", price: 62000, category: "MTB", description: "Full suspension mountain slayer. Custom tuned for your local terrain.", image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=800", featured: false },
  { name: "Orbit E-Glide", price: 98000, category: "E-Bike", description: "Long-range motor integration with a sleek, minimalist aesthetic.", image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=800", featured: true },
  { name: "Stellar Gravel S1", price: 45000, category: "Gravel", description: "The ultimate all-roader. Hand-assembled for endless discovery.", image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=800", featured: false },
  { name: "Cosmo Aero Pro", price: 125000, category: "Road", description: "Wind-tunnel optimized. Every unit is a masterpiece of aerodynamics.", image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=800", featured: true },
  { name: "Pulsar Hardtail", price: 38000, category: "MTB", description: "Responsive aluminum frame. Pure racing DNA in every weld.", image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=800", featured: false },
  { name: "Nova City Stealth", price: 22000, category: "E-Bike", description: "The perfect urban companion. Integrated tech for the modern commute.", image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=800", featured: false },
  { name: "Cosmo Zenith", price: 155000, category: "Road", description: "Limited production titanium build. The pinnacle of cycling luxury.", image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=800", featured: true },
  { name: "Void Jumper", price: 59000, category: "MTB", description: "Gravity-focused geometry. Built to withstand the biggest hits.", image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=800", featured: false },
  { name: "Comet Kids 24", price: 12000, category: "Kids", description: "Start the journey right. Scaled-down performance, zero compromise.", image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=800", featured: false }
];

async function seedData() {
  console.log("🚀 Initializing Cosmo Cycles Fleet (Unlimited Stock)...");
  const collectionRef = db.collection('products');

  // Optional: This line clears the collection first so you don't get duplicates
  // Note: For a school project, it's safer to just manually delete the collection in Firebase Console if it gets messy.

  for (const product of products) {
    await collectionRef.add(product);
    console.log(`✅ Commissioned: ${product.name}`);
  }
  console.log("✨ Fleet synchronization complete!");
  process.exit();
}

seedData().catch(console.error);