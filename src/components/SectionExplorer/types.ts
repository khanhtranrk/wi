export enum ESectionExplorerAction {
  None = 0,
  Add = 1,
  Edit = 2,
  Delete = 3,
  View = 4,
}

export interface ISectionExplorerNode<T=any> {
  key?: number | string | null;
  title: string;
  color?: string | null;
  parentNodeKey: number | string | null;

  // for data
  reference?: T | null;

  // for display
  isExpanded?: boolean;
  isMenuOpen?: boolean;
  isActionPopupOpen?: ESectionExplorerAction;
}

export interface ISectionExplorerTree<T=any> extends ISectionExplorerNode<T> {
}
