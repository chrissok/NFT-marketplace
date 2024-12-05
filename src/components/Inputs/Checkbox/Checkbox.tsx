"use client";

import Selected from "@/components/Icons/standard/Checkbox/Selected";
import Empty from "@/components/Icons/standard/Checkbox/Empty";
import { useState } from "react";

function Checkbox({ onChange }: { onChange?: VoidFunction }) {
  const [selected, setSelected] = useState(false);

  const handleChange = (selected: boolean) => {
    setSelected(selected);
    onChange && onChange();
  };

  if (selected)
    return (
      <div onClick={() => handleChange(false)}>
        <Selected />
      </div>
    );
  return (
    <div onClick={() => handleChange(true)}>
      <Empty />
    </div>
  );
}

export default Checkbox;
