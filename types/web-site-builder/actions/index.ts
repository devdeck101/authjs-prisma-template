import type { EditorState, Element } from "@/types/web-site-builder/index";
enum ActionType {
	AddElement = "AddElement",
	UpdateElement = "UpdateElement",
	DeleteElement = "DeleteElement",
	SelectElement = "SelectElement",
}

interface AddElement {
	type: ActionType.AddElement;
	data: {
		containerId?: string;
		element: Element;
	};
}

interface UpdateElement {
	type: ActionType.UpdateElement;
	data: {
		element: Element;
	};
}

interface DeleteElement {
	type: ActionType.DeleteElement;
	data: {
		elementId: string;
	};
}

interface SelectElement {
	type: ActionType.SelectElement;
	data: {
		element: Element;
	};
}

type EditorAction = AddElement | UpdateElement | DeleteElement | SelectElement;

type EditorActionReducer = (state: EditorState, action: EditorAction) => EditorState;

export { ActionType, type AddElement, type EditorAction, type EditorActionReducer };
