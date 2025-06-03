import React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function utils(...inputs) {
    return twMerge(clsx(inputs))
}

export default utils

