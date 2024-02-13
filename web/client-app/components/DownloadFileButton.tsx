import React from 'react';

interface Props {
    fileName: string
}

const DownloadFileButton = ({fileName}: Props) => {

    const handleDownload = async () => {
        const response = await fetch(`http://localhost:7000/api/companies/download?fileName=${fileName}`);
        const blob = await response.blob();

        const url = window.URL.createObjectURL(new Blob([blob]));
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <button onClick={handleDownload}>Download File</button>
    );
};

export default DownloadFileButton;
