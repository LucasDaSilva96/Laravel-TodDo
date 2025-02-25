import { Task } from '@/types';
import { Link } from '@inertiajs/react';

interface Response {
    current_page: number;
    data: Task[];
    links: string[];
    per_page: number;
    prev_page_url?: string;
    to: number;
    total: number;
    last_page_url: string;
    last_page: number;
    next_page_url?: string;
}


export default function Index({ tasks }: { tasks: Response }) {


    const { current_page, data, last_page, last_page_url, links, per_page, to, total, next_page_url, prev_page_url } = tasks;
    return (
        <section className='w-full min-h-screen flex items-center justify-center bg-black text-slate-50'>
            <Link href='/tasks/create' className='bg-blue-500 p-2 rounded-md absolute top-2 right-2'>Create Task</Link>
            <div className='w-full max-w-lg rounded-md h-full max-h-[500px] overflow-y-auto p-2 flex flex-col gap-3'>
                {data?.map((task) => (
                    <Link href={`/task/${task.id}`} key={task.id} className='bg-neutral-500 shadow-md rounded-md p-4 mb-2'>
                        <h3 className='text-lg font-semibold '>{task.title}</h3>
                        <p>{task.description}</p>
                    </Link>
                ))}
            </div>
            <div className='flex justify-between mt-4'>
                {prev_page_url && (
                    <Link href={prev_page_url} className='bg-blue-500 p-2 rounded-md'>
                        Previous
                    </Link>
                )}
                {next_page_url && (
                    <Link href={next_page_url} className='bg-blue-500 p-2 rounded-md'>
                        Next
                    </Link>
                )}
            </div>
        </section>
    )
}
