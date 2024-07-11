import type { PropsWithChildren } from 'react'
import { Button } from "@/components/ui/button";
import { ActionType, type DeleteElement, type UpdateElement } from "@/types/web-site-builder/actions";
import { useWebsiteBuilder } from "@/hooks/web-site-builder";
import { cn } from '@/lib/utils';
import { Trash } from 'lucide-react';

interface Props extends PropsWithChildren {
    elementId: string;
}
const ElementActions = ({ children, elementId }: Props) => {

    const {
        dispatch,
    } = useWebsiteBuilder();

    const handleDeleteElement = (elementId: string) => {
        const myDeleteAction: DeleteElement = {
            type: ActionType.DeleteElement,
            payload: {
                elementId,
            },
        };
        dispatch(myDeleteAction);
    };
    return (
        <div className={cn(" w-full")}>
            <div className={cn("relative w-full group")}>
                <div className="absolute right-0 top-0 -translate-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button variant={"action"} size={"action"} onClick={() => handleDeleteElement(elementId)}>
                        <Trash className="w-4 h-4" />
                    </Button>
                </div>
                {children}
            </div>
        </div>
    )
}

export default ElementActions