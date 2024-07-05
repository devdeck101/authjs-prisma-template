import type { EditorState } from "@/types/web-site-builder";
import { ActionType, type EditorAction, type EditorActionReducer } from "@/types/web-site-builder/actions";

const editorActionReducer: EditorActionReducer = (state: EditorState, action: EditorAction): EditorState => {
	switch (action.type) {
		case ActionType.AddElement: {
			// console.log("<==State");
			// console.log(state);
			// console.log("State==>");
			const newElement = action.data.element;
			const newState: EditorState = {
				editor: {
					...state.editor,
					elements: [...state.editor.elements, newElement],
				},
			};
			// console.log("<==New State");
			// console.log(newState);
			// console.log("New State==>");
			return newState;
		}
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
