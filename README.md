# keycloak-encryption-provider

A keycloak password encryption provider.

Encrypt the password by the realm default RSA public key when login.

## Development

Build the java project, copy `keycloak-password-provider.jar` to KEYCLOAK_HOME/standalone/deployments.

```shell
cd password-encryption-provider
./gradlew shadowJar
```

Build the js project, copy `dist/password-encryption-provider.js` to KEYCLOAK_HOME/themes/base/login/resources/js/.

```shell
cd password-encryption-provider-js
npm ci && npm run build
```

Add `scripts=js/password-encryption-provider.js` to the file
`KEYCLOAK_HOME/themes/base/login/theme.properties`, to make sure the keycloak will load the js file when login.

By default, the KEYCLOAK_HOME is /opt/jboss/keycloak.

## Usage

Git clone the source, build java and js, and rebuild the keycloak images by yourself.

Or pull the docker image `nxest/keycloak-encryption-provider`, add a init container to your keycloak helm charts, copy the release files to the keycloak home.

## Compatibility

| Release | Keycloak Version |
| ------- | ---------------- |
| 1.x.x   | 10.x/11.x/12.x   |

## License

Licensed under Apache 2.0. Copyright (c) 2021 [nxest.com](https://nxest.com)
