import type { DeviceMode, EditorState, Element, PreviewMode } from "@/types/web-site-builder/index";

enum ActionType {
	AddElement = "AddElement",
	UpdateElement = "UpdateElement",
	DeleteElement = "DeleteElement",
	SelectElement = "SelectElement",
	UnselectElement = "UnselectElement",
	MoveElement = "MoveElement",
	ReorderElements = "ReorderElements",
	ChangeDeviceMode = "ChangeDeviceMode",
	ChangePreviewMode = "ChangePreviewMode",
}

interface AddElement {
	type: ActionType.AddElement;
	payload: {
		containerId?: string;
		element: Element;
		targetIndex?: number;
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

interface MoveElement {
	type: ActionType.MoveElement;
	payload: {
		elementId: string;
		direction: "up" | "down";
	};
}

interface ReorderElements {
	type: ActionType.ReorderElements;
	payload: {
		sourceIndex: number;
		destinationIndex: number;
	};
}

interface ChangeDeviceMode {
	type: ActionType.ChangeDeviceMode;
	payload: {
		deviceMode: DeviceMode;
	};
}

interface ChangePreviewMode {
	type: ActionType.ChangePreviewMode;
	payload: {
		previewMode: PreviewMode;
	};
}

type EditorAction =
	| AddElement
	| UpdateElement
	| DeleteElement
	| SelectElement
	| UnselectElement
	| MoveElement
	| ReorderElements
	| ChangeDeviceMode
	| ChangePreviewMode;

type EditorActionReducer = (state: EditorState, action: EditorAction) => EditorState;

export {
	ActionType,
	type AddElement,
	type ChangeDeviceMode,
	type ChangePreviewMode,
	type DeleteElement,
	type EditorAction,
	type EditorActionReducer,
	type MoveElement,
	type ReorderElements,
	type SelectElement,
	type UnselectElement,
	type UpdateElement,
};
