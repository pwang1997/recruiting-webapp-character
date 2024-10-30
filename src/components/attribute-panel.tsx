import { useCallback } from "react";
import { Attributes } from "../types";
import { ATTRIBUTE_LIST } from "../consts";

interface AttributePanelProps {
  character: Attributes;
  setCharacter: React.Dispatch<React.SetStateAction<Attributes>>;
}
export default function AttributePanel({
  character,
  setCharacter,
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

          return (
            <div key={attribute}>
              <span>
                {attribute}: {attributeValue}
              </span>
              <button onClick={() => increAttribute(attribute)}>+</button>
              <button onClick={() => decrAttribute(attribute)}>-</button>
            </div>
          );
        })}
      </div>
    );
  }, [character, decrAttribute, increAttribute]);
  return <div>{renderAttributes()}</div>;
}
