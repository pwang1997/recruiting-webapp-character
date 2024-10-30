import { useCallback, useState } from "react";
import { ATTRIBUTE_LIST, CLASS_LIST } from "../consts";
import { Attributes, Class } from "../types";
import AttributePanel from "./attribute-panel";

interface ClassPanelProps {
  character: Attributes;
}

export default function ClassPanel({ character }: ClassPanelProps) {
  const [selectedClazz, setSelectedClazz] = useState<Class[]>([]);

  const toggleSelectedClazz = useCallback(
    (clazz: Class) => {
      if (selectedClazz.includes(clazz)) {
        setSelectedClazz((prev) => {
          return prev.filter((item) => item !== clazz);
        });
      } else {
        setSelectedClazz((prev) => {
          return [...prev, clazz];
        });
      }
    },
    [selectedClazz]
  );
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
            <div
              key={clazz}
              onClick={() => toggleSelectedClazz(clazz as Class)}
              style={{ borderStyle: "dashed", padding: "8px" }}
            >
              <span className={attributesMet ? "success" : ""}>{clazz}</span>
              <div
                className={
                  selectedClazz.includes(clazz as Class) ? "show" : "hidden"
                }
              >
                <AttributePanel character={clazzItem} readOnly />
              </div>
            </div>
          );
        })}
      </div>
    );
  }, [character, selectedClazz, toggleSelectedClazz]);
  return <div>{renderClasses()}</div>;
}
