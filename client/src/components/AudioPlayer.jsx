import { useEffect, useState } from "react";
import audioFile from "../media/aud/Overlord.mp3";
import "../css/audio-player.css";
const AudioPlayer = () => {
  /* Animación */
  const [isPlaying, setIsPlaying] = useState(
    JSON.parse(localStorage.getItem("isPlaying")) || false
  );

  const toggleAudio = () => {
    if (isPlaying) {
      setIsPlaying(false);
      localStorage.setItem("isPlaying", JSON.stringify(false));
      document.getElementById("audio--active").pause();
    } else if (isPlaying == false) {
      setIsPlaying(true);
      localStorage.setItem("isPlaying", JSON.stringify(true));
      document.getElementById("audio--active").play();
    }
  };

  /* función que crea el audio si no se a agregado */
  function createAudio() {
    if (!document.getElementById("audio--active")) {
      //Crea los elemenots
      const $audio = document.createElement("audio");
      const $source = document.createElement("source");
      //  Atributos
      $source.src = audioFile;
      $audio.setAttribute("loop", "true");
      $audio.setAttribute("id", "audio--active");
      // Añade al DOM
      $audio.appendChild($source);
      document.body.appendChild($audio);
    }
  }

  useEffect(() => {
    createAudio();
  }, []);

  /* Detecta cuando se recargue toda la página */
  useEffect(() => {
    const handleBeforeUnload = () => {
      setIsPlaying(false);
      localStorage.setItem("isPlaying", JSON.stringify(false));
    };

    window.onbeforeunload = handleBeforeUnload;

    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  return (
    <div
      onClick={toggleAudio}
      className={`audio-player ${isPlaying ? "play" : "pause"}`}
    ></div>
  );
};

export { AudioPlayer };
