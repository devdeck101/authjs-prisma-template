"use client";

import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";
import { ChangeEvent, PropsWithChildren, useEffect, useRef, useState } from "react";

type Props = {
    initialValue: string;
    className?: string;
    clipAt?: number;
    action: (value: unknown) => void;
} & PropsWithChildren;

const EditableContent = ({ initialValue, clipAt = 25, action, className }: Props) => {
    const [isEditing, setEditing] = useState(false);
    const [value, setValue] = useState(initialValue);
    const KEYS = ["Escape", "Enter", "Tab"];
    const inputRef = useRef<HTMLInputElement>(null);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        const { key } = e;
        const value = (e.currentTarget.children[0] as HTMLInputElement).value;
        if (KEYS.indexOf(key) != -1) {
            setEditing(false)
            action(value);
        }

    }

    const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setValue(value);
    }

    useEffect(() => {
        if (inputRef && inputRef.current && isEditing === true) {
            inputRef.current.focus();
        }

    }, [isEditing, inputRef])



    return (<section className={cn("group min-w-24 max-w-64", className)} >
        <div >
            {
                isEditing && (
                    <div
                        onBlur={() => setEditing(!isEditing)}
                        onKeyDown={(e) => handleKeyDown(e)}>
                        <Input type="text" value={value} ref={inputRef} onChange={changeValue} />
                    </div>)
            }
        </div>
        <div onClick={() => setEditing(!isEditing)}>
            {
                !isEditing && (<span className="flex flex-row bg-muted p-2 gap-2 rounded-md group-hover:bg-muted/70 transition-all">{value.substring(0, clipAt)} <Pencil width={12} height={12} className="fill-primary group-hover:text-primary group-hover:fill-primary-foreground transition-colors" /></span>)
            }
        </div>
    </section>)
};


export { EditableContent };