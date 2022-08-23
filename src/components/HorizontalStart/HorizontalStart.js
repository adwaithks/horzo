import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const HorizontalStart = () => {
  return (
    <View style={styles.horizontalStartContainer}>
      <View style={styles.horizontalBar}></View>
    </View>
  )
}

let styles = StyleSheet.create({
    horizontalStartContainer: {
        marginTop: 15,
        width: '100%',
        height: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    horizontalBar: {
        width: '30%',
        height: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 10
    }
});

export default HorizontalStart