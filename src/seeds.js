const feathers = require('feathers/client');
const rest = require('feathers-rest/client');
const superagent = require('superagent');
const hooks = require('feathers-hooks');

// first populate the categories by running yarn run seed.
// then scroll down to next comment

const categories = [
  {name: 'Housing',
    icon: 'https://image.flaticon.com/icons/svg/109/109737.svg',
    frontPage: true},
  {name: 'Learn',
    icon: 'https://image.flaticon.com/icons/svg/182/182327.svg',
    frontPage: false},
  {name: 'Rights and Law',
    icon: 'https://image.flaticon.com/icons/svg/116/116347.svg',
    frontPage: false},
  {name: 'Work',
    icon: 'https://image.flaticon.com/icons/svg/204/204112.svg',
    frontPage: true},
  {name: 'Health',
    icon: 'https://image.flaticon.com/icons/svg/340/340175.svg',
    frontPage: true}
];

const feathersClient = feathers();

feathersClient
  .configure(hooks())
  .configure(rest('http://localhost:3030').superagent(superagent));


categories.map((categories) => {
  feathersClient.service('categories').create(categories)
    .then((result) => {
      console.log('Category seeded...', result.name);
    }).catch((error) => {
      console.error('Error seeding categories!', error.message);
    });
});


// comment the section above, between the previous comment and this comment
// uncomment the entire section below, and seed again: yarn run seed.
// , you actually need to copy the id's from the categories information into
// the categories array. Ask Marloes if you feel lost.

// const organizations = [{
//   name: 'COA - Centre of Asylum',
//   logo: 'https://www.coa.nl/sites/www.coa.nl/themes/coa_bs/logo.png',
//   tagline: 'Questions about your asylum process? Contact COA',
//   about: 'COA is responsible for the reception, supervision and departure (from the reception location) of asylum seekers coming to the Netherlands',
//   features: ['Payment of pocket money', 'Referral of specialist services', 'Counseling and support', 'Accommodation advise'],
//   website: 'www.coa.nl',
//   phone: '0887157000',
//   address: 'Rijsntraat 8 2515 XP Den Haag',
//   categories: [],
//   frontpage: true
// }, {
//   name: 'IND - Immigration and Naturalization',
//   logo: 'https://ind.nl/_catalogs/masterpage/ind/img/logo.png',
//   about: 'IND assess all applications from foriegn nationals who want to live in the Netherlands or want to become Dutch citizens. They also handle your asylum procedure.',
//   features: ['Asylum procedure'],
//   website: 'www.ind.nl',
//   phone: '0880430430',
//   address: 'Stadhouderskade 85 1073 AT Amsterdam',
//   categories: [],
//   frontpage: false
// },
// {
//   name: 'I Amsterdam',
//   logo: 'http://allemediavacatures.nl/wp-content/uploads/2017/02/I-amsterdam-logo.png',
//   tagline: 'All about visiting, living and working in Amsterdam',
//   about: 'You can find practical information about where to look for work, accommodation or studying in Amsterdam. It is meant for tourists, but also acts as the English information site of City Counsil',
//   features: ['Finding work', 'Practical information about living in Amsterdam, inclusing taxes', 'Information about Universities in Amsterdam'],
//   website: 'www.iamsterdam.com/en',
//   categories: [],
//   frontpage: false
// },
// {
//   name: 'Vluchtelingenwerk',
//   logo: 'https://www.vluchtelingenwerk.nl/sites/public/u895/Logo_VluchtelingenWerk.jpg',
//   about: 'Vluchtelingenwerk can support you during your asylum procedure.',
//   features: ['Asylum procedure', 'Family reunion', 'Support with return requests'],
//   website: 'www.vluchtelingenwerk.nl',
//   phone: '0203467200',
//   address: 'Surinameplein 122 1058 GV Amsterdam',
//   categories: [],
//   frontpage: true
// }
// ];
//
// const feathersClient = feathers();
//
// feathersClient
//   .configure(hooks())
//   .configure(rest('http://localhost:3030').superagent(superagent));
//

// organizations.map((organizations) => {
//   feathersClient.service('organizations').create(organizations)
//     .then((result) => {
//       console.log('Organization seeded...', result.name);
//     }).catch((error) => {
//       console.error('Error seeding organizations!', error.message);
//     });
// });
//
//
