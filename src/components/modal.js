export const showModal = (title, cb) => {
  const modal = document.createElement("div");
  const content = document.createElement("div");
  content.className = "modal-content";

  modal.innerHTML = `
        <header>
            <h2 class="modal-title">${title}</h2>
        </header>
    `;
  modal.id = "modal";

  modal.appendChild(content);

  cb(content);

  const button = document.createElement("button");
  button.textContent = "Ok!";
  button.className = "modal-button";
  modal.append(button);
  const modalBackdrop = backdrop();
  button.addEventListener("click", () => {
    modal.remove();
    modalBackdrop.remove();
  });
  document.body.prepend(modal);
  return content;
};

export const backdrop = () => {
  const backdrop = document.createElement("div");
  backdrop.className = "backdrop";
  document.body.prepend(backdrop);
  return backdrop;
};
