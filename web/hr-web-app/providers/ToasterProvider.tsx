import React from 'react'
import { Toaster } from 'react-hot-toast'

const ToasterProvider = () => {
    return (
        <Toaster
            position="top-center"
            reverseOrder={true}
        />
    )
}

export default ToasterProvider