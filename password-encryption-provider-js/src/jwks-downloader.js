'use strict';
/**
 * Get keycloak default RSA public key and encrypt password.
 */
const jose = require('node-jose');

function encryptPwd(pwd, encKey) {
  return jose.JWE.createEncrypt({ format: 'compact' }, encKey)
    .update(JSON.stringify(pwd))
    .final();
}

function removeUseFromKeys(jwks) {
  return {
    keys: jwks.keys.map((key) => {
      key.use = 'enc';
      key.alg = 'RSA-OAEP';
      return key;
    }),
  };
}

function getServerUrl() {
  const locationHost = window.location.hostname;
  const locationPort = window.location.port;
  const locationPathname = window.location.pathname;
  const locationProtocol = window.location.protocol;
  const realmConst = 'realms';

  const realmNameStartPosition =
    locationPathname.indexOf('realms') + realmConst.length + 1;
  const realmNameEndPosition = locationPathname.indexOf(
    '/',
    realmNameStartPosition
  );
  const realmName = locationPathname.substring(
    realmNameStartPosition,
    realmNameEndPosition
  );

  return `${locationProtocol}//${locationHost}:${locationPort}/auth/realms/${realmName}/.well-known/openid-configuration`;
}

function keyPromise() {
  return fetch(getServerUrl())
    .then((response) => response.json())
    .then((json) => {
      return fetch(json.jwks_uri);
    })
    .then((response) => response.json())
    .then((jwks) => {
      return jose.JWK.asKeyStore(removeUseFromKeys(jwks));
    })
    .then((keystore) => {
      return keystore.get({ use: 'enc' });
    })
    .catch((error) => {
      //some error handling
      throw error;
    });
}

module.exports = {
  keyPromise,
  encryptPwd,
};
