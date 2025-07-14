type AuthHeader = {
  'auth-token': string;
};

export default function authHeader() {
  const token = localStorage.getItem('token')
  if (token) {
    const config: AuthHeader = { 'auth-token': token }
    return config
  } else {
    return {}
  }
}