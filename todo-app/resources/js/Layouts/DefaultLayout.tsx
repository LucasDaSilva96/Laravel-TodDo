import { PropsWithChildren, ReactNode } from 'react';

export default function DefaultLayout({ header, children }: PropsWithChildren<{ header?: ReactNode }>) {
    return (
        <main className='w-full h-screen overflow-y-scroll overflow-x-hidden bg-black text-slate-50 p-2'>
            {header && (
                <header className='bg-white shadow text-black'>
                    <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
                        {header}
                    </div>
                </header>
            )}
            {children}
        </main>
    )
}
