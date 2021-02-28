'use strict';
const jwksDownloader = require('./jwks-downloader');

/**
 * register click event for the form that requires encryption.
 */
function registerPasswordSubmitEvent(
  passwordElt,
  passwordConfirmElt,
  submitBtnElt,
  authFormElt
) {
  if (!passwordElt) {
    throw 'No password elt provided';
  }

  submitBtnElt.onclick = function (e) {
    // check if the passwords match
    if (!validatePasswordConfirm(passwordElt, passwordConfirmElt)) {
      return false;
    }

    // enhancedPwd with a 'timestamp' value (to prevent a replay attack)
    const enhancedPwd = {
      timestamp: new Date(),
      pwd: passwordElt.value,
    };

    jwksDownloader
      .keyPromise()
      .then((encKey) => {
        if (encKey) {
          return jwksDownloader.encryptPwd(enhancedPwd, encKey);
        } else {
          return passwordElt.value;
        }
      })
      .then((encryptedPwd) => {
        passwordElt.value = encryptedPwd;
        if (passwordConfirmElt != null) passwordConfirmElt.value = encryptedPwd;
        // Submit the form when the password encryption is completed.
        authFormElt.submit();
      })
      .catch((error) => {
        throw error;
      });
    return false;
  };
}

function validatePasswordConfirm(passwordElt, passwordConfirmElt) {
  if (passwordConfirmElt == null) {
    return true;
  }

  if (passwordElt.value === passwordConfirmElt.value) {
    return true;
  }

  // display error
  const mismatchError = document.getElementById('mismatchError');

  if (mismatchError == null) {
    const divAlert = document.createElement('div');
    divAlert.id = 'mismatchError';
    divAlert.className = 'alert alert-error';
    const spanAlert = document.createElement('span');
    spanAlert.className = 'pficon pficon-error-circle-o';
    divAlert.appendChild(spanAlert);
    const spanText = document.createElement('span');
    spanText.className = 'kc-feedback-text';
    spanText.textContent = "Password confirmation doesn't match.";
    divAlert.appendChild(spanText);

    const contentWrapper = document.getElementById('kc-content-wrapper');
    contentWrapper.parentElement.insertBefore(divAlert, contentWrapper);
  }

  return false;
}

module.exports = {
  registerPasswordSubmitEvent,
};
