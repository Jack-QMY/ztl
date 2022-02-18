import { Platform } from 'react-native';
import RNImageCropPicker from 'react-native-image-crop-picker';
import { check, openSettings, PERMISSIONS, RESULTS } from 'react-native-permissions';


// todo:video待完善
export interface Options {
    cropping?: boolean;
    width?: number;
    height?: number;
    multiple?: boolean;
    path?: string;
    includeBase64?: boolean;
    cropperCircleOverlay?: boolean;
    maxFiles?: number;
    useFrontCamera?: boolean;
    mediaType?: 'photo' | 'video' | 'any';
    showsSelectedCount?: boolean;
    forceJpg?: boolean;
    sortOrder?: 'none' | 'asc' | 'desc';
    showCropGuidelines?: boolean;
    enableRotationGesture?: boolean;
}

const PERMISSION_PHOTO =
    Platform.OS === 'ios' ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;

export async function openImagePicker(props?: Options) {
    //检查权限 被拒过可以再要询问
    const result = await check(PERMISSION_PHOTO);
    console.log('open image check ', result);

    if (result === RESULTS.BLOCKED) {
        return openSettings();
    }

    return RNImageCropPicker.openPicker({
        ...props,
    })
        .then((media: any) => {
            const pickedItems = Array.isArray(media) ? media : [media];
            for (var i in pickedItems) {
                const pickedItem = pickedItems[i];
                if (pickedItem?.mime === 'video/mp4') {
                    pickedItem.uploadPath = pickedItem?.path?.substr(7);
                }
            }
            return pickedItems;
        })
        .catch((e) => {
            console.log('e.code', e.code);
            if (e.code === 'E_PICKER_CANCELLED') {
                Toast.show({
                    content: '您已取消打开相册',
                });
                Promise.reject(false);
            }
        });
}

export default RNImageCropPicker;
