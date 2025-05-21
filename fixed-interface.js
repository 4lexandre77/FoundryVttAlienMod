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

  // Créer les boutons
  const buttonSizeInc = document.createElement('button');
  const buttonSizeDec = document.createElement('button');
  buttonSizeInc.textContent = '+';
  buttonSizeDec.textContent = '−';

  // Ajouter les boutons au conteneur de contrôle
  controlContainer.appendChild(buttonSizeInc);
  controlContainer.appendChild(buttonSizeDec);

  // Ajouter les conteneurs au DOM
  document.body.appendChild(container);
  container.appendChild(controlContainer);
  container.appendChild(subContainer);

  // Initialiser l'échelle
  let currentScale = controlSizedefault;

  // Met à jour l'échelle
  function updateScale() {
    subContainer.style.transform = `scale(${currentScale})`;
    //subContainer.style.transformOrigin = 'left bottom';
  }

  // Événements des boutons
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

  // Crée un affichage pour un acteur
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

    img.addEventListener("click", () => {
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

  // Crée les acteurs
  actorIds.forEach(createActorDisplay);


  /*toggleBtn*/
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
});

Hooks.on("renderChatMessage", (message, html, data) => {
  var journalUuid = null;
  //console.log(message.content);
  if (message.content.includes('Lancé Machines lourdes') ||
      message.content.includes('Rolling Heavy Machinery')) {
    journalUuid = 'JournalEntry.wswshUHJJ7soa9Bt.JournalEntryPage.Q6XNN2FrKoBp72Nl';
  }
  if (message.content.includes('Lancé Combat rapproché')||
      message.content.includes('Rolling Close Combat')){
    journalUuid = '';
  }
  if (message.content.includes('Lancé Endurance') ||
      message.content.includes('Rolling Stamina')){
    journalUuid = 'JournalEntry.wswshUHJJ7soa9Bt.JournalEntryPage.2BhmcFw9CkX4XJQf';
  }
  if (message.content.includes('Lancé Combat à distance') ||
      message.content.includes('Rolling Ranged Combat')){
    journalUuid = 'JournalEntry.wswshUHJJ7soa9Bt.JournalEntryPage.Ikr53AnJMnU4UVER';
  }
  if (message.content.includes('Lancé Pilotage') ||
      message.content.includes('Rolling Piloting')){
    journalUuid = 'JournalEntry.wswshUHJJ7soa9Bt.JournalEntryPage.0zaUkEVHVxfKc0oR';
  }
  if (message.content.includes('Lancé Commandement') ||
      message.content.includes('Rolling Command')){
    journalUuid = 'JournalEntry.wswshUHJJ7soa9Bt.JournalEntryPage.HfxVBDaAhZcTu6R7';
  }
  if (message.content.includes('Lancé Manipulation') ||
      message.content.includes('Rolling Manipulation')){
    journalUuid = 'JournalEntry.wswshUHJJ7soa9Bt.JournalEntryPage.uDye5iLrCj0jiCjc';
  }
  if (message.content.includes('Lancé Soins médicaux') ||
      message.content.includes('Rolling Medical Aid')){
    journalUuid = 'JournalEntry.wswshUHJJ7soa9Bt.JournalEntryPage.p9Nbv3wOVB95OGbN';
  }
  if (message.content.includes('Lancé Observation') ||
      message.content.includes('Rolling Observation')){
    journalUuid = 'JournalEntry.wswshUHJJ7soa9Bt.JournalEntryPage.uIoW9HfltAi5bPrN';
  }
  if (message.content.includes('Lancé Mobilité') ||
      message.content.includes('Rolling Mobility')){
    journalUuid = 'JournalEntry.wswshUHJJ7soa9Bt.JournalEntryPage.SIOmrTeXbk0V5CdU';
  }
  if (message.content.includes('Lancé Survie') ||
      message.content.includes('Rolling Survival')){
    journalUuid = 'JournalEntry.wswshUHJJ7soa9Bt.JournalEntryPage.g1yBCFzFgssITb8g';
  }
  if (message.content.includes('Lancé Comtech') ||
      message.content.includes('Rolling Comtech')){
    journalUuid = 'JournalEntry.wswshUHJJ7soa9Bt.JournalEntryPage.Y36ipV1S2Oe7Q6Xb';
  }

  if (journalUuid !== null) {
    const linkHtml = `<p><span class="open-journal-link" data-uuid="${journalUuid}" style="color: #007bff; text-decoration: underline; cursor: pointer;">Voir la documentation</span></p>`;
    html.find(".message-content").append(linkHtml);
    
    html.find(".open-journal-link").on("click", async (event) => {
      event.preventDefault();
      const uuid = event.currentTarget.dataset.uuid;
      const doc = await fromUuid(uuid);
      if (doc) {
        doc.sheet.render(true);
      } else {
        ui.notifications.warn("Impossible d’ouvrir la page du journal.");
      }
      return false; 
    });
  }
});