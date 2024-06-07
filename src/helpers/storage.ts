const userAddress = "userAddress";

const accessToken = "dex_access_token";
const accessTokenIAO = "user_access_token";

export const themeIAO = "theme";
export const userThemeIAO = "user_theme";
export const userLanguageIAO = "user_language";
export const roleAffiliate = "role_affiliate";

export function hasStorageJwtToken() {
  return !!localStorage.getItem(accessToken);
}
export function hasLoggedInIaoDex() {
  return (
    !!localStorage.getItem(accessToken) &&
    !!localStorage.getItem(accessTokenIAO) &&
    !!localStorage.getItem(userAddress)
  );
}

export function removeStorageJwtToken() {
  localStorage.removeItem(accessToken);
  localStorage.removeItem(accessTokenIAO);
  localStorage.removeItem(userAddress);
}

export function setStorageJwtToken(token: string) {
  localStorage.setItem(accessToken, token);
}

export function getStorageJwtToken() {
  return localStorage.getItem(accessToken);
}

export function getStorageJwtTokenIAO() {
  return localStorage.getItem(accessTokenIAO);
}

export function getStorageUserAddress() {
  return localStorage.getItem(userAddress);
}

export function setStorageTheme(theme: string) {
  localStorage.setItem(themeIAO, theme);
  localStorage.setItem(userThemeIAO, theme);
}

export function setStorageLanguage(language: string) {
  localStorage.setItem(userLanguageIAO, language);
}

export function getStorageUserTheme() {
  return localStorage.getItem(userThemeIAO);
}

export function getStorageUserLanguage() {
  return localStorage.getItem(userLanguageIAO);
}

export function setRoleAffiliate(role: string) {
  return localStorage.setItem(roleAffiliate, role);
}

export function getRoleAffiliate() {
  return localStorage.getItem(roleAffiliate);
}

export { userAddress };
