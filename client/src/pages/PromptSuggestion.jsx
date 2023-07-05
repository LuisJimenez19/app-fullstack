import { dataPrompts } from "../Constants/dataPrompts";

function PromptSuggestion() {
  return (
    <section className="profile-prompt">
      <h2 className="prompt-title">Puedes probar estas apps también.</h2>
      <div className="bg-container-prompt">
        <div className="prompt-container">
          {dataPrompts.map((item, index) => {
            const backgroundImageStyle = {
              backgroundImage: `url(${item.urlImg})`,
            };

            return (
              <div id={`prompt-${index}`} key={index} className={`prom-card`}>
                <header className="prompt-header front-card">
                  <p>{item.name}</p>
                </header>
                <div style={backgroundImageStyle} className="prompt-img">
                  <span className="overlay back-card">
                    <a
                      target="_blank"
                      href={item.url}
                      rel="noopener noreferrer"
                    >
                      <span>Visitar</span>
                    </a>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export { PromptSuggestion };
