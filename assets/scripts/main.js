const validEmailRegExp = /^(?!.+@(gmail|google|yahoo|outlook|hotmail|msn)\..+)(.+@.+\..+)$/;
const validateEmail = (email) => {
  return email.toLowerCase().match(validEmailRegExp);
}

window.addEventListener('load', () => {
  // elements
  const bookingForm = document.querySelector('form.booking-form');
  const businessEmailInput = document.querySelector('.form-group.business-email input');
  const businessEmailFormGroup = document.querySelector('.form-group.business-email');
  const businessSizeSelect = document.querySelector('.form-group.business-size select');
  const businessSizeFormGroup = document.querySelector('.form-group.business-size');
  const importanceIndicatorFormGroup = document.querySelector('.form-group.importance-indicator');

  // common functions
  const validateBusinessEmail = () => {
    const businessEmail = businessEmailInput.value;
    const validIcon = '<i class="feedback-icon fas fa-check-circle"></i>';
    const invalidIcon = '<i class="feedback-icon fas fa-exclamation-triangle"></i>';

    if (validateEmail(businessEmail)) {
      businessEmailFormGroup.classList.remove('invalid');
      businessEmailFormGroup.classList.add('valid');
      document.querySelectorAll('.feedback-icon').forEach((el) => el.remove());
      businessEmailInput.insertAdjacentHTML('afterend', validIcon);
      return true;
    }
    businessEmailFormGroup.classList.remove('valid');
    businessEmailFormGroup.classList.add('invalid');
    document.querySelectorAll('.feedback-icon').forEach((el) => el.remove());
    businessEmailInput.insertAdjacentHTML('afterend', invalidIcon);
    return false;
  }

  const validateBusinessSize = () => {
    const isValid = !!businessSizeSelect.value.length;
    if (isValid) {
      businessSizeFormGroup.classList.remove('invalid');
      businessSizeFormGroup.classList.add('valid');
      return true;
    }
    businessSizeFormGroup.classList.remove('valid');
    businessSizeFormGroup.classList.add('invalid');
    return false;
  }

  const validateImportanceIndicator = () => {
    const isValid = !!importanceIndicatorFormGroup.querySelectorAll('input[type=radio][checked=checked]').length;
    if (isValid) {
      importanceIndicatorFormGroup.classList.remove('invalid');
      return true;
    }
    importanceIndicatorFormGroup.classList.add('invalid');
    return false;
  }

  const isQualified = () => {
    const businessSize = businessSizeSelect.value;
    const importanceIndicator = importanceIndicatorFormGroup.querySelector('input[type=radio][checked=checked]').value;

    return !(businessSize === '1-10' || ['Document Storage', 'Full Text Search', 'Price'].includes(importanceIndicator));
  }

  // event handlers
  businessEmailInput.addEventListener('input', () => {
    if (bookingForm.classList.contains('was-validated')) {
      validateBusinessEmail();
    }
  });

  businessSizeSelect.addEventListener('change', () => {
    if (bookingForm.classList.contains('was-validated')) {
      validateBusinessSize();
    }
  });

  importanceIndicatorFormGroup.querySelectorAll('input[type=radio]+span').forEach((el) => {
    el.addEventListener('click', () => {
      console.log('aaa');
      if (bookingForm.classList.contains('was-validated')) {
        validateImportanceIndicator();
      }
    });
  })

  bookingForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let isValidForm = true;
    isValidForm &= validateBusinessEmail();
    isValidForm &= validateBusinessSize();
    isValidForm &= validateImportanceIndicator();

    if (isValidForm) {
      if (isQualified()) {
        location.href = 'qualified.html';
      } else {
        location.href = 'unqualified.html';
      }
    } else {
      bookingForm.classList.add('was-validated');
    }
  });
});
