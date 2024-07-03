"use client";
import type { EditorState } from "@/types/web-site-builder";
import { editorActionReducer } from "./actions";
import { type Dispatch, createContext, useReducer } from "react";
import type { EditorAction } from "@/types/web-site-builder/actions";

export default function buildWebsiteBuilder(initialState: EditorState) {
    const WebsiteBuilderContext = createContext<{
        state: EditorState,
        dispatch: Dispatch<EditorAction>
    }>({
        state: initialState,
        dispatch: () => undefined,
    });
    const WebsiteBuilderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
        const [state, dispatch] = useReducer(editorActionReducer, initialState);
        return (
            <WebsiteBuilderContext.Provider value={{ state, dispatch }}>
                {children}
            </WebsiteBuilderContext.Provider >
        )
    }

    return {
        WebsiteBuilderContext,
        WebsiteBuilderProvider
    }

}

