
'use client';

import { Spinner } from 'flowbite-react';
import React from 'react'

interface Props {
 label: string
}

function LoadingComponent({label}: Props) {
    return (
        <div className="flex flex-row gap-3">
            <Spinner aria-label="Alternate spinner button example" size="lg" />
            <span className="pl-3">{label}</span>
        </div>
      );
}

export default LoadingComponent
