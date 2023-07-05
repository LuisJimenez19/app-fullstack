import { useEffect, useState } from "react";
import { getAnimeChan } from "../api/animenChan";
import { translate } from "../api/trasnlateApi";

import loader from "../media/img/three-dots.svg";
import { BsTranslate } from "react-icons/bs";
import { toast } from "react-hot-toast";

import { getCookie, setCookie } from "../helpers/cookies";

import "../css/quote-anime.css";
import { quoteDefault } from "../Constants/appData";
function QuoteAnime() {
  const [quoteAnime, setQuoteAnime] = useState(() => {
    const quote = localStorage.getItem("quote");
    if (quote) return JSON.parse(quote);
    return null;
  });

  const [isLoading, setIsLoading] = useState(true);

  const [loadingTranslate, setLoadingTranslate] = useState(false);

  const [quoteTranslated, setQuoteTranslated] = useState(() => {
    if (localStorage.getItem("quoteTranslated")) {
      const q = localStorage.getItem("quoteTranslated");
      return q;
    } else return "";
  });

  const [showtranslated, setShowtranslated] = useState(() => {
    if (localStorage.getItem("showQuoteTranslated")) {
      const { isShow } = JSON.parse(
        localStorage.getItem("showQuoteTranslated")
      );

      return isShow;
    } else return false;
  });
  const [showtranslatedDefault, setShowtranslatedDefault] = useState(() => {
    if (localStorage.getItem("showtranslatedDefault")) {
      const { isShow } = JSON.parse(
        localStorage.getItem("showtranslatedDefault")
      );

      return isShow;
    } else return false;
  });

  useEffect(() => {
    async function fetchData() {
      const lastRequestTime = getCookie("lastRequestTime");
      const currentTime = new Date().getTime();
      /* Trae un nuevo quote */
      if (!lastRequestTime || currentTime >= parseInt(lastRequestTime)) {
        try {
          const res = await getAnimeChan();
          setIsLoading(false);
          localStorage.setItem("quote", JSON.stringify(res));
          localStorage.removeItem("quoteTranslated");
          setQuoteTranslated("");
          setShowtranslated(false);
          setQuoteAnime(res);
          const nextRequestTime = currentTime + 60000 * 60; //1 hora
          setCookie("lastRequestTime", nextRequestTime.toString());
        } catch (error) {
          if (error.code === "ERR_NETWORK") {
            setIsLoading(false);
          }
          console.log(error);
        }
      } else {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  /*
   * Traduce el texto
   * @param event para traversing y obtener el texto a traducir
   *
   * */

  async function handleTranslate(e) {
    const text = e.target.parentElement.parentElement.lastChild.innerText;

    //Trae el texto traducido
    if (!showtranslated && quoteTranslated == "") {
      setLoadingTranslate(true);
      const newData = await translate(text, "es");
      // falla al traducir
      if (newData == undefined || newData == false) {
        toast.error("Ha ocurrido un error.", {
          position: "top-right",
          duration: 3000,
        });
      } else if (newData != undefined) {
        setQuoteTranslated(newData);
        setShowtranslated(true);

        localStorage.setItem("quoteTranslated", newData);
        localStorage.setItem(
          "showQuoteTranslated",
          JSON.stringify({ isShow: true })
        );
      }
      return setLoadingTranslate(false);
    }

    /* Si solo quiere alternar entre el contenido */
    localStorage.setItem(
      "showQuoteTranslated",
      JSON.stringify({ isShow: !showtranslated })
    );
    return setShowtranslated(!showtranslated);
  }

  /* Muestra el texto por */
  function handleTranslateDefault() {
    // si falla al traer la quote que muestre lo traducido por defect
    if (!quoteAnime) {
      setShowtranslatedDefault(!showtranslatedDefault);
      return localStorage.setItem(
        "showQuoteTranslated",
        JSON.stringify({ isShow: !showtranslatedDefault })
      );
    }
  }

  if (isLoading) {
    return (
      <div className="anime-chan">
        <img className="loader-quote" src={loader} alt="loader" />
      </div>
    );
  }
  return (
    <div
      className={`anime-chan ${loadingTranslate ? "anime-chan--active" : ""}`}
    >
      {quoteAnime ? (
        <div className="quote-container">
          <h2 className="quote-anime">
            <a
              className="link-anime"
              target="_blank"
              rel="noreferrer"
              href={`https://www3.animeflv.net/browse?q=${encodeURIComponent(
                quoteAnime.anime
              )}`}
            >
              {quoteAnime.anime}
            </a>{" "}
            <BsTranslate
              onClick={handleTranslate}
              className={`quote-translate ${
                showtranslated && quoteTranslated != ""
                  ? "quote-trasnlated--active"
                  : ""
              }`}
            />
          </h2>
          <h4 className="quote-character">{quoteAnime.character}</h4>
          {quoteTranslated == "" || !showtranslated ? (
            <p className="quote-quote">{quoteAnime.quote}</p>
          ) : (
            <p className="quote-quote">{quoteTranslated}</p>
          )}
        </div>
      ) : (
        // <p>...</p>
        <div className="quote-container">
          <h2 className="quote-anime">
          <a
              className="link-anime"
              target="_blank"
              rel="noreferrer"
              href={`https://www3.animeflv.net/browse?q=${encodeURIComponent(
                "Dragon ball z"
              )}`}
            >
              Dragon ball z
            </a>
          
            <BsTranslate
              onClick={handleTranslateDefault}
              className={`quote-translate ${
                showtranslatedDefault ? "quote-trasnlated--active" : ""
              }`}
            />
          </h2>
          <h4 className="quote-character">Android 16</h4>

          {!showtranslatedDefault ? (
            <p className="quote-quote">{quoteDefault.default}</p>
          ) : (
            <p className="quote-quote">{quoteDefault.translated}</p>
          )}
        </div>
      )}
    </div>
  );
}

export { QuoteAnime };
