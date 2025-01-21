import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import GameContextProvider from "./context/GameContext.tsx";
import {PlayerContextProvider} from "./context/PlayerContext.tsx";
import MapContextProvider from "./context/MapContext.tsx";

createRoot(document.getElementById('root')!).render(
    <GameContextProvider>
        <MapContextProvider>
            <PlayerContextProvider>
                <App/>
            </PlayerContextProvider>
        </MapContextProvider>
    </GameContextProvider>
    ,
)
