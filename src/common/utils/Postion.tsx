import { GeolocationAndroid, GeolocationIos, GeolocationWeb } from '!/app.json';
import { PermissionsAndroid } from 'react-native';
import {
    Geolocation,
    init,
    setAllowsBackgroundLocationUpdates,
    setLocatingWithReGeocode,
    setNeedAddress
} from 'react-native-amap-geolocation';
import { userStore } from '~/store';

//获取基本定位信息
export async function geolocationInit(callback?: any) {
    await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    ]);

    await init({
        ios: GeolocationIos,
        android: GeolocationAndroid,
    });

    setNeedAddress(true);
    setLocatingWithReGeocode(true);
    setAllowsBackgroundLocationUpdates(true);

    Geolocation.getCurrentPosition(({ location, coords }) => {
        if (location?.latitude) {
            let lat = location?.latitude;
            let lng = location?.longitude;
            fetch(
                `https://restapi.amap.com/v3/geocode/regeo?key=${GeolocationWeb}&location=${lng},${lat}&extensions=all`,
                {
                    method: 'GET',
                },
            )
                .then((response) => response.json())
                .then((result) => {
                    let rs = result.regeocode;
                    let poiName = rs?.pois.length > 0 ? rs?.pois[0]?.name ?? '' : location?.poiName ?? '';
                    let description = rs?.addressComponent?.township ?? '';
                    let district = rs?.addressComponent?.district ?? '';
                    let pois = rs?.pois;
                    let city = rs?.addressComponent?.city;
                    let province = rs?.addressComponent?.province;
                    let p = {
                        poiName: poiName,
                        description: description ?? '',
                        district: district,
                        latitude: location?.latitude ?? '',
                        longitude: location?.longitude ?? '',
                        pois: pois,
                        city: city,
                        province: province,
                    };
                    callback && callback(p);
                    userStore.repostion(p);
                })
                .catch((error) => {
                    console.log('获取定位error', error);
                });
        }
    });
}

// 根据关键词和城市获取位置

export function searchAdress(keywords) {
    const position = new Promise(function (resolve, reject) {
        fetch(
            `https://restapi.amap.com/v3/place/text?key=${GeolocationWeb}&keywords=${keywords}&types=&children=1&offset=20&page=1&extensions=all`,
            {
                method: 'GET',
            },
        )
            .then((response) => response.json())
            .then((result) => {
                resolve(result?.pois);
            })
            .catch((error) => {
                reject(error);
            });
    });
    return position;
}
