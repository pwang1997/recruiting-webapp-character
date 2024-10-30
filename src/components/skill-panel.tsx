import { useCallback, useMemo, useState } from "react";
import { Attributes } from "../types";
import { SKILL_LIST } from "../consts";

interface SkillPanelProps {
  character: Attributes;
}

export default function SkillPanel({ character }: SkillPanelProps) {
  const getModifier = useCallback(
    (attribute: string) => {
      return Math.floor((character[`${attribute}`] - 10) / 2);
    },
    [character]
  );

  let points = 10 + getModifier("Intelligence") * 4;

  const [learntSkills, setLearntSkills] = useState<Object>({});
  const skillsUsed = useMemo(
    () => Object.values(learntSkills).reduce((prev, cur) => prev + cur, 0),
    [learntSkills]
  );

  const upSkill = useCallback(
    (skillName) => {
      if (points > skillsUsed) {
        setLearntSkills((prev) => {
          const curState = { ...prev };
          curState[`${skillName}`] = (curState[`${skillName}`] ?? 0) + 1;
          return curState;
        });
        points--;
      } else {
        alert("Not enough skill points!");
      }
    },
    [points, skillsUsed]
  );

  const downSkill = useCallback(
    (skillName) => {
      if (learntSkills[`${skillName}`] && learntSkills[`${skillName}`] > 0) {
        setLearntSkills((prev) => {
          const curState = { ...prev };
          curState[`${skillName}`] = curState[`${skillName}`] - 1;
          return curState;
        });
        points++;
      } else {
        alert("Cannot level down a unlearnt skill!");
      }
    },
    [learntSkills, points]
  );
  const renderSkillList = useCallback(() => {
    return (
      <div>
        {SKILL_LIST.map((skill) => {
          const mod = getModifier(skill.attributeModifier);
          const allocatedPoints = learntSkills[`${skill.name}`] ?? 0;

          return (
            <div key={skill.name}>
              <div style={{ display: "flex", gap: "4px" }}>
                <span>
                  {skill.name}: {allocatedPoints}
                </span>
                <span>
                  Modifier: {skill.attributeModifier}: {mod}
                </span>
                <span>total: {allocatedPoints + mod}</span>
                <button onClick={() => upSkill(skill.name)}>+</button>
                <button onClick={() => downSkill(skill.name)}>-</button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }, [downSkill, getModifier, learntSkills, upSkill]);
  return (
    <div>
      <span>Skill Points Available: {points - skillsUsed}</span>
      {renderSkillList()}
    </div>
  );
}