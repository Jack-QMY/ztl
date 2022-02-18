import React from 'react';
import { StyleSheet, View } from 'react-native';
import OrderItem from './components/OrderItem';

interface Props {
  type: 'ALl' | 'PAY' | 'SHIP' | 'RECEIPT' | 'COMMENT';
}

export default function CategoryOrder(props: Props) {
  const { type } = props;
  return (
    <View style={styles.container}>
      <OrderItem category={type} type="normal" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: pixel(14),
    margin: pixel(14),
    borderRadius: pixel(8),
  },
});
