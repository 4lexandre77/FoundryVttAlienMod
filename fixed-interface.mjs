const MODULE_SOCKET = "fixed-player-interface";
console.log('test');
// Fonction pour afficher/retirer l’overlay rouge animé
export function toggleRedLightOverlay(enable) {
  console.log,log( 'toggleRedLightOverlay called with enable:', enable);
  let overlay = document.getElementById("al_redlight_overlay");

  if (enable && !overlay) {
    overlay = document.createElement("div");
    overlay.id = "al_redlight_overlay";
    overlay.style.position = "fixed";
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
    overlay.style.pointerEvents = "none";
    overlay.style.zIndex = "9999";
    overlay.style.animation = "fadeRed 2s infinite";
    document.body.appendChild(overlay);

    if (!document.getElementById("al_redlight_style")) {
      const style = document.createElement("style");
      style.id = "al_redlight_style";
      style.textContent = `
        @keyframes fadeRed {
          0% { opacity: 0.1; }
          50% { opacity: 0.4; }
          100% { opacity: 0.1; }
        }
      `;
      document.head.appendChild(style);
    }
  } else if (!enable && overlay) {
    overlay.remove();
  }
}

Hooks.once("ready", () => {
  console.log("Initialisation du module Fixed Player Interface...");

  // Enregistre un écouteur pour tous les clients
  game.socket.on(`module.${MODULE_SOCKET}`, (payload) => {
     console.log("[Socket reçu]", payload); // <-- Ajout de test
    if (payload?.action === "toggleRedLight") {
      toggleRedLightOverlay(payload.enable);
    }
  });

  // Interface utilisateur (uniquement visible par MJ)
  if (!game.user.isGM) return;

  // Container principal
  const containerId = 'al_interface';
  const old = document.getElementById(containerId);
  if (old) old.remove();

  const container = document.createElement('div');
  container.id = containerId;
  container.style.position = "fixed";
  container.style.bottom = "10px";
  container.style.left = "10px";
  container.style.backgroundColor = "rgba(0,0,0,0.6)";
  container.style.padding = "10px";
  container.style.borderRadius = "8px";
  container.style.zIndex = "10000";
  container.style.color = "white";
  container.style.fontFamily = "Arial, sans-serif";

  // Bouton RedLight
  const redLightBtn = document.createElement("button");
  redLightBtn.textContent = "RedLight";
  redLightBtn.style.padding = "5px 10px";
  redLightBtn.style.cursor = "pointer";

  redLightBtn.addEventListener("click", () => {
    console.log("Bouton RedLight cliqué");
    const isActive = !!document.getElementById("al_redlight_overlay");

    // Envoie à tous les clients, incluant le MJ
    game.socket.emit(`module.${MODULE_SOCKET}`, {
      action: "toggleRedLight",
      enable: !isActive
    });
  });

  container.appendChild(redLightBtn);
  document.body.appendChild(container);
});
