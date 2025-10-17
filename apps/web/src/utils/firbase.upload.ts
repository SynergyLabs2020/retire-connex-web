import React from 'react';

import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { storage } from './firebase';

export const handleMultipleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setIsUploading: Function,
    setValue: Function,
    getValues: Function
) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const currentImages = getValues('images');
    const allowedTypes = ['image/png', 'image/jpeg', 'application/pdf'];
    const maxFileCount = 5;

    if (currentImages.length + files.length > maxFileCount) {
        alert(`You can only upload a maximum of ${maxFileCount} files.`);
        return;
    }

    const filesToUpload = Array.from(files).filter((file) => allowedTypes.includes(file.type));

    if (filesToUpload.length !== files.length) {
        alert('Some files were not uploaded. Please select only .png, .jpeg, or .pdf files.');
    }

    if (filesToUpload.length === 0) return;

    setIsUploading(true);

    const uploadPromises = filesToUpload.map(async (file: File) => {
        const storageRef = ref(storage, `images/${+new Date() + '.' + file.type.split('/')[1]!}`);
        return uploadBytes(storageRef, file).then((snapshot) => getDownloadURL(snapshot.ref));
    });

    try {
        const urls = await Promise.all(uploadPromises);

        setValue('images', [...currentImages, ...urls], { shouldValidate: true });
    } catch (error) {
        console.error('Error uploading files:', error);
        alert('An error occurred during the upload. Please try again.');
    } finally {
        setIsUploading(false);
    }
};

export const handleSingleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setIsUploading: Function,
    setValue: Function,
    getValues: Function
) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['image/png', 'image/jpeg'];

    if (!allowedTypes.includes(file.type)) {
        alert('Some files were not uploaded. Please select only .png, .jpeg.');
    }

    setIsUploading(true);
    const storageRef = ref(storage, `images/${+new Date() + '.' + file.type.split('/')[1]!}`);

    try {
        const snapshot = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(snapshot.ref);

        setValue('photoUrl', url, { shouldValidate: true });
    } catch (error) {
        console.error('Error uploading image:', error);
    } finally {
        setIsUploading(false);
    }
};
