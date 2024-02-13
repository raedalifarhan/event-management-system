import React from 'react'

interface Props {
    date: string | null;
}

const DispalayDate = ({ date }: Props) => {
    const formattedDate =
        date &&
        new Date(date).toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        }).replace(/\//g, '-') + // Replace '/' with '-' +
        ' ' +
        new Date(date).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });

    return <p className="mb-2">{formattedDate || 'N/A'}</p>;
};


export default DispalayDate