export default async function convertBlobUrlToFile(blobUrl){
    const response= await fetch(blobUrl);
    const blob= await response.blob();

    //Extracting the filename from the blob url
    const filename= blobUrl.split('/').pop();

    // Creating a new File from the blob URL
    const file= new File([blob], filename, {type: blob.type});

    return file;
}

