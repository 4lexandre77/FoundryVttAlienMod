// == Alien Interface Custom Token Selector ==
Hooks.once('ready', () => {
  const actorIds = [
    "exLz5VadImLmTSEj",
    "SlbqsxdyQAq56zNp",
    "XXqGPU6tUU4eskVS",
    "TyjlUgog6hZ8KstP",
    "k5C2sNYGEooubICx",
    "HUnu7zUGVGzThmLH"
  ];

  const controlSizedefault = 0.75;
  const containerId = 'al_interface';

  // Supprimer l'ancien conteneur s'il existe
  const old = document.getElementById(containerId);
  if (old) old.remove();

  // Création des conteneurs
  const container = document.createElement('div');
  container.id = containerId;

  const subContainer = document.createElement('div');
  subContainer.id = 'al_actors';
  subContainer.style.transform = `scale(${controlSizedefault})`;
  subContainer.style.transformOrigin = 'bottom';

  const controlContainer = document.createElement('div');
  controlContainer.id = 'al_controls';

  const buttonSizeInc = document.createElement('button');
  const buttonSizeDec = document.createElement('button');
  buttonSizeInc.textContent = '+';
  buttonSizeDec.textContent = '−';
  controlContainer.appendChild(buttonSizeInc);
  controlContainer.appendChild(buttonSizeDec);

  document.body.appendChild(container);
  container.appendChild(controlContainer);
  container.appendChild(subContainer);

  let currentScale = controlSizedefault;
  function updateScale() {
    subContainer.style.transform = `scale(${currentScale})`;
  }

  buttonSizeInc.addEventListener('click', () => {
    if (currentScale < 1.5) {
      currentScale = Math.min(1.5, currentScale + 0.05);
      updateScale();
    }
  });

  buttonSizeDec.addEventListener('click', () => {
    if (currentScale > 0.2) {
      currentScale = Math.max(0.2, currentScale - 0.05);
      updateScale();
    }
  });

  const createActorDisplay = (actorId) => {
    const actor = game.actors.get(actorId);
    if (!actor) return;

    const actorContainer = document.createElement('div');
    actorContainer.classList.add('actor-container');

    const img = document.createElement('img');
    img.src = actor.img;
    img.alt = actor.name;
    img.style.width = "175px";
    img.style.height = "175px";
    img.style.cursor = "pointer";

    // Clic simple sur l’image pour sélectionner le token
    img.addEventListener("click", async () => {
      if (!actor.isOwner) {
        ui.notifications.warn("Tu ne contrôles pas ce personnage.");
        return;
      }

      const tokens = canvas.tokens.placeables.filter(t => t.actor?.id === actor.id && t.isOwner);
      if (tokens.length === 0) {
        ui.notifications.warn("Aucun token actif pour ce personnage sur la scène.");
        return;
      }

      const token = tokens[0];

      // Contrôle du token
      await token.control({ releaseOthers: true });

      // Ajout de la classe "active" au conteneur cliqué, suppression des autres
      document.querySelectorAll('.actor-container').forEach(el => el.classList.remove('active'));
      actorContainer.classList.add('active');
    });

    // Double clic sur le conteneur pour ouvrir la fiche
    actorContainer.addEventListener("dblclick", () => {
      actor.sheet.render(true);
    });

    const nameDiv = document.createElement('div');
    const updateStats = () => {
      const health = actor.system.header?.health?.value ?? "?";
      const stress = actor.system.header?.stress?.value ?? "?";
      nameDiv.textContent = `${actor.name} : ${health} - ${stress}`;
    };
    updateStats();

    actorContainer.appendChild(img);
    actorContainer.appendChild(nameDiv);
    subContainer.appendChild(actorContainer);

    Hooks.on("updateActor", (updatedActor) => {
      if (updatedActor.id === actorId) updateStats();
    });
  };

  actorIds.forEach(createActorDisplay);

  const toggleBtn = document.createElement('button');
  toggleBtn.textContent = 'Fermer';
  toggleBtn.id = 'al_toggle';
  toggleBtn.addEventListener('click', () => {
    if (!container.classList.contains('al_hidden')) {
      container.classList.add('al_hidden');
      toggleBtn.textContent = 'Ouvrir';
    } else {
      container.classList.remove('al_hidden');
      toggleBtn.textContent = 'Fermer';
    }
  });
  document.body.appendChild(toggleBtn);







  /*Sélecteur background*/
  if (!game.user.isGM) return; // Ne montrer le menu que pour les MJ

  // Crée le conteneur
  const dropdown = document.createElement("select");
  dropdown.id = "al_background-selector";

  // Liste des backgrounds (ajoute ou modifie les options ici)
  const backgrounds = {
    "Sélectionnez un fond...": "",
    "Accueil": "my-assets/alien/alien-earth.jpg",
    "Container": "my-assets/alien/chambres.jpg",
    "Cargo": "my-assets/alien/cargo.jpg"
  };

  // Remplit les options
  for (const [label, path] of Object.entries(backgrounds)) {
    const option = document.createElement("option");
    option.value = path;
    option.textContent = label;
    dropdown.appendChild(option);
  }

  // Gère le changement
  dropdown.addEventListener("change", async (e) => {
    const selected = e.target.value;
    if (!selected) return;

    await game.scenes.active.update({
      background: {
        src: selected
      }
    });

    ui.notifications.info("Image de fond changée !");
  });

  // Ajoute au DOM
  document.body.appendChild(dropdown);
  
});
