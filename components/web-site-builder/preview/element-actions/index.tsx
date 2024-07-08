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
        <div className={cn("relative w-full group")}>
            <div className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button variant={"outline"} size={"icon"} onClick={() => handleDeleteElement(elementId)}>
                    <Trash className="m-0 p-0 w-4 h-4" />
                </Button>
            </div>
            {children}
        </div>
    )
}

export default ElementActions