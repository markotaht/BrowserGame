import useGameLogic from "../../hooks/useGameLogic.ts";
import {items} from "../../data/Items.ts";
import {IBaseNode} from "../../data/IBaseNode.ts";

interface TreeContextMenuProps {
    item: IBaseNode;
}
const TreeContextMenu = ({item}: TreeContextMenuProps) => {
    const {pickUpItem} = useGameLogic();
    const onClick = () => {
        const index = items.findIndex((value) => value.id === item.drops[0]);
        pickUpItem(items[index]);
    }
    return (<ul>
        <li onClick={onClick}>Chop</li>
    </ul>);
}

export default TreeContextMenu;