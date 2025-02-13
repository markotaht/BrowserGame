import {ComponentType} from "react";
import {IBaseNode} from "../../data/IBaseNode.ts";

export interface ITileItem {
    icon: ComponentType<any>;
    item: IBaseNode;
}