/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

function MediaLanguageSelect() {
  const router = useRouter();
  const [lang, setLang] = useState("uz");
  const [langImg, setLangImg] = useState(
    "https://cdn-icons-png.flaticon.com/512/206/206662.png"
  );

  const language_items = [
    {
      id: 0,
      languageImage: "https://cdn-icons-png.flaticon.com/512/206/206626.png",
      title: "English",
      languageCode: "en",
    },
    // {
    //   id: 1,
    //   languageImage: "https://cdn-icons-png.flaticon.com/512/206/206604.png",
    //   title: "Russian",
    //   languageCode: "ru",
    // },
    {
      id: 2,
      languageImage: "https://cdn-icons-png.flaticon.com/512/206/206662.png",
      title: "O'zbek",
      languageCode: "uz",
    },
  ];

  useEffect(() => {
    const locale = lang;
    // console.log("useEffect value", lang);
    router.push(router.pathname, router.asPath, { locale });
  }, [lang]);

  const [status, setStatus] = useState(false);

  return (
    <div className="MediaLangugeSelect__headerLanguage">
      <div
        className="medialanguage__taskAdderSelect"
        onClick={() => setStatus(!status)}
      >
        <img src={langImg} alt={langImg} />
        <p>{lang}</p>
        <div
          className={
            status
              ? "Medialanguage__taskAdderStatus"
              : "medialanguage__taskHide__status"
          }
        >
          {language_items.map((item) => (
            <div
              href="/"
              className="medialanguage__status"
              onMouseEnter={() => setStatus(true)}
              onMouseLeave={() => setStatus(false)}
              onClick={() =>
                setLang(item.languageCode) +
                setLangImg(item.languageImage) +
                setStatus(false)
              }
              key={item.id}
              value={item.id}
            >
              <img src={item.languageImage} alt={item.languageImage} />
              <p>{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MediaLanguageSelect;
