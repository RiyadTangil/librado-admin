// ----------------------------------------------------------------------
const loginInfo = JSON.parse(localStorage.getItem("loginInfo")) || {}
const account = {
  displayName: 'Admin',
  email: loginInfo?.email || 'admin@gmail.com',
  photoURL: '/static/mock-images/avatars/avatar_default.jpg'
};

export default account;
