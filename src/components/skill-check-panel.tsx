import { useCallback, useState } from "react";
import { SKILL_LIST } from "../consts";
import { Attributes } from "../types";

interface SkillCheckPanelProps {
  character: Attributes;
  learntSkills: Object;
}
export default function SkillCheckPanel({
  character,
  learntSkills,
}: SkillCheckPanelProps) {
  const [selectedSkill, setSelectedSkill] = useState("Acrobatics");
  const [dc, setDc] = useState(0);
  const getRandomNum = () => Math.floor(Math.random() * 20) + 1;

  const getModifier = useCallback(
    (attribute: string) => {
      return Math.floor((character[`${attribute}`] - 10) / 2);
    },
    [character]
  );

  const getSkillCheck = useCallback(() => {
    const rand = getRandomNum();
    console.log({
      selectedSkill,
      dc,
    });

    const sk = SKILL_LIST.find((skill) => skill.name === selectedSkill);

    const mod = getModifier(sk.attributeModifier);
    const allocatedPoints = learntSkills[`${selectedSkill}`] ?? 0;
    const luck = mod + allocatedPoints + rand;
    alert(`random: ${rand}, skill check: ${luck > dc ? "succeed" : "failed"}`);
  }, [dc, getModifier, learntSkills, selectedSkill]);

  return (
    <div
      style={{
        display: "flex",
        gap: "8px",
        flexDirection: "column",
        maxWidth: "400px",
      }}
    >
      <span>Skill Check</span>
      <label>Pick A Skill</label>
      <select
        value={selectedSkill}
        onChange={(e) => setSelectedSkill(e.target.value)}
      >
        {SKILL_LIST.map((skill) => {
          return (
            <option key={skill.name} value={skill.name}>
              {skill.name}
            </option>
          );
        })}
      </select>

      <label>DC</label>
      <input type="number" onChange={(e) => setDc(Number(e.target.value))} />

      <button onClick={() => getSkillCheck()}>Roll</button>
    </div>
  );
}
