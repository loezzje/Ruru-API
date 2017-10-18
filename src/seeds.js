const feathers = require('feathers/client');
const rest = require('feathers-rest/client');
const superagent = require('superagent');
const hooks = require('feathers-hooks');

const app = require('./app');
const mongooseClient = app.get('mongooseClient');

const organizations = [{
  _id: new mongooseClient.Types.ObjectId(),
  name: 'COA - Centre of Asylum',
  logo: 'https://www.coa.nl/sites/www.coa.nl/themes/coa_bs/logo.png',
  tagline: 'Questions about your asylum process? Contact COA',
  about: 'COA is responsible for the reception, supervision and departure (from the reception location) of asylum seekers coming to the Netherlands',
  features: ['Payment of pocket money', 'Referral of specialist services', 'Counseling and support', 'Accommodation advise'],
  website: 'www.coa.nl',
  phone: '0887157000',
  address: 'Rijsntraat 8 2515 XP Den Haag',
  frontpage: true
}, {
  _id: new mongooseClient.Types.ObjectId(),
  name: 'IND - Immigration and Naturalization',
  logo: 'https://ind.nl/_catalogs/masterpage/ind/img/logo.png',
  about: 'IND assess all applications from foriegn nationals who want to live in the Netherlands or want to become Dutch citizens. They also handle your asylum procedure.',
  features: ['Asylum procedure'],
  website: 'www.ind.nl',
  phone: '0880430430',
  address: 'Stadhouderskade 85 1073 AT Amsterdam',
  frontpage: false
},
{
  _id: new mongooseClient.Types.ObjectId(),
  name: 'I Amsterdam',
  logo: 'http://allemediavacatures.nl/wp-content/uploads/2017/02/I-amsterdam-logo.png',
  tagline: 'All about visiting, living and working in Amsterdam',
  about: 'You can find practical information about where to look for work, accommodation or studying in Amsterdam. It is meant for tourists, but also acts as the English information site of City Counsil',
  features: ['Finding work', 'Practical information about living in Amsterdam, inclusing taxes', 'Information about Universities in Amsterdam'],
  website: 'www.iamsterdam.com/en',
  frontpage: false
},
{
  _id: new mongooseClient.Types.ObjectId(),
  name: 'Vluchtelingenwerk',
  logo: 'https://www.vluchtelingenwerk.nl/sites/public/u895/Logo_VluchtelingenWerk.jpg',
  about: 'Vluchtelingenwerk can support you during your asylum procedure.',
  features: ['Asylum procedure', 'Family reunion', 'Support with return requests'],
  website: 'www.vluchtelingenwerk.nl',
  phone: '0203467200',
  address: 'Surinameplein 122 1058 GV Amsterdam',
  frontpage: true
}
];

const categories = [
  { _id: new mongooseClient.Types.ObjectId(), name: 'Housing',
    icon: 'home', tagline: 'Organizations that help with living and housing in the Netherlands',
    frontPage: true, organizationsId: [organizations[2]['_id']]},
  { _id: new mongooseClient.Types.ObjectId(), name: 'Learn',
    icon: 'school', tagline: 'Education and learning',
    frontPage: true, organizationsId: [organizations[2]['_id']]},
  { _id: new mongooseClient.Types.ObjectId(), name: 'Rights and Law',
    icon: 'https://image.flaticon.com/icons/svg/116/116347.svg',
    tagline: 'More information about your rights and Dutch regulations',
    frontPage: false, organizationsId: [organizations[0]['_id'],organizations[1]['_id'],organizations[3]['_id']]},
  { _id: new mongooseClient.Types.ObjectId(), name: 'Work',
    icon: 'https://image.flaticon.com/icons/svg/204/204112.svg', tagline: 'Starting point for all your work-related questions',
    frontPage: true},
  { _id: new mongooseClient.Types.ObjectId(), name: 'Health',
    icon: 'https://image.flaticon.com/icons/svg/340/340175.svg',
    tagline: 'More information about health issues',
    frontPage: true}
];




const ruru = [
  {about: 'Ruru helps refugees find their way in The Netherlands',
    phone: '0627102756',
    email: 'adamsc.au@gmail.com',
  }];

const faq = [{
  question: 'question 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vestibulum dictum justo, non porttitor leo blandit sed. Etiam ut iaculis nibh. Phasellus ut lacus vel dolor venenatis accumsan sit amet vitae quam. Vestibulum congue nunc sem, in consectetur dui volutpat eu. In a mi feugiat, interdum leo eget, viverra nisl .',
  answer: 'answer 1 Pellentesque purus enim, eleifend at lobortis sed, porttitor a odio. Nam faucibus iaculis sapien eu scelerisque. Cras feugiat arcu et lectus porttitor egestas. Pellentesque vel gravida metus, at faucibus velit. Duis felis neque, viverra quis mollis laoreet, mollis ac magna. Duis leo odio, congue id auctor tempus, molestie eget quam. Nunc condimentum tellus in purus posuere, et efficitur risus ornare.',
  categories: [categories[2]['_id']],
},
{
  question: 'question 2 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vestibulum dictum justo, non porttitor leo blandit sed. Etiam ut iaculis nibh. Phasellus ut lacus vel dolor venenatis accumsan sit amet vitae quam. Vestibulum congue nunc sem, in consectetur dui volutpat eu. In a mi feugiat, interdum leo eget, viverra nisl. Nam gravida massa est, nec facilisis mi venenatis eget. Suspendisse sed tincidunt lacus, ut mattis augue. Vestibulum pulvinar nibh sit amet massa tempus, ut consequat lorem volutpat. Curabitur eget convallis orci, eu cursus leo. .',
  answer: 'answer 2. Pellentesque purus enim, eleifend at lobortis sed, porttitor a odio. Nam faucibus iaculis sapien eu scelerisque. Cras feugiat arcu et lectus porttitor egestas. Pellentesque vel gravida metus, at faucibus velit. Duis felis neque, viverra quis mollis laoreet, mollis ac magna. Duis leo odio, congue id auctor tempus, molestie eget quam. Nunc condimentum tellus in purus posuere, et efficitur risus ornare.',
  categories: [categories[0]['_id']],
}
];


const feathersClient = feathers();

feathersClient
  .configure(hooks())
  .configure(rest('http://localhost:3030').superagent(superagent));


feathersClient.service('ruru').create(ruru)
  .then(() => {
    console.log('Ruru seeded...');
  }).catch((error) => {
    console.error('Error seeding ruru!', error.message);
  });

feathersClient.service('organizations').create(organizations)
  .then((result) => {
    console.log('Organization seeded...', result.name);
  }).catch((error) => {
    console.error('Error seeding organizations!', error.message);
  });

feathersClient.service('categories').create(categories)
  .then((result) => {
    console.log('Category seeded...', result.name);
  }).catch((error) => {
    console.error('Error seeding categories!', error.message);
  });

feathersClient.service('faq').create(faq)
  .then((result) => {
    console.log('faq seeded', result.categories);
  }).catch((error) =>{
    console.error('error seeding faq', error.message);
  });
