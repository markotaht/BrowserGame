export interface IBaseNode {
    id: string;
    image: string;
    description: string;
    name: string;
    [key: string]: any;
}

export interface ILocationNode extends IBaseNode {
    location: string;
}

export interface IResourceNode extends IBaseNode {
    resourceType: string;
    drops: string[];
}

export interface IItemNode extends IBaseNode {
    itemType: string;
    stackable: boolean;
}

export interface IEquipmentNode extends IItemNode {
    equipmentType: string;
}

export interface IConsumableNode extends IItemNode {
    consumableType: string;
}

export interface IMaterialNode extends IItemNode {
    materialType: string;
}

export function isLocationNode(node: IBaseNode): node is ILocationNode {
    return (node as ILocationNode).location !== undefined;
}

export function isResourceNode(node: IBaseNode): node is IResourceNode {
    return (node as IResourceNode).resourceType !== undefined;
}

export function isItemNode(node: IBaseNode): node is IItemNode {
    return (node as IItemNode).itemType !== undefined;
}

export function isEquipmentNode(node: IBaseNode): node is IEquipmentNode {
    return (node as IEquipmentNode).equipmentType !== undefined;
}

export function isConsumableNode(node: IBaseNode): node is IConsumableNode {
    return (node as IConsumableNode).consumableType !== undefined;
}

export function isMaterialNode(node: IBaseNode): node is IMaterialNode {
    return (node as IMaterialNode).materialType !== undefined;
}