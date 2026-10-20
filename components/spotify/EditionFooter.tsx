import React from "react";

export const EditionFooter: React.FC = () => {
  return (
    <footer
      className="bottom-note flex flex-col sm:flex-row justify-between items-center gap-3 text-[#777] text-[10px] tracking-[1.7px] max-w-full mt-[29px] mx-[5px] select-none font-semibold uppercase"
      aria-label="Información de pie de página"
    >
      <span>SABBATH STUDIO × SABBATH CAFÉ</span>
      <span>HECHO PARA DISFRUTAR DESPACIO.</span>
    </footer>
  );
};
