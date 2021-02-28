const browserFormPwdEncrypt = require('./form-pwd-encryptor');

/**
 * Register custom form events when window load
 */
window.onload = function () {
  const authFormLoginElt = this.document.getElementById('kc-form-login');

  if (authFormLoginElt != null) {
    const submitBtnLoginElt = this.document.getElementById('kc-login');
    const passwordLoginElt = this.document.getElementById('password');

    browserFormPwdEncrypt.registerPasswordSubmitEvent(
      passwordLoginElt,
      null,
      submitBtnLoginElt,
      authFormLoginElt
    );
  }
};
