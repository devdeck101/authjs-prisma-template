import type { PropsWithChildren } from "react"


interface Props extends PropsWithChildren { }

const Page = ({ children }: Props) => {
    return (
        <div className="flex min-h-screen w-full">
            <div className="flex flex-1 flex-col">
                <header className="sticky top-0 z-20 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                </header>
                <div className="flex flex-1 my-2">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Page