import type { EditorState } from "@/types/web-site-builder";
import { ActionType, type EditorAction, type EditorActionReducer } from "@/types/web-site-builder/actions";

const editorActionReducer: EditorActionReducer = (state: EditorState, action: EditorAction): EditorState => {
	switch (action.type) {
		case ActionType.AddElement:
			console.log(action);
			return state;
		case ActionType.SelectElement:
			console.log(action);
			return state;
		case ActionType.DeleteElement:
			console.log(action);
			return state;
		case ActionType.UpdateElement:
			console.log(action);
			return state;
		default:
			return state;
	}
};

export { editorActionReducer };
