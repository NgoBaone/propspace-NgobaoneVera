import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import User from '../models/User.js';
import Property from '../models/Property.js';

const run = async () => {
  await connectDB();

  await Property.deleteMany({});
  await User.deleteMany({});

  const demo = await User.create({
    username: 'demo',
    email: 'demo@propspace.app',
    password: 'demo123',
    phone: '+237 600 000 000',
    avatar: '',
  });

  const img = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`;

  // Modern African homes across the continent.
  const listings = [
    {
      title: 'Palm Court Villa',
      description:
        'A contemporary villa with floor-to-ceiling glass, a shaded veranda and a private pool, set in a quiet residential estate.',
      price: 2800, purpose: 'Rent', propertyType: 'House',
      city: 'Accra', country: 'Ghana', bedrooms: 4, bathrooms: 3,
      images: [img('1600585154340-be6161a56a0c'), img('1600596542815-ffad4c1539a9')],
    },
    {
      title: 'Lekki Modern Townhouse',
      description:
        'A sleek townhouse in a gated community, with an open-plan living area, fitted kitchen and rooftop terrace overlooking the lagoon.',
      price: 3500, purpose: 'Rent', propertyType: 'House',
      city: 'Lagos', country: 'Nigeria', bedrooms: 4, bathrooms: 4,
      images: [img('1564013799919-ab600027ffc6'), img('1568605114967-8130f3a36994')],
    },
    {
      title: 'Kilimani Garden Apartment',
      description:
        'A bright apartment with a wraparound balcony, secure parking and quick access to schools, cafés and the city centre.',
      price: 1200, purpose: 'Rent', propertyType: 'Apartment',
      city: 'Nairobi', country: 'Kenya', bedrooms: 3, bathrooms: 2,
      images: [img('1502672260266-1c1ef2d93688'), img('1493809842364-78817add7ffb')],
    },
    {
      title: 'Bastos Glass Residence',
      description:
        'A striking modern home in the diplomatic quarter, featuring large windows, a landscaped garden and a double carport.',
      price: 320000, purpose: 'Sale', propertyType: 'House',
      city: 'Yaoundé', country: 'Cameroon', bedrooms: 5, bathrooms: 4,
      images: [img('1512917774080-9991f1c4c750'), img('1613977257363-707ba9348227')],
    },
    {
      title: 'Camp Bay Designer Studio',
      description:
        'A compact, light-filled studio with sea views, smart appliances and a sleek finish — ideal for professionals.',
      price: 950, purpose: 'Rent', propertyType: 'Studio',
      city: 'Cape Town', country: 'South Africa', bedrooms: 1, bathrooms: 1,
      images: [img('1502005229762-cf1b2da7c5d6'), img('1505691938895-1758d7feb511')],
    },
    {
      title: 'Riviera Hillside Villa',
      description:
        'An elegant hillside villa with an infinity pool, open terraces and panoramic views across the lagoon.',
      price: 450000, purpose: 'Sale', propertyType: 'House',
      city: 'Abidjan', country: "Côte d'Ivoire", bedrooms: 5, bathrooms: 5,
      images: [img('1613490493576-7fde63acd811'), img('1570129477492-45c003edd2be')],
    },
    {
      title: 'Oysterbay Modern Apartment',
      description:
        'A spacious two-bedroom apartment near the coast, with a balcony, fitted kitchen and 24-hour security.',
      price: 1100, purpose: 'Rent', propertyType: 'Apartment',
      city: 'Dar es Salaam', country: 'Tanzania', bedrooms: 2, bathrooms: 2,
      images: [img('1493809842364-78817add7ffb'), img('1522708323590-d24dbb6b0267')],
    },
    {
      title: 'Kololo Family House',
      description:
        'A comfortable family home on a leafy street, with a generous garden, covered parking and a modern open-plan interior.',
      price: 275000, purpose: 'Sale', propertyType: 'House',
      city: 'Kampala', country: 'Uganda', bedrooms: 4, bathrooms: 3,
      images: [img('1568605114967-8130f3a36994'), img('1518780664697-55e3ad937233')],
    },
  ].map((l) => ({ ...l, owner: demo._id }));

  await Property.insertMany(listings);

  console.log(`Seeded ${listings.length} modern African listings.`);
  console.log('Demo login -> email: demo@propspace.app  password: demo123');

  await mongoose.connection.close();
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
