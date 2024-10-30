import { useCallback } from "react";
import { ATTRIBUTE_LIST, CLASS_LIST } from "../consts";
import { Attributes } from "../types";

interface ClassPanelProps {
  character: Attributes;
}

export default function ClassPanel({ character }: ClassPanelProps) {
  const renderClasses = useCallback(() => {
    return (
      <div>
        {Object.keys(CLASS_LIST).map((clazz) => {
          const clazzItem = CLASS_LIST[`${clazz}`];
          const attributesMet =
            ATTRIBUTE_LIST.filter(
              (attr) => character[`${attr}`] < clazzItem[`${attr}`]
            ).length === 0;
          return (
            <div key={clazz}>
              <span className={attributesMet ? "success" : ""}>{clazz}</span>
            </div>
          );
        })}
      </div>
    );
  }, [character]);
  return <div>{renderClasses()}</div>;
}
