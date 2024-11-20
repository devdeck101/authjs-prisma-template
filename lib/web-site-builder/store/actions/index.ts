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
			const { element: newElement, containerId } = action.payload;
			if (!containerId) {
				const newState: EditorState = {
					editor: {
						...state.editor,
						elements: [...state.editor.elements, newElement],
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
			//TODO: find element on multi dimensional array
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
				element.content = [] as Element[]; // Initialize content array if it doesn't exist
			}
			element.content = [...element.content, newElement]; // Add new element to content array
			return true; // Element found and new element added
		}

		// Recursively search in child elements
		if (Array.isArray(element.content) && addElementById(element.content, id, newElement)) {
			return true; // Element found and new element added in child elements
		}
	}
	return false; // Element with given id not found
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
		return value.bind({}) as unknown as T; // Return a bound copy of the function
	}

	return value;
}

export { editorActionReducer };
