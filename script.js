document.addEventListener('DOMContentLoaded', () => {
    const dropArea = document.getElementById('drop-area');
    const fileInput = document.getElementById('file-input');
    const fileList = document.getElementById('file-list');

    dropArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropArea.classList.add('dragover');
    });

    dropArea.addEventListener('dragleave', () => {
        dropArea.classList.remove('dragover');
    });

    dropArea.addEventListener('drop', (e) => {
        e.preventDefault();
        dropArea.classList.remove('dragover');
        handleFiles(e.dataTransfer.files);
    });

    fileInput.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });

    function handleFiles(files) {
        Array.from(files).forEach((file) => {
            const listItem = document.createElement('div');
            listItem.classList.add('file-item');
            listItem.innerHTML = `<span>Name: ${file.name}</span><span>Type: ${file.type}</span><span>Size: ${formatSize(file.size)}</span>`;
            fileList.appendChild(listItem);
        });

        // Save files to localStorage
        saveFilesToLocalStorage(files);
    }

    function formatSize(size) {
        const units = ['B', 'KB', 'MB', 'GB', 'TB'];
        let i = 0;
        while (size >= 1024 && i < units.length - 1) {
            size /= 1024;
            i++;
        }
        return size.toFixed(2) + ' ' + units[i];
    }

    function saveFilesToLocalStorage(files) {
        const storedFiles = JSON.parse(localStorage.getItem('storedFiles')) || [];

        files.forEach((file) => {
            storedFiles.push({
                name: file.name,
                type: file.type,
                size: file.size,
            });
        });

        localStorage.setItem('storedFiles', JSON.stringify(storedFiles));
    }
});
