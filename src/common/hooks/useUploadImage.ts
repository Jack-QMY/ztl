import { launchImageLibrary } from 'react-native-image-picker';
import { fetchRequest } from '~/common';
import { userStore } from '~/store';

export const useUploadImage = () => {
    const token = userStore?.me?.userinfo?.token;
    return new Promise(function (resolve, reject) {
        fetchRequest({
            url: 'wanlshop/common/uploadData',
            method: 'GET',
        }).then((res) => {
            launchImageLibrary(
                {
                    mediaType: 'photo',
                    maxWidth: 1000,
                    maxHeight: 1000,
                    quality: 0.8,
                },
                (image) => {
                    if (image.didCancel) {
                        Toast.show({ content: '您取消了相册' });
                        return false;
                    }

                    let formData = new FormData();
                    formData.append('file', {
                        name: image.fileName,
                        type: image.type,
                        size: image.fileSize,
                        tmp_name: image.uri,
                        ...image,
                    });
                    fetch(`${res?.data?.uploadurl}?token=${token}`, {
                        method: 'POST',
                        body: formData,

                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'multipart/form-data',
                        },
                    })
                        .then((response) => response.json())
                        .then((result) => {
                            resolve(result);
                        })
                        .catch((error) => {
                            reject(error);
                        });
                },
            );
        });
    });
};
