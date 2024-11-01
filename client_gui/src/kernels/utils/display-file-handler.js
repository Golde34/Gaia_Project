export const handleFileContent = (fileContent) => {
    let displayContent = fileContent.replace(/\n/g, '<br />');
    
    return displayContent;
}

export const saveContentAsFile = (content, newName) => {
        console.log("Raw Content from Quill:", content);

        let plainTextContent = content
            .replace(/^<p>/, '')
            .replace(/<\/p>$/, '')
            .replace(/<p><br><\/p>/g, '')
            .replace(/<\/p>\s*<p>/g, '\n')
            .replace(/<br>/g, '\n');

        // Decode HTML entities
        const textarea = document.createElement("textarea");
        textarea.innerHTML = plainTextContent;
        plainTextContent = textarea.value;

        console.log("Plain Text Content:", plainTextContent);

        const blob = new Blob([plainTextContent], { type: 'text/plain' });
        const file = new File([blob], `${newName}.txt`, { type: 'text/plain' });

        console.log("Created File:", file);
        return file;
    };