import { Task } from '@/types'
import { Link } from '@inertiajs/react'

export default function TaskComponent({ task }: { task: Task }) {
    console.log(task)
    return (
        <section className='w-full min-h-screen flex items-center justify-center bg-black text-slate-50'
        >
            <Link href='/' className='bg-neutral-500 shadow-md rounded-md p-4 mb-2 absolute top-2 left-2'>
                <h3 className='text-lg font-semibold '>Back</h3>
            </Link>
            {task && (
                <div className='bg-neutral-500 w-full max-w-md shadow-md rounded-md p-4 mb-2'>
                    <h3 className='text-lg font-semibold '>{task.title}</h3>
                    <p>{task.description}</p>
                </div>
            )}
        </section>
    )
}
