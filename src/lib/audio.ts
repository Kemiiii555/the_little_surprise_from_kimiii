const SONG_SRC = "/assets/birthday-song.mp3";
const VOLUME = 0.58;

let player: HTMLAudioElement | null = null;
let enabled = false;

function ensure() {
  if (typeof window === "undefined") return null;
  if (!player) {
    player = new Audio(SONG_SRC);
    player.loop = true;
    player.preload = "auto";
    player.volume = VOLUME;
    player.setAttribute("data-birthday-song", "true");
    player.style.display = "none";
    document.body.appendChild(player);
  }
  return player;
}

export async function unlockAudio() {
  const el = ensure();
  if (!el) return;
  try {
    el.muted = true;
    await el.play();
    if (!enabled) {
      el.pause();
      el.currentTime = 0;
    }
    el.muted = false;
  } catch {
    if (el) el.muted = false;
  }
}

export function setMusicEnabled(on: boolean) {
  enabled = on;
  const el = ensure();
  if (!el) return;
  if (on) {
    el.muted = false;
    el.volume = VOLUME;
    void el.play().catch(() => {
      /* autoplay blocked until the next tap */
    });
  } else {
    el.pause();
  }
}
