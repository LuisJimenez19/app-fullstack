import { useEffect, useState } from "react";
import { getAnimeChan } from "../api/animenChan";
import { translate } from "../api/trasnlateApi";

import loader from "../media/img/three-dots.svg";
import { BsTranslate } from "react-icons/bs";
import { toast } from "react-hot-toast";

import { getCookie, setCookie } from "../helpers/cookies";

import "../css/quote-anime.css";
function QuoteAnime() {
  const [quoteAnime, setQuoteAnime] = useState(() => {
    const quote = localStorage.getItem("quote");
    if (quote) return JSON.parse(quote);
    return null;
  });
  const quoteDefault = {
    translated: `No es pecado pelear por la justicia, al contrario, eso es una buena 
    obra. Recuerda que existen oponentes que jamás entenderán con las 
    palabras... Gohan, protege a los seres vivos y a las plantas de este mundo que tanto amé...`,
    default: `It is not a sin to fight for justice. On the contrary, that is a
    good deed. Remember that there are opponents who will never
    understand with words. Gohan, protect living beings and plants in
    this world that I loved so much. I request you....`,
  };

  const [isLoading, setIsLoading] = useState(true);
  const [errorRequest, setErrorRequest] = useState(null);
  const [quoteOriginal, setQuoteOriginal] = useState("");

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
            setErrorRequest(true);
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
   *@param event para traversing y obtener el texto a traducir
   *
   * */
  async function handleTranslate(e) {
    const text = e.target.parentElement.parentElement.lastChild.innerText;
    setQuoteOriginal(text);
    // si falla al traer la quote que muestre lo traducido por defect
    if (!quoteAnime) {
      showtranslated(true);
    }

    //Para no hacer la petición si ya existe
    if (!showtranslated && quoteTranslated == "") {
      setLoadingTranslate(true);
      const newData = await translate(text, "es");

      if (newData == undefined) {
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
      setLoadingTranslate(false);
      // si no lo esta mostrando, pero existe, entonces solo lo muestra
    } else if (!showtranslated && quoteTranslated) {
      setShowtranslated(true);
      localStorage.setItem(
        "showQuoteTranslated",
        JSON.stringify({ isShow: true })
      );
      //Si ya lo esta mostrando entonces lo oculta
    } else if (showtranslated) {
      setShowtranslated(false);
      localStorage.setItem(
        "showQuoteTranslated",
        JSON.stringify({ isShow: false })
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
            Dragon ball Z
            <BsTranslate
              onClick={handleTranslate}
              className="quote-translate"
            />
          </h2>
          <h4 className="quote-character">Android 16</h4>

          {quoteTranslated == "" || !showtranslated ? (
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
