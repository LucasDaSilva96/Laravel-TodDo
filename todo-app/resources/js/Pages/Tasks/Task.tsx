import { Task } from '@/types'
import { Link, router } from '@inertiajs/react'
import { useState } from 'react'

export default function TaskComponent({ task }: { task: Task }) {
    const [isCompleted, setIsCompleted] = useState<boolean>(task.completed)

    const handleUpdateStatus = () => {
        setIsCompleted(!isCompleted)

        router.patch(`/tasks/${task.id}`, {
            completed: !isCompleted
        })

    }

    const handleDelete = () => {
        router.delete(`/tasks/${task
            .id}`)
    }

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
                    {task.long_description && <p>{task.long_description}</p>}
                    {task.completed && <p className='text-green-500'>Completed</p>}
                    {!task.completed && <p className='text-red-500'>Not Completed</p>}
                    <div className='w-full flex items-center justify-between p-1'>

                        <button onClick={handleUpdateStatus} className='bg-blue-500 p-2 rounded-md'>
                            {isCompleted ? 'Mark as not completed' : 'Mark as completed'}
                        </button>
                        <button onClick={handleDelete} className='bg-red-500 p-2 rounded-md'>
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </section>
    )
}
