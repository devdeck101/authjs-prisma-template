import type { EditorState } from "@/types/web-site-builder";
import { ActionType, type EditorAction, type EditorActionReducer } from "@/types/web-site-builder/actions";

/**
 * Creates the reducer funcdtion for the Website builder.
 *
 * @param {EditorState} state - The initial state of the Website builder
 * @param {EditorAction} action - The action and the payload
 *
 * @returns {EditorState} An object state containing.
 */
const editorActionReducer: EditorActionReducer = (state: EditorState, action: EditorAction): EditorState => {
	switch (action.type) {
		case ActionType.AddElement: {
			const newElement = action.payload.element;
			const newState: EditorState = {
				editor: {
					...state.editor,
					elements: [...state.editor.elements, newElement],
				},
			};
			return newState;
		}
		case ActionType.SelectElement: {
			const selectedElement = action.payload.element;
			const newState: EditorState = {
				editor: {
					...state.editor,
					selectedElement,
				},
			};
			return newState;
		}
		case ActionType.UnselectElement: {
			const newState: EditorState = {
				editor: {
					...state.editor,
					selectedElement: undefined,
				},
			};
			return newState;
		}
		case ActionType.DeleteElement: {
			const { elementId } = action.payload;
			const currentElements = [...state.editor.elements];
			const updateElements = currentElements.filter((el) => el.id !== elementId);

			const newState: EditorState = {
				editor: {
					...state.editor,
					elements: [...updateElements],
				},
			};
			return newState;
		}
		case ActionType.UpdateElement: {
			const updatedElement = action.payload.element;
			const newElements = [...state.editor.elements];
			const index = newElements.findIndex((el) => el.id === updatedElement.id);
			newElements[index] = updatedElement;
			const newState: EditorState = {
				editor: {
					...state.editor,
					elements: [...newElements],
				},
			};
			return newState;
		}

		default:
			return state;
	}
};

export { editorActionReducer };
