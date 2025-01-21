import {useContext} from "react";
import {MapContext} from "../context/MapContext.tsx";

const useMap = () => {
    return useContext(MapContext);
}

export default useMap;