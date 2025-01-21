import {createContext, useEffect, useState} from "react";

interface PlayerLocation {
    x: number;
    y: number;
}

export const PlayerContext = createContext<PlayerLocation>({x: 0, y: 0});

export const PlayerContextProvider = (props: any) => {
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    useEffect(() => {
        const handleKeyUp = (event: KeyboardEvent) => {
            console.log(event);
            if(event.key === 'ArrowLeft'){
                setX(x => x - 1);
            } else if(event.key === 'ArrowRight'){
                setX(x => x + 1);
            } else if(event.key === 'ArrowUp'){
                setY(y => y - 1);
            } else if(event.key === 'ArrowDown'){
                setY(y => y + 1);
            }
        }

        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keyup', handleKeyUp);
        }
    }, []);

    console.log(x,y);
    const value = {x, y}
    console.log(value);
    return <PlayerContext.Provider value={value}>{props.children}</PlayerContext.Provider>
}