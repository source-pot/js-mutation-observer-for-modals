
const MODAL_HIDE_CLASS = 'modal--hidden';

const showModal = event => {
    document.querySelector(`.${event.target.dataset.target}`).classList.remove(MODAL_HIDE_CLASS);
}

const onModalClassListChange = mutationList => {
    mutationList.forEach(mutationEvent => {
        const modal = mutationEvent.target;
        if(modal.classList.contains(MODAL_HIDE_CLASS)) {
            // the modal was just hidden, no further action required
            return;
        }

        // implied: the modal is being shown, process it's content
        const url = modal.dataset.url;
        setTimeout(() => {
            fetch(url)
                .then(response => response.text())
                .then(html => {
                    modal.querySelector('.modal__body').innerHTML = html;
                })
                .catch(err => console.log(err));
        }, 2000);
    });
}

const hideModal = event => {
    let modal = event.target;
    while(!modal.classList.contains('modal')) {
        modal = modal.parentElement;
    }

    modal.classList.add(MODAL_HIDE_CLASS);
}

(() => {
    // initialiser for MutationObserver
    const mu = new MutationObserver(onModalClassListChange);
    document
        .querySelectorAll('.modal')
        .forEach(modal => mu.observe(modal, {attributes: true, attributeFilter: ['class']}));

    // capture all show modal buttons
    document
        .querySelectorAll('.button--show-modal')
        .forEach(btn => btn.addEventListener('click', showModal));

    // capture all close modal buttons
    document
        .querySelectorAll('.modal__button--close')
        .forEach(btn => btn.addEventListener('click', hideModal));
})();
