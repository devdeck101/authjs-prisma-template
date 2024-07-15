import type { EditorState, Element } from "@/types/web-site-builder/index";
enum ActionType {
	AddElement = "AddElement",
	UpdateElement = "UpdateElement",
	DeleteElement = "DeleteElement",
	SelectElement = "SelectElement",
	UnselectElement = "UnselectElement",
}

interface AddElement {
	type: ActionType.AddElement;
	payload: {
		containerId?: string;
		element: Element;
	};
}

interface UpdateElement {
	type: ActionType.UpdateElement;
	payload: {
		element: Element;
	};
}

interface DeleteElement {
	type: ActionType.DeleteElement;
	payload: {
		elementId: string;
	};
}

interface SelectElement {
	type: ActionType.SelectElement;
	payload: {
		element: Element;
	};
}

interface UnselectElement {
	type: ActionType.UnselectElement;
}
type EditorAction = AddElement | UpdateElement | DeleteElement | SelectElement | UnselectElement;

type EditorActionReducer = (state: EditorState, action: EditorAction) => EditorState;

export {
	ActionType,
	type AddElement,
	type DeleteElement,
	type EditorAction,
	type EditorActionReducer,
	type SelectElement,
	type UnselectElement,
	type UpdateElement,
};
