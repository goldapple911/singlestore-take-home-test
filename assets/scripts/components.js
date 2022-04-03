HTMLElement.prototype.wrap = function (wrapper) {
  this.parentNode.insertBefore(wrapper, this);
  wrapper.appendChild(this);
}

window.addEventListener('load', () => {
  // customize mutually-exclusive radios
  document.querySelectorAll('input[type=radio]+span').forEach((el) => {
    el.addEventListener('click', () => {
      const radio = el.previousElementSibling;
      console.log(radio);
      const group = radio.getAttribute('group');
      document.querySelectorAll(`input[type=radio][group=${group}]`).forEach((el) => {
        el.removeAttribute('checked');
      });
      radio.setAttribute('checked', 'checked');
    });
  });

  // customize select
  document.querySelectorAll('select.custom-select').forEach((el) => {
    const classes = el.className;
    const id = el.id;
    const name = el.name;
    const placeholder = el.getAttribute('placeholder');

    let template = '';
    template += `<div class="${classes}"${id ? ` id="${id}"` : ''}${name ? ` name="${name}"` : ''}>`;
    template += `<span class="custom-select-trigger placeholder">${placeholder}</span>`;
    template += `<div class="custom-options">`;
    for (let i = 1; i < el.childElementCount; i++) {
      const option = el.children.item(i);
      template += `<span class="custom-option ${option.className}" data-value="${option.value}">${option.innerHTML}</span>`;
    }
    template += `</div></div>`;

    const wrapper = document.createElement('div');
    wrapper.classList.add('custom-select-wrapper');
    el.wrap(wrapper);
    el.insertAdjacentHTML('afterend', template);
  });
  document.querySelectorAll('.custom-select-wrapper .custom-select-trigger').forEach((el) => {
    el.addEventListener('click', (event) => {
      document.querySelector('html').addEventListener('click', () => {
        document.querySelector('.custom-select-wrapper div.custom-select').classList.remove('opened');
      }, { once: true });
      el.parentElement.classList.toggle('opened');
      event.stopPropagation();
    });
  });
  document.querySelectorAll('.custom-select-wrapper .custom-select .custom-options>.custom-option').forEach((el) => {
    el.addEventListener('click', () => {
      el.closest('.custom-select-wrapper').firstElementChild.value = el.getAttribute('data-value');
      el.closest('.custom-select-wrapper').firstElementChild.dispatchEvent(new Event('change'));
      for (let i = 0; i < el.parentElement.childElementCount; i++) {
        el.parentElement.children[i].classList.remove('selection');
      }
      el.classList.add('selection');
      el.closest('.custom-select-wrapper .custom-select').classList.remove('opened');
      el.closest('.custom-select-wrapper .custom-select').firstElementChild.classList.remove('placeholder');
      el.closest('.custom-select-wrapper .custom-select').firstElementChild.innerHTML = el.innerHTML;
    });
  });
});
