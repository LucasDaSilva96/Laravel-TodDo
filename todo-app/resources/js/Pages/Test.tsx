import { motion } from "motion/react"
export default function Test({ name }: { name?: string }) {
    return (
        <motion.section className='w-full h-screen flex justify-center items-center bg-black' initial={{
            opacity: 0
        }} animate={{
            opacity: 1
        }}
            transition={{
                duration: 0.5,
                bounce: 0.25
            }}
        >
            <motion.h1 initial={{
                y: -100,
                scale: 0.5
            }} animate={{
                y: 0,
                scale: 1
            }}
                transition={{
                    delay: 0.5,
                    duration: 0.5,
                }}
                className='text-center text-slate-50 text-2xl'>Hello World {name ? name : ''}
            </motion.h1>
        </motion.section>
    )
}
