import * as types from '../../setup/actionTypes';
import FB from '../../utils/firebase';

const USER_REF = FB('users');
let userRef;

export function startWatchingUser(uid) {
  userRef = USER_REF.child(uid);
  return dispatch => {
    userRef.on('value', function (snap){
      const user = snap.val();
      dispatch({type:types.USER_UPDATE,user:(user?user:{cart:[]})});
    });
  };
}

export function stopWatchingUser() {
  return dispatch => {
    USER_REF.off('value', function (){
      dispatch({type:types.USER_OFF});
    });
  };
}

export function updateQty(prodId, qty) {
  return () => {
    userRef.child('cart/'+prodId).set(qty);
  };
}

export function updatePhone(phone) {
  return () => {
    userRef.child('phone').set(phone);
  };
}
