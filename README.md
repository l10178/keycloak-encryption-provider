# keycloak-password-encryption

## 基本功能

实现 keycloak 登录密码加密传输。

## 实现基本原理

- 前端 js 获取 keycloak 可用的公钥，然后使用该公钥对 password 字段数据进行加密。
- 后端使用 CredentialProvider 拦截登录信息，使用私钥对 password 进行解密。

## 如何使用

### 编译 provider&部署 jar

```shell
gradle shadowJar
```

编译后会在 build/libs 文件夹下生成 keycloak-password-provider.jar，将该 jar 包 cp 到{keycloak home}/standalone/deployments/ 路径下。

### 编译 js&部署 js

```shell
cd /password-encryption-provider-js
npm install
npm run build
```

编译后，会在/password-encryption-provider-js/login/resources/js/ 文件夹下生成 password-encryption-provider.js，将该 js 文件 cp 到{keycloak home}/themes/base/login/resources/js/路径下。

然后，将“scripts=js/password-encryption-provider.js”cp 到{keycloak home}/themes/base/login/theme.properties 文件内。

## 已适配 Keycloak 版本

当前源码中所使用版本为 Keycloak-12.0.3 版本，如果使用其他版本的 Keycloak 其他版本，只需在修改/password-encryption-provider/build.gradle 中 keycloak 版本，重新编译即可。

### 已适配版本

- 10.0.2
- 12.0.2
- 12.0.3

## 局限性

- 仅仅实现了登陆密码加密传输
- 添加密码&修改密码未实现加密传输
