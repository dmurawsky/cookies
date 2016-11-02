export function trackEvent(event, metaData){
  if (event && metaData)
    window.Intercom('trackEvent', event, metaData);
  else if (event)
    window.Intercom('trackEvent', event);
}

export function updateUser(update){
  if (update) window.Intercom('update', update);
}
