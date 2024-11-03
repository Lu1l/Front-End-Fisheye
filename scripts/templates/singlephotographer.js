function singlephotographerTemplate(data) {
  const { name, portrait, country, city, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getSingleUserCardDOM() {
    const articles = document.createElement("article");
    articles.classList.add("container");
    articles.setAttribute("aria-label", `Profil de ${name}`);

    const profile = document.createElement("div");
    profile.classList.add("photographer_card");
    profile.setAttribute("tabindex", "0");

    const button = document.createElement("button");
    button.classList.add("contact_button");
    button.textContent = "Contactez moi";
    button.setAttribute("aria-label", `Contacter ${name}`);
    button.setAttribute("tabindex", "0");
    button.addEventListener("click", () => displayModal2(name));

    const img = document.createElement("img");
    img.classList.add("photographer_cover");
    img.setAttribute("src", picture);
    img.setAttribute("alt", `Portrait de ${name}`);
    img.setAttribute("tabindex", "0");

    const h1 = document.createElement("h1");
    h1.classList.add("title");
    h1.setAttribute("tabindex", "0");

    const location = document.createElement("p");
    location.classList.add("location");
    location.setAttribute("tabindex", "0");
    location.setAttribute("aria-label", `Localisation:${city} ,${country} `);

    const pgTagline = document.createElement("p");
    pgTagline.classList.add("tagline");
    pgTagline.setAttribute("tabindex", "0");
    pgTagline.setAttribute("aria-label", `Slogan: ${tagline}`);

    h1.textContent = data.name;
    pgTagline.textContent = tagline;
    location.textContent = city + ", " + country;

    profile.appendChild(h1);
    profile.appendChild(location);
    profile.appendChild(pgTagline);

    articles.appendChild(profile);
    articles.appendChild(button);
    articles.appendChild(img);

    const div = document.createElement("div");
    div.classList.add("f");
    div.setAttribute("aria-label", "Informations du photographe");
    div.setAttribute("tabindex", "0");

    const pricePerDay = document.createElement("p");
    pricePerDay.textContent = price + "€/Jour";
    pricePerDay.setAttribute("tabindex", "0");
    pricePerDay.setAttribute("aria-label", `Prix par jour: ${price} euros`);

    const likesElement = document.createElement("p");
    const globalLikes = getGlobalLikes();
    likesElement.textContent = `${globalLikes} ♥`;
    likesElement.setAttribute("tabindex", "0");
    likesElement.setAttribute(
      "aria-label",
      `Nombre total de likes: ${globalLikes}`
    );

    document.body.appendChild(div);

    return articles;
  }

  return { getSingleUserCardDOM };
}

function getGlobalLikes() {
  return typeof getGlobalLikesFromMedia === "function"
    ? getGlobalLikesFromMedia()
    : 0;
}

function displayModal2(photographerName) {
  console.log("event:modal");
  const modal = document.createElement("div");
  modal.classList.add("contact_modal");
  modal.setAttribute("aria-label", "Formulaire de contact");
  modal.setAttribute("role", "dialog");

  const modalHeader = document.createElement("div");
  modalHeader.classList.add("modal_header");

  const h2 = document.createElement("h2");
  h2.textContent = "Contactez-moi";
  h2.setAttribute("tabindex", "0");

  const h3 = document.createElement("h3");
  h3.textContent = photographerName;
  h3.setAttribute("tabindex", "0");

  const closeButton = document.createElement("button");
  closeButton.classList.add("close_modal");
  closeButton.setAttribute("aria-label", "Fermer la modale");
  closeButton.setAttribute("tabindex", "0");
  closeButton.textContent = "×";

  closeButton.addEventListener("click", () => {
    closeModal();
    const contactButton = document.querySelector(".contact_button");
    if (contactButton) {
      contactButton.focus();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
      const contactButton = document.querySelector(".contact_button");
      if (contactButton) {
        contactButton.focus();
      }
    }
  });

  function closeModal() {
    const modal = document.querySelector(".contact_modal");
    if (modal) {
      modal.remove();
    }
  }

  modalHeader.appendChild(h2);
  modalHeader.appendChild(h3);
  modalHeader.appendChild(closeButton);

  const form = document.createElement("form");
  form.setAttribute(
    "aria-label",
    `Formulaire de contact pour ${photographerName}`
  );

  const formGroups = [
    { label: "Prénom", id: "firstname", type: "text" },
    { label: "Nom", id: "lastname", type: "text" },
    { label: "Email", id: "email", type: "email" },
    { label: "Message", id: "message", type: "textarea" },
  ];

  formGroups.forEach((group) => {
    const formGroup = document.createElement("div");
    formGroup.classList.add("form_group");

    const label = document.createElement("label");
    label.setAttribute("for", group.id);
    label.textContent = group.label;
    label.setAttribute("tabindex", "0");

    const input =
      group.type === "textarea"
        ? document.createElement("textarea")
        : document.createElement("input");

    input.id = group.id;
    input.name = group.id;
    input.required = true;
    input.setAttribute("tabindex", "0");
    input.setAttribute(
      "aria-label",
      `${group.label} ${group.required ? "obligatoire" : ""}`
    );

    formGroup.appendChild(label);
    formGroup.appendChild(input);
    form.appendChild(formGroup);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = {
      firstname: form.firstname.value,
      lastname: form.lastname.value,
      email: form.email.value,
      message: form.message.value,
    };
    console.log("Données du formulaire :", formData);
    closeModal();
  });

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.classList.add("submit_button");
  submitButton.textContent = "Envoyer";
  submitButton.setAttribute("tabindex", "0");
  submitButton.setAttribute("aria-label", "Envoyer le formulaire");

  form.appendChild(submitButton);

  modal.appendChild(modalHeader);
  modal.appendChild(form);
  document.body.appendChild(modal);
  const firstInput = modal.querySelector("input");
  if (firstInput) {
    firstInput.focus();
  }
}
