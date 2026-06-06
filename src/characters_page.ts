const portraits = {
  portrait_a: import("./assets/portraits/portrait_a.png"),
  portrait_b: import("./assets/portraits/portrait_b.png"),
  portrait_c: import("./assets/portraits/portrait_c.png"),
  portrait_d: import("./assets/portraits/portrait_d.png"),
  portrait_e: import("./assets/portraits/portrait_e.png"),
  portrait_f: import("./assets/portraits/portrait_f.png"),
  portrait_g: import("./assets/portraits/portrait_g.png"),
  portrait_h: import("./assets/portraits/portrait_h.png"),
  portrait_i: import("./assets/portraits/portrait_i.png"),
};

type Character = {
  id: string;
  name: string;
  gender: "m" | "f" | "TBD";
  image: keyof typeof portraits;
  team: string;
  character_description: string;
  relationships: {
    with: string;
    description: string;
  }[];
};

function createCharacterImage(character: Character): HTMLImageElement {
  const image = document.createElement("img");
  portraits[character.image].then((i) => (image.src = i.default));
  return image;
}

function createTable(
  values: [(string | Node)[], (string | Node)[]][],
  classNames: string[]
): HTMLTableElement {
  const tbl = document.createElement("table");
  tbl.classList.add(...classNames);

  const tbody = document.createElement("tbody");
  tbl.appendChild(tbody);

  for (const [rowName, rowContent] of values) {
    const row = document.createElement("tr");
    tbody.appendChild(row);

    const cell = document.createElement("th");
    cell.replaceChildren(...rowName);
    row.appendChild(cell);

    const cellBody = document.createElement("td");
    cellBody.replaceChildren(...rowContent);
    row.appendChild(cellBody);
  }

  return tbl;
}

function createHeader(text: string): HTMLHeadingElement {
  const header = document.createElement("h2");
  header.textContent = text;
  return header;
}

export function renderCharacterTile(
  character: Character,
  characters: { [id: string]: Character }
): HTMLDivElement {
  const div = document.createElement("div");
  div.classList.add("character-tile");

  const image = createCharacterImage(character);
  image.classList.add("character-tile-image");
  div.appendChild(image);

  const content = document.createElement("div");
  content.classList.add("content");
  div.appendChild(content);

  content.appendChild(
    createTable(
      (["name", "gender", "id", "team"] satisfies (keyof Character)[]).map(
        (i) => [[i], [character[i]]]
      ),
      []
    )
  );

  content.appendChild(createHeader("Description"));

  const character_description = document.createElement("p");
  character_description.textContent = character.character_description;
  content.appendChild(character_description);

  content.appendChild(createHeader("Relationships"));

  content.appendChild(
    createTable(
      (character.relationships ?? []).map((i) => [
        [createCharacterImage(characters[i.with]), i.with],
        [i.description],
      ]),
      ["relationships-table"]
    )
  );

  return div;
}
