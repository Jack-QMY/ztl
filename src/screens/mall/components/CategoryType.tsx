import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Row, SvgIcon, SvgPath } from '~/components';

interface Props {
    title: string;
    secondaryTitle?: string;
    description?: string;
    type?: number;
    data: any;
}

export default function CategoryType(props: Props) {
    const { title, secondaryTitle, description, type, data } = props;
    return (
        <View style={styles.container}>
            <Row style={styles.row}>
                <Row>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description}>{description}</Text>
                </Row>
                <Row>
                    <Text style={styles.description}>{secondaryTitle}</Text>
                    <SvgIcon name={SvgPath.rightArrow} size={26} color="rgba(0,0,0,0.5)" />
                </Row>
            </Row>
            {type === 1 ? (
                <View>
                


            </View>):null}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginHorizontal: pixel(Theme.edgeDistance),
        padding: pixel(Theme.edgeDistance),
        borderRadius: 6,
    },
    row: {
        justifyContent: 'space-between',
    },
    title: {
        fontSize: font(16),
        fontWeight: 'bold',
        color: '#000',
    },
    description: {
        fontSize: font(12),
        color: 'rgba(0,0,0,0.5)',
        marginLeft: pixel(14),
    },
});
