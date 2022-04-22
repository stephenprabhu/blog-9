const imagePathHelper = (partialPath)=> {
    if(partialPath)
        return `http://127.0.0.1:8000/storage/${partialPath.replace('public/','')}`;
    else
        return '';
}

export default imagePathHelper;
