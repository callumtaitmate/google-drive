import React from 'react'
import Spinner from '~/components/ui/spinner'

function Loading() {
    return (
        <div className='flex h-screen items-center justify-center'>
            <Spinner />
        </div>
    )
}

export default Loading