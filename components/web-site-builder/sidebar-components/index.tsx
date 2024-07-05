"use client";




import { ElementImpl } from '@/lib/web-site-builder/elements';
import ElementButton from '../element-button';


const SidebarComponents = () => {


    return (
        <div className="fixed right-0 z-10 h-full w-64 border rounded-l-lg bg-background sm:static sm:w-auto">
            <div className="flex h-full flex-col gap-4 p-4">
                <nav className="grid grid-cols-2 gap-2">
                    <ElementButton element={ElementImpl.TextElement} />
                </nav>
            </div>
        </div>
    )
}

export default SidebarComponents