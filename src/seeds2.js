const feathers = require('feathers/client');
const rest = require('feathers-rest/client');
const superagent = require('superagent');
const hooks = require('feathers-hooks');



const ruru = [
  {about: 'Ruru helps refugees find their way in The Netherlands',
    phone: '0627102756',
    email: 'adamsc.au@gmail.com',
  }];

const faq = [{
  question: 'question 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vestibulum dictum justo, non porttitor leo blandit sed. Etiam ut iaculis nibh. Phasellus ut lacus vel dolor venenatis accumsan sit amet vitae quam. Vestibulum congue nunc sem, in consectetur dui volutpat eu. In a mi feugiat, interdum leo eget, viverra nisl .',
  answer: 'answer 1 Pellentesque purus enim, eleifend at lobortis sed, porttitor a odio. Nam faucibus iaculis sapien eu scelerisque. Cras feugiat arcu et lectus porttitor egestas. Pellentesque vel gravida metus, at faucibus velit. Duis felis neque, viverra quis mollis laoreet, mollis ac magna. Duis leo odio, congue id auctor tempus, molestie eget quam. Nunc condimentum tellus in purus posuere, et efficitur risus ornare.',
  categories: ['59e4ba94109a2d706a678b2d', '59e4ba94109a2d706a678b2c']
},
{
  question: 'question 2 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vestibulum dictum justo, non porttitor leo blandit sed. Etiam ut iaculis nibh. Phasellus ut lacus vel dolor venenatis accumsan sit amet vitae quam. Vestibulum congue nunc sem, in consectetur dui volutpat eu. In a mi feugiat, interdum leo eget, viverra nisl. Nam gravida massa est, nec facilisis mi venenatis eget. Suspendisse sed tincidunt lacus, ut mattis augue. Vestibulum pulvinar nibh sit amet massa tempus, ut consequat lorem volutpat. Curabitur eget convallis orci, eu cursus leo. .',
  answer: 'answer 2. Pellentesque purus enim, eleifend at lobortis sed, porttitor a odio. Nam faucibus iaculis sapien eu scelerisque. Cras feugiat arcu et lectus porttitor egestas. Pellentesque vel gravida metus, at faucibus velit. Duis felis neque, viverra quis mollis laoreet, mollis ac magna. Duis leo odio, congue id auctor tempus, molestie eget quam. Nunc condimentum tellus in purus posuere, et efficitur risus ornare.',
  categories: ['59e4ba94109a2d706a678b2d', '59e4ba94109a2d706a678b2c']
}];



const feathersClient = feathers();

feathersClient
  .configure(hooks())
  .configure(rest('http://localhost:3030').superagent(superagent));



feathersClient.service('ruru').create(ruru)
  .then((result) => {
    console.log('Ruru seeded...', result.email);

    faq.map((faq) => {
      feathersClient.service('faq').create(faq)
        .then((result) => {
          console.log('faq seeded', result.question);
        }).catch((error) =>{
          console.error('error seeding faq', error.message);
        });
    });
  }).catch((error) => {
    console.error('Error seeding categories!', error.message);
  });
