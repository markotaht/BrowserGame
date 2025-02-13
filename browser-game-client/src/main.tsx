import {scan} from "react-scan";
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import GameStateProvider from "./context/GameStateProvider.tsx";
import SocketContextProvider from "./context/SocketContext.tsx";
import GameLogicProvider from "./context/GameLogicProvider.tsx";

if (typeof window !== 'undefined') {
    scan({
        enabled: true,
        log: true, // logs render info to console (default: false)
    });
}

createRoot(document.getElementById('root')!).render(
    <SocketContextProvider>
        <GameStateProvider>
            <GameLogicProvider>
                <App/>
            </GameLogicProvider>
        </GameStateProvider>
    </SocketContextProvider>
    ,
)
