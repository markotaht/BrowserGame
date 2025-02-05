import {ReactNode} from "react";
import {IMapTileContent} from "../../context/SocketContext.tsx";

export interface ITileItem {
    icon: ReactNode;
    item: IMapTileContent;
}