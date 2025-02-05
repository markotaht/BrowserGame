
import {useState, useEffect, useCallback} from "react";
const useContextMenu = () => {
    const [clicked, setClicked] = useState(false);
    const [points, setPoints] = useState({
        x: 0,
        y: 0,
    });
    useEffect(() => {
        const handleClick = () => setClicked(false);
        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);

    const onClick = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        setClicked(true);
        setPoints({
            x: e.pageX,
            y: e.pageY,
        });
        console.log("Right Click", e.pageX, e.pageY);
    }, []);

    return {
        onClick,
        clicked,
        points
    };
};
export default useContextMenu;