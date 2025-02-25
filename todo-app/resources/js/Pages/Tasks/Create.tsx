import DefaultLayout from '@/Layouts/DefaultLayout';
import { Head, router } from '@inertiajs/react';
import { useRef } from 'react';


export default function CreateForm() {

    const formRef = useRef<HTMLFormElement | null>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formRef.current) return;
        const formData = new FormData(formRef.current);

        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const long_description = formData.get('long_description') as string;
        const completed = formData.get('completed') as string;

        router.post('/tasks', {
            title,
            description,
            long_description,
            completed: completed === 'on' ? true : false
        })

    }


    return (
        <DefaultLayout>
            <Head title='Create Task' />

            <section className='w-full min-h-screen flex items-center justify-center p-2 bg-black text-slate-50'>
                <form ref={formRef} onSubmit={handleSubmit} className='w-full max-w-md bg-neutral-500 shadow-md rounded-md p-4'>
                    <div className='mb-2'>
                        <label htmlFor='title' className='block'>Title</label>
                        <input required type='text' name='title' id='title' className='w-full p-2 rounded-md text-black' />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='description' className='block'>Description</label>
                        <input required type='text' name='description' id='description' className='w-full p-2 rounded-md text-black' />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='long_description' className='block'>Long Description</label>
                        <textarea name='long_description' id='long_description' className='w-full p-2 rounded-md text-black'></textarea>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='completed' className='block'>Completed</label>
                        <input type='checkbox' name='completed' id='completed' className='p-2 rounded-md' />
                    </div>
                    <button type='submit' className='bg-blue-500 p-2 rounded-md'>Create Task</button>
                </form>
            </section>
        </DefaultLayout>
    )
}
