import type { EditorState, Element } from "@/types/web-site-builder";
import { ActionType, type EditorAction, type EditorActionReducer } from "@/types/web-site-builder/actions";

/**
 * Creates the reducer function for the Website builder.
 *
 * @param {EditorState} state - The initial state of the Website builder
 * @param {EditorAction} action - The action and the payload
 *
 * @returns {EditorState} An object state containing.
 */
const editorActionReducer: EditorActionReducer = (state: EditorState, action: EditorAction): EditorState => {
	switch (action.type) {
		case ActionType.AddElement: {
			const { element: newElement, containerId, targetIndex } = action.payload;
			if (!containerId) {
				const currentElements = [...state.editor.elements];
				if (typeof targetIndex === "number" && targetIndex >= 0 && targetIndex <= currentElements.length) {
					currentElements.splice(targetIndex, 0, newElement);
				} else {
					currentElements.push(newElement);
				}
				const newState: EditorState = {
					editor: {
						...state.editor,
						elements: currentElements,
						selectedElement: newElement,
					},
				};
				return newState;
			}
			const copyElements = cloneDeep(state.editor.elements);
			addElementById(copyElements, containerId, newElement);
			const newState: EditorState = {
				editor: {
					...state.editor,
					elements: copyElements,
					selectedElement: newElement,
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

			const isSelectedDeleted = state.editor.selectedElement?.id === elementId;

			const newState: EditorState = {
				editor: {
					...state.editor,
					elements: [...updateElements],
					selectedElement: isSelectedDeleted ? undefined : state.editor.selectedElement,
				},
			};
			return newState;
		}
		case ActionType.UpdateElement: {
			const updatedElement = action.payload.element;
			const newElements = [...state.editor.elements];
			const index = newElements.findIndex((el) => el.id === updatedElement.id);
			if (index !== -1) {
				newElements[index] = updatedElement;
			}
			const newState: EditorState = {
				editor: {
					...state.editor,
					elements: [...newElements],
					selectedElement: updatedElement,
				},
			};
			return newState;
		}
		case ActionType.MoveElement: {
			const { elementId, direction } = action.payload;
			const currentElements = [...state.editor.elements];
			const index = currentElements.findIndex((el) => el.id === elementId);
			if (index === -1) return state;

			const newIndex = direction === "up" ? index - 1 : index + 1;
			if (newIndex < 0 || newIndex >= currentElements.length) return state;

			const [movedElement] = currentElements.splice(index, 1);
			currentElements.splice(newIndex, 0, movedElement);

			const newState: EditorState = {
				editor: {
					...state.editor,
					elements: currentElements,
				},
			};
			return newState;
		}
		case ActionType.ReorderElements: {
			const { sourceIndex, destinationIndex } = action.payload;
			const currentElements = [...state.editor.elements];
			if (
				sourceIndex < 0 ||
				sourceIndex >= currentElements.length ||
				destinationIndex < 0 ||
				destinationIndex >= currentElements.length ||
				sourceIndex === destinationIndex
			) {
				return state;
			}

			const [movedElement] = currentElements.splice(sourceIndex, 1);
			currentElements.splice(destinationIndex, 0, movedElement);

			const newState: EditorState = {
				editor: {
					...state.editor,
					elements: currentElements,
				},
			};
			return newState;
		}
		case ActionType.ChangeDeviceMode: {
			const { deviceMode } = action.payload;
			return {
				editor: {
					...state.editor,
					deviceMode,
				},
			};
		}
		case ActionType.ChangePreviewMode: {
			const { previewMode } = action.payload;
			return {
				editor: {
					...state.editor,
					previewMode,
				},
			};
		}

		default:
			return state;
	}
};

/**
 * Adds a new element to the content of an element found by its id in the provided array of elements.
 * If the element with the given id is found, the new element is added to its content array.
 *
 * @param {Element[]} elements - The array of elements to search within.
 * @param {string} id - The id of the element to which the new element should be added.
 * @param {Element} newElement - The new element to add to the found element's content array.
 * @returns {boolean} Returns true if the element with the given id was found and new element added, otherwise false.
 */
const addElementById = (elements: Element[], id: string, newElement: Element): boolean => {
	for (const element of elements) {
		if (element.id === id) {
			if (!element.content) {
				element.content = [] as Element[];
			}
			element.content = [...element.content, newElement];
			return true;
		}

		if (Array.isArray(element.content) && addElementById(element.content, id, newElement)) {
			return true;
		}
	}
	return false;
};

function cloneDeep<T>(value: T): T {
	if (Array.isArray(value)) {
		return value.map((item) => cloneDeep(item)) as unknown as T;
	}
	if (value !== null && typeof value === "object") {
		const copy = {};
		for (const key in value) {
			if (Object.hasOwn(value, key)) {
				(copy as T)[key as keyof T] = cloneDeep((value as T)[key as keyof T]);
			}
		}
		return copy as unknown as T;
	}
	if (typeof value === "function") {
		return value.bind({}) as unknown as T;
	}

	return value;
}

export { editorActionReducer };
