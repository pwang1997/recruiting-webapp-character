import { useCallback, useState } from "react";
import { Attributes } from "../types";
import { DEFAULT_CHARACTER } from "../characterConsts";
import AttributePanel from "./attribute-panel";
import ClassPanel from "./class-panel";
import SkillPanel from "./skill-panel";
import { postUrl } from "../apis";

export default function CreateCharacterPanel({
  characterTemplate,
}: {
  characterTemplate?: Attributes;
}) {
  const [character, setCharacter] = useState<Attributes>(
    characterTemplate ?? DEFAULT_CHARACTER
  );

  const saveCharacter = useCallback(() => {
    fetch(postUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(character),
    })
      .then(() => {
        alert("Character Saved!");
      })
      .catch((err) => {
        console.error(err);
      });
  }, [character]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <div>
          <AttributePanel character={character} setCharacter={setCharacter} />
        </div>

        <div>
          <ClassPanel character={character} />
        </div>

        <div>
          <SkillPanel character={character} />
        </div>
      </div>
      <button onClick={() => saveCharacter()}>Save Character</button>
    </div>
  );
}
