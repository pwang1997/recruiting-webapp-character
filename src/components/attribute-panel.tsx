import { useCallback } from "react";
import { Attributes } from "../types";
import { ATTRIBUTE_LIST } from "../consts";

interface AttributePanelProps {
  character: Attributes;
  setCharacter?: React.Dispatch<React.SetStateAction<Attributes>>;
  readOnly?: boolean;
}
export default function AttributePanel({
  character,
  setCharacter,
  readOnly = false,
}: AttributePanelProps) {
  const increAttribute = useCallback(
    (attribute: string) => {
      setCharacter((prev) => {
        const curState = { ...prev };
        curState[`${attribute}`] += 1;
        return curState;
      });
    },
    [setCharacter]
  );

  const decrAttribute = useCallback(
    (attribute: string) => {
      setCharacter((prev) => {
        const curState = { ...prev };
        curState[`${attribute}`] -= 1;
        if (curState[`${attribute}`] < 0) {
          alert(`Value: ${attribute} cannot be negative!`);
          return prev;
        }
        return curState;
      });
    },
    [setCharacter]
  );

  const renderAttributes = useCallback(() => {
    return (
      <div>
        {ATTRIBUTE_LIST.map((attribute) => {
          const attributeValue = character[`${attribute}`];
          const mod = Math.floor((attributeValue - 10) / 2);
          return (
            <div key={attribute} style={{ display: "flex", gap: "4px" }}>
              <span>
                {attribute}: {attributeValue}
              </span>
              <span>Modifier: {mod}</span>
              {!readOnly && (
                <>
                  <button onClick={() => increAttribute(attribute)}>+</button>
                  <button onClick={() => decrAttribute(attribute)}>-</button>
                </>
              )}
            </div>
          );
        })}
      </div>
    );
  }, [character, decrAttribute, increAttribute, readOnly]);
  return <div>{renderAttributes()}</div>;
}
