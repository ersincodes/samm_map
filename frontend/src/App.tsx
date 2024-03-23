import React from "react";
import { LocationsProvider } from "./context/LocationsContext";
import Map from "./components/Map";
import LocationList from "./components/LocationList";
import "./App.css";

const App: React.FC = () => {
  return (
    <LocationsProvider>
      <div className="app-container">
        <header className="app-header">
          <img src="/samm_map.webp" />
          <h1>LOCATION</h1>
        </header>
        <main className="app-main">
          <section className="map-container">
            <Map />
          </section>
          <aside className="list-container">
            <LocationList />
          </aside>
        </main>
      </div>
    </LocationsProvider>
  );
};

export default App;
