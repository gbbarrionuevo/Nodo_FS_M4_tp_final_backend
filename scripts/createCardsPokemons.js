import dotenv from 'dotenv';
import { connectDB } from '../config/dbConfig.mjs';
import Card from '../models/Card.mjs';

dotenv.config();
await connectDB();

console.log('Cargando cardId existentes...');
const existingIds = new Set(
  (await Card.find({}, { cardId: 1, _id: 0 })).map(c => c.cardId)
);
console.log(`Encontrados ${existingIds.size} cardId existentes`);

const API_BASE = 'https://api.tcgdex.net/v2/es/cards';

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

const COMMON = [
  'commún',
  'uncommon',
  'ninguno',
  'une diamant',
  'deux diamant',
  'trois diamant',
  'quatre diamant',
  'une étoile',
  'deux étoiles',
  'trois étoiles',
  'couronne'
];

const RARE = [
  'rara',
  'holo rara',
  'rara doble',
  'rara blanco y negro',
  'increíbles',
  'shiny rare',
  'un chromatique',
  'deux chromatique'
];

const SPECIAL = [
  'holo rara v',
  'holo rara vmax',
  'holo rara vstar',
  'rara radiante',
  'rara ultra',
  'rara as táctico',
  'rara ilustración',
  'entrenador de arte completo',
  'shiny rare v',
  'shiny rare vmax'
];

const EPIC = [
  'rara secreto',
  'rara ilustración especial',
  'rara híper',
  'mega hiper raro',
  'rara ultra variocolor'
];

function generateStats(rarity = '') {
  const r = rarity.toLowerCase().trim();

  if (COMMON.some(x => r.includes(x))) {
    return { quantity: rand(20, 50), price: rand(10, 30) };
  }
  if (RARE.some(x => r.includes(x))) {
    return { quantity: rand(10, 25), price: rand(30, 80) };
  }
  if (SPECIAL.some(x => r.includes(x))) {
    return { quantity: rand(4, 12), price: rand(80, 180) };
  }
  if (EPIC.some(x => r.includes(x))) {
    return { quantity: rand(1, 5), price: rand(180, 350) };
  }

  return { quantity: rand(10, 20), price: rand(20, 50) };
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function normalize(value) {
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }
  return value;
}

function extractRealPrice(pricing) {
  if (!pricing) return null;

  // Cardmarket
  const cm = pricing.cardmarket;
  if (cm) {
    return cm.trend ??
      cm.avg ??
      cm.low ??
      null;
  }

  // Si no existe cardmarket, uso TCGPlayer normal
  const tcgNormal = pricing.tcgplayer?.normal;
  if (tcgNormal) {
    return tcgNormal.marketPrice ??
      tcgNormal.midPrice ??
      tcgNormal.lowPrice ??
      tcgNormal.highPrice ??
      null;
  }

  // Si no existe cardmarket, uso TCGPlayer holofoil
  const tcgHolofoil = pricing.tcgplayer?.holofoil;
  if (tcgHolofoil) {
    return tcgHolofoil.marketPrice ??
      tcgHolofoil.midPrice ??
      tcgHolofoil.lowPrice ??
      tcgHolofoil.highPrice ?? null;
  }

  // Si no existe cardmarket, uso TCGPlayer reverse-holofoil
  const tcgrReverseHolofoil = pricing.tcgplayer?.["reverse-holofoil"];
  if (tcgrReverseHolofoil) {
    return tcgrReverseHolofoil.marketPrice ??
      tcgrReverseHolofoil.midPrice ??
      tcgrReverseHolofoil.lowPrice ??
      tcgrReverseHolofoil.highPrice ??
      null;
  }

  return null;
}

try {
  console.log('Obteniendo lista de cartas...');
  const res = await fetch(API_BASE);
  const list = await res.json();

  console.log(`Encontradas ${list.length} cartas. Descargando en paralelo...`);

  const BATCH_SIZE = 50;
  const fullCards = [];

  // Ajustar precio y cantidad de cartas según conveniencia
  const MIN_PRICE = 50;
  const MAX_CARDS = 500;

  for (let i = 0; i < list.length; i += BATCH_SIZE) {
    const batch = list.slice(i, i + BATCH_SIZE);
    const promises = batch.map(card => fetch(`${API_BASE}/${card.id}`).then(r => r.json()));
    const results = await Promise.allSettled(promises);

    for (const r of results) {
      if (r.status === 'fulfilled') {
        const detail = r.value;

        if (!detail.image) {
          continue;
        }

        if (existingIds.has(detail.id)) {
          continue;
        }

        const stats = generateStats(detail.rarity);
        const price2 = extractRealPrice(detail.pricing);
        // const quantity = price2 === null ? 0 : stats.quantity;
        if (price2 === null || price2 < MIN_PRICE) {
          continue;
        }

        const quantity = stats.quantity;

        fullCards.push({
          cardId: detail.id,
          localId: detail.localId,
          name: detail.name,
          image: detail.image,
          category: detail.category || null,
          illustrator: detail.illustrator || null,
          rarity: detail.rarity || null,
          set: normalize(detail.set),
          hp: detail.hp || null,
          types: normalize(detail.types) || [],
          stage: detail.stage || null,
          attacks: Array.isArray(normalize(detail.attacks))
            ? normalize(detail.attacks).map(a => ({
              cost: normalize(a.cost) || [],
              name: a.name || null,
              effect: a.effect || null,
              damage: a.damage || null
            }))
            : [],
          weaknesses: Array.isArray(normalize(detail.weaknesses))
            ? normalize(detail.weaknesses).map(w => ({
              type: w.type || null,
              value: w.value || null
            }))
            : [],
          resistances: Array.isArray(normalize(detail.resistances))
            ? normalize(detail.resistances).map(r => ({
              type: r.type || null,
              value: r.value || null
            }))
            : [],
          abilities: Array.isArray(normalize(detail.abilities))
            ? normalize(detail.abilities).map(ab => ({
              name: ab.name || null,
              effect: ab.effect || null,
              type: ab.type || null
            }))
            : [],
          price: price2,
          quantity: quantity
        });

        if (fullCards.length >= MAX_CARDS) {
          console.log('Se alcanzaron 1000 cartas');
          await Card.insertMany(fullCards);
          process.exit(0);
        }

        existingIds.add(detail.id);
      }
    }

    console.log(`Batch ${i / BATCH_SIZE + 1} procesado (${fullCards.length} nuevas cartas)`);
    await sleep(300);
  }

  if (fullCards.length) {
    console.log(`Insertando ${fullCards.length} cartas nuevas...`);
    await Card.insertMany(fullCards);
  } else {
    console.log('No hay cartas nuevas para insertar');
  }

  console.log('Proceso finalizado');
  process.exit(0);
} catch (error) {
  console.error('Error:', error);
  process.exit(1);
}