import {EMAIL_THANKYOU, SHOW_EMAIL_FIELD, SIGN_OUT, EMPTY_CART, OPEN_CART, CLOSE_CART, INCREMENT_QTY, DECREMENT_QTY, LOAD_PRODUCTS, LOAD_PRICING, UPDATE_DELIVERY_PRICE} from '../../setup/actionTypes';
// import {findWithAttr} from '../../utils/objectHelper';
import objectAssign from 'object-assign';
import initialState from '../../setup/initialState';
import {updateUser} from '../../utils/intercom';

export default function cartReducer(state = initialState.cart, action) {

  switch (action.type) {

    case EMAIL_THANKYOU:
      return objectAssign({}, state, {emailThankYou:true});

    case SHOW_EMAIL_FIELD:
      return objectAssign({}, state, {showEmailField:true});

    case EMPTY_CART:
      return objectAssign({}, state, {products:state.products.map(prod=>{return objectAssign({},prod,{qty:0, subtotal:0});})});

    case INCREMENT_QTY:
      return objectAssign({}, state, {products:state.products.map(prod=>{return (prod._id==action.id?objectAssign({},prod,{qty:prod.qty+1, subtotal:(prod.qty+1)*prod.price}):prod);})});

    case DECREMENT_QTY:
      return objectAssign({}, state, {products:state.products.map(prod=>{return (prod._id==action.id?objectAssign({},prod,{qty:(prod.qty>0?prod.qty-1:0), subtotal:(prod.qty>0?prod.qty-1:0)*prod.price}):prod);})});

    case LOAD_PRODUCTS:
      return objectAssign({}, state, {products:action.products});

    case LOAD_PRICING:
      return objectAssign({}, state, {pricing:action.pricing});

    case OPEN_CART:
      return objectAssign({},state,{showCart:true});

    case CLOSE_CART:
      return objectAssign({},state,{showCart:false});

    case UPDATE_DELIVERY_PRICE:
      return objectAssign({},state,{deliveryLevel:action.level});

    case SIGN_OUT:
      return objectAssign({}, state, {products:state.products.map(prod=>{return objectAssign({},prod,{qty:0, subtotal:0});})});

    default:
      return state;
  }
}

export const getCartTotals = state => {
  let pickupQty = 0;
  let deliveryQty = 0;
  let newItemsQty = state.cart.products.reduce(function(prev, cur) {
    localStorage.setItem(cur._id, JSON.stringify({qty:cur.qty,subtotal:cur.subtotal}));
    return prev + cur.qty;
  }, 0);
  let qty = newItemsQty;
  state.myStuff.customer.map(item=>{
    if (item.pickup){
      pickupQty = pickupQty + 1;
    }
  });
  qty = qty + pickupQty;
  state.myStuff.stored.map(item=>{
    if (item.delivery){
      deliveryQty = deliveryQty + 1;
    }
  });
  qty = qty + deliveryQty;
  const price = state.cart.products.reduce(function(prev, cur) { return prev + (cur.price*cur.qty); }, 0);
  const final = { qty, price, newItemsQty, pickupQty, deliveryQty };
  updateUser(final);
  return final;
};
