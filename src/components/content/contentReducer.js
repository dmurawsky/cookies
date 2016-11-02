import {LOAD_FAQS_SUCCESS, LOAD_FAQCATS_SUCCESS} from '../../setup/actionTypes';
import initialState from '../../setup/initialState';
import objectAssign from 'object-assign';

export default function contentReducer(state = initialState.content, action) {
  switch (action.type) {

    case LOAD_FAQS_SUCCESS:
      return objectAssign({}, state, {faqs:action.faqs});

    case LOAD_FAQCATS_SUCCESS:
      return objectAssign({}, state, {faqcats:action.faqcats});

    default:
      return state;
  }
}
