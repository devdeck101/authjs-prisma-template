"use client";
import type { EditorState } from "@/types/web-site-builder";
import type { EditorAction } from "@/types/web-site-builder/actions";
import { type Dispatch, createContext, useReducer } from "react";
import { editorActionReducer } from "./actions";

/**
 * Creates a Website builder form context and provider component.
 *
 * @param {EditorState} initialState - The initial state of the Website builder
 *
 * @returns {{
 *   WebsiteBuilderContext: React.Context<{
 *       state: EditorState,
 *       dispatch: Dispatch<EditorAction>
 *   }>,
 *   WebsiteBuilderProvider: React.FC<{ children: React.ReactNode }>
 * }} An object containing the Website builder context and provider component.
 */
export default function buildWebsiteBuilder(initialState: EditorState) {
	const WebsiteBuilderContext = createContext<{
		state: EditorState;
		dispatch: Dispatch<EditorAction>;
	}>({
		state: initialState,
		dispatch: () => undefined,
	});
	const WebsiteBuilderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
		const [state, dispatch] = useReducer(editorActionReducer, initialState);
		return <WebsiteBuilderContext.Provider value={{ state, dispatch }}>{children}</WebsiteBuilderContext.Provider>;
	};

	return {
		WebsiteBuilderContext,
		WebsiteBuilderProvider,
	};
}
