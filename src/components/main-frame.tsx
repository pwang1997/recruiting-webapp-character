import { useCallback, useState } from "react";
import CreateCharacterPanel from "./create-character-panel";
import { Attributes } from "../types";
import { getUrl } from "../apis";

export default function MainFrame() {
  const [panels, setPanels] = useState<JSX.Element[]>([
    <CreateCharacterPanel />,
  ]);

  const addPanel = useCallback((characterTemplate?: Attributes) => {
    setPanels((prev) => {
      return [
        ...prev,
        <CreateCharacterPanel characterTemplate={characterTemplate} />,
      ];
    });
  }, []);

  const getCharacter = useCallback(() => {
    fetch(getUrl)
      .then(async (res) => {
        const data = await res.json();

        const body = data.body;
        addPanel(body);
        alert("Character Retrieved!");
      })
      .catch((err) => {
        console.error(err);
      });
  }, [addPanel]);

  return (
    <div>
      <button onClick={() => addPanel()}>Create Character</button>
      <button onClick={() => getCharacter()}>Get Last Saved Character</button>
      <div>
        {panels.map((panel, key) => {
          return <div key={key}>{panel}</div>;
        })}
      </div>
    </div>
  );
}
