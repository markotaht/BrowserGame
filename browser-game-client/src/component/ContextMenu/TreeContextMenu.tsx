import useGameLogic from "../../hooks/useGameLogic.ts";

interface TreeContextMenuProps {
    item: IMapTileContent;
}
const TreeContextMenu = ({item}: TreeContextMenuProps) => {
    const {pickUpItem} = useGameLogic();
    return (<ul>
        <li onClick={() => pickUpItem(item)}>Chop</li>
    </ul>);
}

export default TreeContextMenu;