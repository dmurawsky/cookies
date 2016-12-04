import moment from 'moment';

export default {
  user:{
    userSignedIn: false,
    showSignIn: false,
    cardToken:"",
    lastFour:"4242",
    zip:"",
    apptDate:moment().add(3,'d').format('YYYY-MM-DD'),
    apptTime:8,
    invoices:[]
  },
  myStuff:{
    editStuffModal:{
      description:"",
      notes:"",
      photos:[],
      show:false
    },
    customer:[],
    pickup:[],
    stored:[],
    delivery:[]
  },
  cart: {
    emailThankYou:false,
    showEmailField:false,
    showCart:false,
    pricing:[],
    products: [],
    appointments:[8,10,12,14,16,18],
  },
  settings:{},
  content:{
    faqs:[],
    faqcats:[],
    verbiage:{}
  }
};
