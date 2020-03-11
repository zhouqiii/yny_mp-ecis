const TokenKey = 'x-access-token';

export function getToken() {
  return store.get(TokenKey);
}

export function setToken(token: string) {
  return store.set(TokenKey, token);
}

export function removeToken() {
  return store.remove(TokenKey);
}
