/*eslint no-console: "error"*/

const feathers = require('feathers/client');
const rest = require('feathers-rest/client');
const superagent = require('superagent');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication-client');

const app = require('./app');
const mongooseClient = app.get('mongooseClient');

const user = {
  email: 'test@test.nl',
  password: 'test'
};

const categories = [
  { _id: new mongooseClient.Types.ObjectId(), // 0
    name: 'Housing',
    icon: 'home',
    tagline: 'Organizations that help with living and housing in the Netherlands',
    frontpage: true },
  { _id: new mongooseClient.Types.ObjectId(), // 1
    name: 'Learn',
    icon: 'school',
    tagline: 'Education and learning',
    frontpage: true },
  { _id: new mongooseClient.Types.ObjectId(), // 2
    name: 'Rights and Law',
    icon: 'account_balance',
    tagline: 'More information about your rights and Dutch regulations',
    frontpage: false },
  { _id: new mongooseClient.Types.ObjectId(), // 3
    name: 'Work',
    icon: 'work',
    tagline: 'Starting point for all your work-related questions',
    frontpage: true },
  { _id: new mongooseClient.Types.ObjectId(), // 4
    name: 'Health',
    icon: 'local_hospital',
    tagline: 'More information about health issues',
    frontpage: true }
];

const organizations = [
  { _id: new mongooseClient.Types.ObjectId(), // 0
    name: 'COA - Centre of Asylum',
    logo: 'https://www.coa.nl/sites/www.coa.nl/themes/coa_bs/logo.png',
    tagline: 'Questions about your asylum process? Contact COA',
    about: 'COA is responsible for the reception, supervision and departure (from the reception location) of asylum seekers coming to the Netherlands',
    features: [
      'Payment of pocket money',
      'Referral of specialist services',
      'Counseling and support',
      'Accommodation advise'
    ],
    website: 'www.coa.nl',
    phone: '0887157000',
    address: 'Rijnstraat 8 2515 XP Den Haag',
    frontpage: true,
    categoryIds: [categories[0]['_id'], categories[1]['_id']] },

  { _id: new mongooseClient.Types.ObjectId(), // 1
    name: 'IND - Immigration and Naturalization',
    logo: 'https://ind.nl/_catalogs/masterpage/ind/img/logo.png',
    about: 'IND assess all applications from foriegn nationals who want to live in the Netherlands or want to become Dutch citizens. They also handle your asylum procedure.',
    features: ['Asylum procedure'],
    website: 'www.ind.nl',
    phone: '0880430430',
    address: 'Stadhouderskade 85 1073 AT Amsterdam',
    frontpage: false,
    categoryIds: [categories[1]['_id'], categories[2]['_id']] },

  { _id: new mongooseClient.Types.ObjectId(), // 2
    name: 'I Amsterdam',
    logo: 'http://allemediavacatures.nl/wp-content/uploads/2017/02/I-amsterdam-logo.png',
    tagline: 'All about visiting, living and working in Amsterdam',
    about: 'You can find practical information about where to look for work, accommodation or studying in Amsterdam. It is meant for tourists, but also acts as the English information site of City Counsil',
    features: ['Finding work', 'Practical information about living in Amsterdam, inclusing taxes', 'Information about Universities in Amsterdam'],
    website: 'http://www.iamsterdam.com/en',
    adress: 'weesperplein Amsterdam',
    frontpage: false,
    categoryIds: [categories[3]['_id'], categories[4]['_id']] },

  { _id: new mongooseClient.Types.ObjectId(), // 3
    name: 'Vluchtelingenwerk',
    logo: 'https://www.vluchtelingenwerk.nl/sites/public/u895/Logo_VluchtelingenWerk.jpg',
    about: 'Vluchtelingenwerk can support you during your asylum procedure.',
    features: ['Asylum procedure', 'Family reunion', 'Support with return requests'],
    website: 'www.vluchtelingenwerk.nl',
    phone: '0203467200',
    address: 'Surinameplein 122 1058 GV Amsterdam',
    frontpage: true,
    categoryIds: [categories[0]['_id'], categories[3]['_id']] },

  { _id: new mongooseClient.Types.ObjectId(), // 4
    name: 'Refugees Welcome',
    logo: 'http://www.refugees-welcome.net/wp-content/uploads/sites/3/2015/11/logo-icon.png', //Tristan
    about: 'Online platform that allows refugees be able to live in flat-shares or houses instead of camps.',
    features: [
      'Information on your rights as a newcomer',
      'Match you with a local who can accommodate you',
      'Rent financial assistance',
      'On-going support once you’re housed'
    ],
    website: 'http://www.refugees-welcome.net',
    phone: '0049 (0)30 – 92 100 445',
    address: 'Postfach 65 03 05 13303 Berlin',
    frontpage: false,
    categoryIds: [categories[0]['_id']] },

  { _id: new mongooseClient.Types.ObjectId(), // 5
    name: 'Takecarebnb',
    logo: 'http://www.takecarebnb.com/wp-content/uploads/2016/02/tcbnb_logoflavicon.jpg', //Tristan
    about: 'Takecarebnb makes it possible that refugees with a residence permit can temporarily stay with Dutch host families, while waiting for their own home.',
    features: [
      'If you have a valid residence permit and are currently in a refugee centre waiting for a house but prefer to be stay temporarily with a Dutch family they can connect you',
      'Rent financial assistance',
    ],
    website: 'http://www.takecarebnb.com',
    phone: '0123456789', // no phone
    address: 'Nieuwe Herengracht 18 1018 DP Amsterdam',
    frontpage: false,
    categoryIds: [categories[0]['_id']] },
];

const ruru = [
  { about: 'Ruru helps refugees find their way in The Netherlands',
    phone: '0612345678',
    email: 'rur@ruru.ruru',
    address: 'no permanent location yet',
    instagram: 'https://www.instagram.com/ruruhandbook/',
    facebook: 'no facebook',
    twitter: 'no twitter' }
];

const faq = [
  { question: 'Are the terms ‘refugee’ and ‘migrant’ interchangeable?',
    answer: 'No. Although it is becoming increasingly common to see the terms ‘refugee’ and ‘migrant’ used interchangeably in media and public discussions, there is a crucial legal difference between the two. Confusing them can lead to problems for refugees and asylum-seekers, as well as misunderstandings in discussions of asylum and migration.',
    categoriesId: [categories[0]['_id']] },
  { question: 'What is unique about refugees?',
    answer: 'Refugees are specifically defined and protected in international law. Refugees are people outside their country of origin because of feared persecution, conflict, violence, or other circumstances that have seriously disturbed public order, and who, as a result, require ‘international protection’. Their situation is often so perilous and intolerable, that they cross national borders to seek safety in nearby countries, and thus become internationally recognized as ‘refugees’ with access to assistance from states, UNHCR, and relevant organizations. They are so recognized precisely because it is too dangerous for them to return home, and they therefore need sanctuary elsewhere. These are people for whom denial of asylum has potentially deadly consequences.',
    categoriesId: [categories[1]['_id']] }
];

const feathersClient = feathers();

feathersClient
  .configure(hooks())
  .configure(rest('http://localhost:3030').superagent(superagent))
  .configure(auth());

/* eslint-disable no-console */
/* eslint-disable indent */
 feathersClient.service('users').create(user)
 .then(() => {
  console.log('user seeded...');

  feathersClient.authenticate({
    strategy: 'local',
    email: user.email,
    password: user.password
  })
    .then(() => {

      feathersClient.service('categories').create(categories)
        .then(() => {
          console.log('Categories seeded...' );
            feathersClient.service('faq').create(faq)
              .then(() => {
                console.log('faq seeded' );
                organizations.map(org => feathersClient.service('organizations').create(org));
              })
              // FAQ FINISHED
              .catch((error) =>{
                console.error('error seeding faq', error.message);
              });

        })
        // CATEGORIES FINISHED
        .catch((error) => {
          console.error('Error seeding categories!', error.message);
        });

      feathersClient.service('ruru').create(ruru)
        .then(() => {
          console.log('Ruru seeded...');

        })
        .catch((error) => {
          console.error('Error seeding ruru!', error.message);
        });
    })
    // AUTHENTICATION FINISHED
    .catch(function(error){
      console.error('Error authenticating!', error);
    });
 })
 // USER FINISHED
  .catch(function(error) {
    console.error('Error creating user!', error);
  });
