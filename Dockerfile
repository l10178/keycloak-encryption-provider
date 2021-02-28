FROM busybox:1.32
ENV RELEASE_HOME=/keycloak-encryption-provider
ADD ./password-encryption-provider/build/libs/password-encryption-provider.jar $RELEASE_HOME/standalone/deployments/
ADD ./password-encryption-provider-js/dist/password-encryption-provider.js $RELEASE_HOME/themes/base/login/resources/js/
ADD ./password-encryption-provider-js/theme.properties $RELEASE_HOME/themes/base/login/
