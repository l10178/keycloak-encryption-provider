FROM busybox:1.32
ENV KEYCLOAK_HOME=/opt/jboss/keycloak
ADD ./password-encryption-provider/build/libs/password-encryption-provider.jar $KEYCLOAK_HOME/standalone/deployments/
ADD ./password-encryption-provider-js/dist/password-encryption-provider.js $KEYCLOAK_HOME/themes/base/login/resources/js/
ADD ./password-encryption-provider-js/theme.properties $KEYCLOAK_HOME/themes/base/login/
