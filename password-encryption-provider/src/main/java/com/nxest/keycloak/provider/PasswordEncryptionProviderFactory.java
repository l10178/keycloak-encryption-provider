/*
 * Copyright 2021 nxest.com. and/or its affiliates
 * and other contributors as indicated by the @author tags.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.nxest.keycloak.provider;

import org.keycloak.credential.CredentialProviderFactory;
import org.keycloak.models.KeycloakSession;

/**
 * A custom password encryption provider.
 *
 * @author l10178
 */
public class PasswordEncryptionProviderFactory implements CredentialProviderFactory<PasswordEncryptionProvider> {

    public static final String PROVIDER_ID = "password-encryption-provider";

    @Override
    public PasswordEncryptionProvider create(KeycloakSession session) {
        return new PasswordEncryptionProvider(session);
    }

    @Override
    public String getId() {
        return PROVIDER_ID;
    }
}