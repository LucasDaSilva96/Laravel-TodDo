import { Task } from '@/types';
import { Link } from '@inertiajs/react';


export default function Index({ tasks }: { tasks: Task[] }) {
    return (
        <section className='w-full min-h-screen flex items-center justify-center bg-black text-slate-50'>
            <div className='w-full max-w-lg rounded-md h-full max-h-[500px] overflow-y-auto p-2 flex flex-col gap-3'>
                {tasks?.map((task) => (
                    <Link href={`/task/${task.id}`} key={task.id} className='bg-neutral-500 shadow-md rounded-md p-4 mb-2'>
                        <h3 className='text-lg font-semibold '>{task.title}</h3>
                        <p>{task.description}</p>

                    </Link>
                ))}
            </div>
        </section>
    )
}
