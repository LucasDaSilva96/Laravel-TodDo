import { Task } from '@/types'
import { Link, router, usePage } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

export default function TaskComponent({ task, success }: { task: Task, success?: string }) {
    const [isCompleted, setIsCompleted] = useState<boolean>(task.completed)
    const [showToast, setShowToast] = useState<boolean>(success ? true : false)

    const page = usePage();

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

    useEffect(() => {
        if (success) {
            setTimeout(() => {
                setShowToast(false)
            }, 3000)
        }
    }, [])

    return (

        <>
            {success && (
                <div className='absolute top-2 w-full flex items-center justify-center left-0 h-20 overflow-hidden'>

                    <AnimatePresence>

                        {showToast && <motion.div
                            initial={{ opacity: 0, y: -100 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -100 }}
                            transition={{ duration: 0.5, bounce: 20, damping: 10, ease: 'anticipate' }}
                            key={String(showToast)}
                            className="max-w-xs bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-neutral-800 dark:border-neutral-700" role="alert" tabIndex={-1} aria-labelledby="hs-toast-success-example-label">
                            <div className="flex p-4">
                                <div className="shrink-0">
                                    <svg className="shrink-0 size-4 text-teal-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path>
                                    </svg>
                                </div>
                                <div className="ms-3">
                                    <p id="hs-toast-success-example-label" className="text-sm text-gray-700 dark:text-neutral-400">
                                        {success}
                                    </p>
                                </div>
                            </div>
                        </motion.div>}


                    </AnimatePresence>
                </div>
            )}
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
        </>

    )
}
