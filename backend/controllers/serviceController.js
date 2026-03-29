const Service = require('../models/Service');

const SEED_SERVICES = [
  { title: 'Logo Design', description: 'Elevate your brand with bespoke logo designs – where creativity meets identity.', icon: 'sparkles', order: 1 },
  { title: 'Poster Design', description: 'Compelling visuals that speak louder than words, leaving a lasting impact on your audience.', icon: 'image', order: 2 },
  { title: 'Resume Design', description: 'Stand out with a bespoke resume design that showcases your skills in a visually compelling way.', icon: 'document', order: 3 },
  { title: 'UI/UX Design', description: 'Transform your digital presence with UI design expertise for a sleek and user-friendly experience.', icon: 'device-phone-mobile', order: 4 },
  { title: 'Visiting Card', description: 'Elevate your professional image with personalized, impactful visiting cards that make an impression.', icon: 'credit-card', order: 5 },
  { title: 'Menu Design', description: 'Serve up style with menu card designs that make your dishes look as good as they taste.', icon: 'clipboard-list', order: 6 },
  { title: 'Social Media Design', description: "Boost your brand's online impact with eye-catching social media designs that engage your audience.", icon: 'share', order: 7 },
  { title: 'Brochure Design', description: 'Make your business shine with professionally curated brochures that captivate and inform.', icon: 'book-open', order: 8 },
];

const getServices = async (req, res, next) => {
  try {
    const services = await Service.find({ active: true }).sort({ order: 1 });
    res.json({ success: true, data: services });
  } catch (error) {
    next(error);
  }
};

const seedServices = async (req, res, next) => {
  try {
    await Service.deleteMany({});
    const services = await Service.insertMany(SEED_SERVICES);
    res.json({ success: true, message: `Seeded ${services.length} services` });
  } catch (error) {
    next(error);
  }
};

module.exports = { getServices, seedServices };