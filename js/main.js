/* Spine Portfolio starter
 * Export your Spine skeleton as JSON + atlas into assets/character/.
 * Match the player runtime major/minor version to your Spine Editor version.
 */
(() => {
  "use strict";

  const CONFIG = {
    skeleton: "./assets/character/Illust_KenethNewYear2026_PS.json",
    atlas: "./assets/character/Illust_KenethNewYear2026_PS.atlas",
    defaultAnimation: "idle",
    clickAnimation: "point",
    clickAnimationLoops: false,
    idleAnimation: "idle",
    speed: 1
  };

  const status = document.getElementById("player-status");
  const placeholder = document.getElementById("player-placeholder");
  const errorBox = document.getElementById("player-error");
  const currentAnimation = document.getElementById("current-animation");
  const buttons = [...document.querySelectorAll(".animation-button")];
  const speedSelect = document.getElementById("speed-select");
  const playerHost = document.getElementById("spine-player");

  let player = null;
  let playerReady = false;

  function setStatus(message) {
    status.textContent = message;
  }

  function setActiveButton(name) {
    buttons.forEach((button) => {
      const active = button.dataset.animation.toLowerCase() === name.toLowerCase();
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    currentAnimation.textContent = name.toUpperCase();
  }

  function playAnimation(name, loop) {
    if (!playerReady || !player) {
      setStatus("ADD SPINE ASSETS");
      return;
    }
    try {
      player.setAnimation(name, loop);
      setActiveButton(name);
      setStatus("PLAYER READY");
    } catch (error) {
      showError(`애니메이션 "${name}"을(를) 재생할 수 없습니다. Spine 프로젝트의 실제 애니메이션 이름을 확인하세요.`);
      console.error(error);
    }
  }

  function showError(message) {
    errorBox.hidden = false;
    errorBox.textContent = message;
    setStatus("CHECK ASSETS");
  }

  function initPlayer() {
    if (!window.spine || !window.spine.SpinePlayer) {
      showError("Spine Web Player를 불러오지 못했습니다. 인터넷 연결과 CDN 주소를 확인하세요.");
      return;
    }

    player = new spine.SpinePlayer("spine-player", {
      skeleton: CONFIG.skeleton,
      atlas: CONFIG.atlas,
      animation: CONFIG.defaultAnimation,
      showControls: true,
      defaultMix: 0.18,
      backgroundColor: "#17171e",
      alpha: false,
      success: (loadedPlayer) => {
        player = loadedPlayer;
        playerReady = true;
        placeholder.hidden = true;
        errorBox.hidden = true;
        setStatus("PLAYER READY");
        setActiveButton(CONFIG.defaultAnimation);
        player.setAnimation(CONFIG.defaultAnimation, true);
        player.canvas.style.cursor = "pointer";

        // Clicking the rendered character canvas plays the configured action.
        // Player controls remain separate, so their UI is not covered by an overlay.
        player.canvas.addEventListener("click", () => {
          playAnimation(CONFIG.clickAnimation, CONFIG.clickAnimationLoops);
          // Queue the idle animation after the one-shot action.
          if (playerReady) {
            player.animationState.addAnimation(0, CONFIG.idleAnimation, true, 0);
          }
        });
      },
      error: (_failedPlayer, reason) => {
        placeholder.hidden = false;
        showError(`Spine 파일을 읽지 못했습니다. assets/character/ 안에 character.json, character.atlas 및 atlas에 지정된 PNG가 있는지 확인하세요. 상세: ${reason}`);
        console.error("Spine Player error:", reason);
      }
    });
  }

  buttons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.classList.contains("active")));
    button.addEventListener("click", () => {
      const name = button.dataset.animation;
      const loop = button.dataset.loop === "true";
      playAnimation(name, loop);
      if (playerReady && !loop) {
        player.animationState.addAnimation(0, CONFIG.idleAnimation, true, 0);
      }
    });
  });

  speedSelect.addEventListener("change", () => {
    if (player) {
      player.speed = Number(speedSelect.value);
    }
  });

  // Start the official player. If local assets have not been added yet,
  // the error panel explains what to do; the rest of the portfolio still works.
  initPlayer();
})();
