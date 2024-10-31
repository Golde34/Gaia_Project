export const handleFileContent = (fileContent) => {
    let displayContent = fileContent.replace(/\n/g, '<br />');
    
    return displayContent;
}