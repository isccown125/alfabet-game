export const showModal = (title, description)=>{
    const modal = document.createElement('div')
    modal.innerHTML = `
        <header>
            <h2 class="modal-title">${title}</h2>
        </header>
        <div class="modal-content">
            ${description}
        </div>
    `
    modal.id = 'modal';

    const button = document.createElement('button');
    button.textContent = 'Ok!';
    modal.append(button)
    const modalBackdrop = backdrop();
    button.addEventListener('click', ()=>{
        modal.remove();
        modalBackdrop.remove();
    })
    document.body.prepend(modal);
}

const backdrop = ()=>{
    const backdrop = document.createElement('div');
    backdrop.className = 'backdrop'
    document.body.prepend(backdrop);
    return backdrop
}