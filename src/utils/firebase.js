export default function fbRef(path){
  return firebase.database().ref(path);  // eslint-disable-line
}
