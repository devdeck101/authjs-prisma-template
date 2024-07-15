import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ElementActions from "@/components/web-site-builder/preview/element-actions";
import { useWebsiteBuilder } from "@/hooks/web-site-builder";
import { cn } from "@/lib/utils";
import { type ElementButton, ElementType, type Element, type ElementProps } from "@/types/web-site-builder";
import { ActionType, type UpdateElement } from "@/types/web-site-builder/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Circle, Megaphone } from "lucide-react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

import { ColorPicker } from "@/components/ui/extension/multi-step-form/color-picker";


const type: ElementType = ElementType.SimpleBannerElement;
const customAttributes = {
    title: "Título",
    message: "Mensagem de Aviso"
}

const elementButton: ElementButton = {
    icon: Megaphone,
    label: "Aviso",
    tooltip: "Mensagem de Aviso",
}

const SimpleBannerElement: Element = {
    constructor: function () {
        this.id = uuidv4();
        return { ...this };
    },
    id: uuidv4(),
    type,
    customAttributes,
    elementButton,
    previewComponent: PreviewComponent,
    editComponent: EditComponent,
    liveComponent: LiveComponent,
};

export { elementButton, SimpleBannerElement };

function PreviewComponent({ instance, className, ...rest }: ElementProps) {
    const { customAttributes: { title, message }, styles } = instance;
    return (
        <ElementActions element={instance}>
            <div {...rest} className={cn("px-4 py-3",
            )}
                style={styles}
                role="alert">
                <p className="font-bold">{title}</p>
                <p className="text-sm">{message}</p>
            </div>
        </ElementActions>
    );
}

function LiveComponent({ instance, className, ...rest }: ElementProps) {
    const { customAttributes: { title, message }, styles } = instance;
    console.log(instance)

    return (
        <div className={cn("px-4 py-3")} style={styles} role="alert">
            <p className="font-bold">{title}</p>
            <p className="text-sm">{message}</p>
        </ div>
    );
}


const SimpleBannerSchema = z.object({
    title: z.string().min(2),
    message: z.string().min(10),
    color: z.string(),
});

type FormValues = z.infer<typeof SimpleBannerSchema>


function EditComponent({ instance }: ElementProps) {

    const { dispatch } = useWebsiteBuilder();
    const { customAttributes: { title, message, color } } = instance

    const form = useForm<FormValues>({
        resolver: zodResolver(SimpleBannerSchema),
        defaultValues: {
            title: title as string | "",
            message: message as string | "",
            color: color as string | "",
        },
        mode: "onBlur",
    })

    const onSubmit = async (values: FormValues) => {
        const { title, message, color } = values;
        const updatedElement = {
            ...instance,
            customAttributes: {
                title,
                message,
            },
            styles: {
                backgroundColor: color,
                border: "1px solid white"
            }
        };
        const myUpdateAction: UpdateElement = {
            type: ActionType.UpdateElement,
            payload: {
                element: updatedElement,
            }
        };
        dispatch(myUpdateAction);

    }

    return (
        <Form {...form}>
            <form onBlur={form.handleSubmit(onSubmit)} onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Aviso</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Aviso"
                                    {...field}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") e.currentTarget.blur();
                                    }}
                                />
                            </FormControl>
                            <FormDescription>Título do aviso</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mensagem</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Sua mensagem,"
                                    {...field}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") e.currentTarget.blur();
                                    }}
                                />
                            </FormControl>
                            <FormDescription>Mensagem de aviso</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="color"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Cor</FormLabel>
                            <FormControl>
                                <ColorPicker
                                    onChange={(v) => field.onChange(v)}
                                    value={field.value} />
                            </FormControl>
                            <FormDescription>Mensagem de aviso</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />



            </form>

        </Form>
    )
}

