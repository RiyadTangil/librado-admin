// ----------------------------------------------------------------------
const email = JSON.parse(localStorage.getItem("loginInfo")).email
const account = {
  displayName: 'Admin',
  email: email || 'admin@gmail.com',
  photoURL: '/static/mock-images/avatars/avatar_default.jpg'
};

export default account;
