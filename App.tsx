/** @format */

import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Focus } from './src/features/focus/Focus'
import { colors } from './src/utils/colors'

export default function App() {
	const [focusSubject, setFocusSubject] = useState<string | undefined>(
		undefined,
	)

	return (
		<View style={styles.container}>
			<Focus addSubject={setFocusSubject} />
			{focusSubject && <Text>{focusSubject}</Text>}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.darkBlue,
		flex: 1,
	},
})
