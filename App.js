import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, Image, View } from 'react-native';
import React, { useEffect, useRef, useState } from "react";

import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';

const ALBUM_TITLE = ""; // ALBUM NAME (ON YOUR PHONE) HERE
const TITLE = ""; // TITLE HERE
const DATE = new Date("January 01, 2000"); // The date of the important event you want to start counting at!
const TODAY = new Date();
const ELAPSED = TODAY - DATE;

export default function App() {
    const [status, requestPermission] = MediaLibrary.usePermissions();
    const [image, setImage] = useState(null);

    const [elapsedYears, setElapsedYears] = useState(0);
    const [elapsedMonths, setElapsedMonths] = useState(0);
    const [elapsedDays, setElapsedDays] = useState(0);
    const [elapsedDaysTotal, setElapsedDaysTotal] = useState(0);

    useEffect(() => {
        (async () => {
            const rollPermissions = await MediaLibrary.requestPermissionsAsync();
                if (rollPermissions) {
                const album = await MediaLibrary.getAlbumAsync(ALBUM_TITLE);
                const res = await MediaLibrary.getAssetsAsync({ album });

                // console.log(album);
                // console.log(res);

                if (album !== null && album !== undefined) {
                    const index = Math.floor(Math.random() * res.assets.length);
                    setImage(res.assets[index]);

                    setElapsedYears(Math.floor(ELAPSED / (31536000 * 1000)));
                    setElapsedMonths(Math.floor((ELAPSED / (2628000 * 1000) % 12)) );
                    setElapsedDays(TODAY.getDate());

                    setElapsedDaysTotal(Math.floor(ELAPSED / (86400 * 1000)));
                } else {
                    console.log("Was denied permissions.")
                }
            }

        })();
    }, []);

    return (
        <View style={styles.container}>
        <Text style={styles.title}>{TITLE}</Text>
        <Text style={styles.date}>{DATE.toLocaleString('default', {'month': 'long'}) + " " + DATE.getDate() + " " + DATE.getFullYear()}</Text>
        <Image
            style={styles.picture}
            source={image}
            onClick={() => {
                const index = Math.floor(Math.random() * res.assets.length);
                setImage(res.assets[index]);

            }}>
        </Image>
        <Text style={styles.time}>{elapsedYears + ' years & ' + elapsedMonths + ' months & ' + (31 - (25 - elapsedDays)) + ' days'}</Text>
        <Text style={styles.days}>{elapsedDaysTotal + ' days'}</Text>

        </View>

    );
}

const styles = StyleSheet.create({
    title: {
        fontFamily: 'System',
        fontWeight: '800',
        fontSize: 24,
        padding: 5,
        color: 'white',
    },
    date: {
        fontFamily: 'System',
        fontWeight: 'normal',
        fontSize: 14,
        color: 'white',
    },
    time: {
        fontFamily: 'System',
        fontWeight: '800',
        fontSize: 14,
        padding: 5,
        color: 'white',
    },
    days: {
        fontFamily: 'System',
        fontStyle: 'italic',
        fontSize: 14,
        color: 'white',
    },
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
    },
    picture: {
        height: Dimensions.get('window').height * 0.6,
        width: Dimensions.get('window').width * 0.7,
        borderRadius: 10,
        marginTop: Dimensions.get('window').height / 25,
        marginBottom: Dimensions.get('window').height / 25,
        alignItems: "center",
        justifyContent: "flex-start",
    },
});
