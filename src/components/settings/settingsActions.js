import * as types from '../../setup/actionTypes';
import FB from '../../utils/firebase';

const SETTINGS_REF = FB('settings');

export function startWatchingSettings() {
  return dispatch => {
    SETTINGS_REF.on('value', function (snap){
      const settings = snap.val();
      dispatch({type:types.SETTINGS_UPDATE,settings:(settings?settings:{})});
    });
  };
}

export function stopWatchingSettings() {
  return dispatch => {
    SETTINGS_REF.off('value', function (){
      dispatch({type:types.SETTINGS_OFF});
    });
  };
}
