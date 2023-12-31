"use client";
import { ComponentProps } from "react";
import { useFormStatus } from 'react-dom'

type FormSubmitButtomProps = {
    children: React.ReactNode,
    className?: string
} & ComponentProps<'button'>



export default function FormSubmitButtom(
    { children, className, ...props }: FormSubmitButtomProps
) {

    const { pending} = useFormStatus()
    return (
        <button
            {...props}
            type='submit'
            disabled={pending}
            className={`btn btn-primary ${className}`}
        >
            {pending && < span className="loading loading-spinner loading-xs" />}
            {children}
        </button >
    )
}

