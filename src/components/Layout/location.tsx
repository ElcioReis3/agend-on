"use client";
import { ButtonLink } from "../ButtonLink";

export const Location = () => {
  return (
    <div className="w-full max-w-xl m-auto my-7 flex flex-col items-center gap-3 p-3 text-base md:text-xl">
      <div className="font-bold text-colorMark">LOCALIZAÇÃO</div>
      <div className="w-full h-80 rounded-lg overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d586.4529920035657!2d-43.35904267008772!3d-4.865292892913997!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x78e92368fcb0553%3A0xe21e8f9dcdce2bbf!2sCaxias%2C%20MA!5e1!3m2!1spt-BR!2sbr!4v1742510835620!5m2!1spt-BR!2sbr"
          width="600"
          height="450"
          loading="lazy"
        ></iframe>
      </div>
      <ButtonLink routerIn="/plan">CONHEÇA NOSSOS SERVIÇOS</ButtonLink>
    </div>
  );
};
