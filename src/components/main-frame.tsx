import { useState } from "react";
import { Attributes } from "../types";
import { DEFAULT_CHARACTER } from "../characterConsts";
import AttributePanel from "./attribute-panel";
import ClassPanel from "./class-panel";
import SkillPanel from "./skill-panel";

export default function MainFrame() {
  const [character, setCharacter] = useState<Attributes>(DEFAULT_CHARACTER);

  return (
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
  );
}
