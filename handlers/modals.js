export const open_modal = ({title, contentHtml, footerHtml, element, submitAction}) => {
    const modalLayer = document.getElementById('modal-layer');
    modalLayer.innerHTML = `
        <div class="modal-backdrop"></div>
        <div class="modal-content">
            <span class="modal-title">${title}</span>
            ${contentHtml}
            <button class="btn-close-modal">×</button>
            ${footerHtml ? `<div class="modal-footer">${footerHtml}</div>` : ''}
        </div>
    `;
    modalLayer.style.display = 'block';

    modalLayer.querySelector('.btn-close-modal').onclick = close_modal;
    modalLayer.querySelector('.modal-backdrop').onclick = close_modal;
    if (modalLayer.querySelector('.btn-cancel')) modalLayer.querySelector('.btn-cancel').onclick = close_modal;
    if (modalLayer.querySelector('.btn-submit')) {
        modalLayer.querySelector('.btn-submit').onclick = () => {
            if(submitAction) submitAction();
            close_modal();
        };
    }

    // Place the modal above, below, left, or right of the element depending on space
    if(element) {
        const rect = element.getBoundingClientRect();
        const modalContent = modalLayer.querySelector('.modal-content');
        modalContent.style.position = 'absolute';

        const space_from_top = rect.top;
        const space_from_bottom = window.innerHeight - rect.bottom;
        const space_from_left = rect.left;
        const space_from_right = window.innerWidth - rect.right;

        modalContent.style.left = (rect.left + rect.width / 2 - modalContent.offsetWidth / 2) + 'px';
        if (space_from_top > modalContent.offsetHeight) {
            modalContent.style.top = (rect.top - modalContent.offsetHeight - 10) + 'px';
            modalContent.classList.add('arrow-bottom');
            
        } else if (space_from_bottom > modalContent.offsetHeight) {
            modalContent.style.top = (rect.bottom + 10) + 'px';
            modalContent.classList.add('arrow-top');
        }
    }
};

export const open_options_modal = ({title, element, option_btns}) => {
    const contentHtml = option_btns.map(btn => `<button class="btn-option ${btn.classes || ''}" data-id="${btn.id}">
        ${btn.icon ? `<span class="icon">${btn.icon}</span>` : ''}${btn.label}
    </button>`).join('');
    open_modal({element, title, contentHtml: `<div class="options-container">${contentHtml}</div>`});

    option_btns.forEach(btn => {
        const btnEl = document.querySelector(`.btn-option[data-id="${btn.id}"]`);
        if(btnEl) {
            btnEl.onclick = () => {
                if(btn.onclick) btn.onclick();
                close_modal();
            };
        }
    });
};

export const close_modal = () => {
    const modalLayer = document.getElementById('modal-layer');
    modalLayer.style.display = 'none';
    modalLayer.innerHTML = '';
};