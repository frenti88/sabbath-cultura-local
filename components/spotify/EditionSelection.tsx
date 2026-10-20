import React from "react";

export const EditionSelection: React.FC = () => {
  return (
    <div className="selection flex flex-col sm:flex-row justify-between sm:items-end mt-10 mb-5 px-1 gap-2">
      <div>
        <div className="overline text-[10px] text-[#F3334D] tracking-[2.3px] font-[850] uppercase">
          SELECCIÓN DE LA EDICIÓN 001
        </div>
        <h2 className="section-title text-[28px] sm:text-[33px] font-[830] tracking-[-1.6px] mt-2 text-[#F1F1F1] leading-tight">
          Hecho aquí. Para disfrutar ahora.
        </h2>
      </div>
      <span className="rightcopy hidden md:inline-block text-[#959595] text-[13px] pb-2 font-medium tracking-tight">
        Tres maneras de conectar con lo nuestro &nbsp; ↗
      </span>
    </div>
  );
};
