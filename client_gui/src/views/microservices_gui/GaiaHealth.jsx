import { useState } from 'react';
import ManagerTemplate from '../../components/template/ManagerTemplate';

function ContentArea() {
    const [selectedFile, setSelectedFile] = useState(null);

    // Function to handle file selection
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        console.log('Selected file:', file);
    };

    // Function to handle file upload
    const handleFileUpload = async (event) => {
        event.preventDefault();
        
        if (!selectedFile) {
            alert("Please select a file to upload.");
            return;
        }

        // Create FormData object to send the file to the server
        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            // Example: sending the file to a mock server (replace with your API)
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                console.log('File uploaded successfully');
            } else {
                console.error('File upload failed');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div className="mt-6">
            <form onSubmit={handleFileUpload}>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                    Upload File
                </label>
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                />
                <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    Upload
                </button>
            </form>
        </div>
    )
}

const GaiaHealth = () => {
    return (
        <ManagerTemplate>
            <ContentArea />
        </ManagerTemplate>
    )
}

export default GaiaHealth;