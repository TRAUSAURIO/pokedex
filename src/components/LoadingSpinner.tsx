export function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <div className="pokeball-loader">
        <div className="pokeball-top"></div>
        <div className="pokeball-middle">
          <div className="pokeball-button-frame">
            <div className="pokeball-button"></div>
          </div>
        </div>
        <div className="pokeball-bottom"></div>
      </div>
      <p className="loading-text">Cargando Pokémon...</p>
    </div>
  );
}
