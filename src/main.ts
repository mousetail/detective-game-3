import { renderCharacterTile } from "./characters_page";
import dialogue from "./dialogue.yaml";
import "./style.css";
import backgroundImage from "./assets/background.png";

function createHeader(text: string): HTMLHeadingElement {
  const header = document.createElement("h1");
  header.textContent = text;
  return header;
}

document.body.appendChild(createHeader("Characters Mockup"));

const character_tile_container = document.createElement("div");
character_tile_container.classList.add("character-tile-container");
document.body.appendChild(character_tile_container);
const characterMap = Object.fromEntries(
  dialogue.characters.map((i) => [i.id, i])
);

for (const character of dialogue.characters) {
  character_tile_container.appendChild(
    renderCharacterTile(character, characterMap)
  );
}

document.body.appendChild(createHeader("Location Mockup"));

const location = document.createElement("img");
location.src = backgroundImage;
location.style.maxWidth = "calc(100vw - 4rem)";
document.body.appendChild(location);
