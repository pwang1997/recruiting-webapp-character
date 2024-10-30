import { useState } from "react";
import { Attributes } from "../types";
import { DEFAULT_CHARACTER } from "../characterConsts";
import AttributePanel from "./attribute-panel";

export default function MainFrame() {
  const [character, setCharacter] = useState<Attributes>(DEFAULT_CHARACTER);

  return (
    <div>
      <div>
        <AttributePanel character={character} setCharacter={setCharacter} />
      </div>
    </div>
  );
}
