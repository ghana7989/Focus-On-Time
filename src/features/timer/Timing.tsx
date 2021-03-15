/** @format */

import React, { FC } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { RoundedButton } from '../../components/RoundedButton'

interface Props {
	changeTime: (min: number) => void
}
const Timing: FC<Props> = ({ changeTime }) => {
	return (
		<>
			<View style={styles.timingButtonContainer}>
				<RoundedButton size={75} title='10' onPress={() => changeTime(10)} />
			</View>
			<View style={styles.timingButtonContainer}>
				<RoundedButton size={75} title='15' onPress={() => changeTime(15)} />
			</View>
			<View style={styles.timingButtonContainer}>
				<RoundedButton size={75} title='20' onPress={() => changeTime(20)} />
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	timingButtonContainer: {
		flex: 1,
    alignItems: 'center',
	},
})
export { Timing }
