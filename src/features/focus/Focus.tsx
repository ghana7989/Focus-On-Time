/** @format */

import React, { FC, useRef, useState } from 'react'
import { StyleSheet, Text, TextInput as rnTextInput, View } from 'react-native'
import { TextInput } from 'react-native-paper'
import { RoundedButton } from '../../components/RoundedButton'
import { sizes, spacing } from '../../utils/sizes'

interface Props {
	addSubject: React.Dispatch<React.SetStateAction<string | undefined>>
}

const Focus: FC<Props> = ({ addSubject }) => {
	const [tempItem, setTempItem] = useState<string | undefined>(undefined)
	const textInputRef = useRef<rnTextInput | null>(null)
	return (
		<View style={styles.container}>
			<View style={styles.titleContainer}>
				<Text style={styles.title}>What would you like to focus on?</Text>
				<View style={styles.inputContainer}>
					<TextInput
						ref={textInputRef}
						style={styles.inputTextField}
						value={tempItem}
						onChangeText={(text) => {
							setTempItem(text)
						}}
					/>
					<RoundedButton
						title='+A+'
						size={100}
						onPress={() => {
							addSubject(tempItem)
							textInputRef.current?.clear()
						}}
					/>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		height: 400,
		justifyContent: 'center',
		alignItems: 'center',
	},
	titleContainer: {
		padding: spacing.md,
		justifyContent: 'center',
	},
	title: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: sizes.lg,
		textAlign: 'center',
	},
	inputContainer: {
		paddingTop: spacing.md,
		alignItems: 'center',
	},
	inputTextField: {
		height: 50,
		width: 380,
		marginVertical: 40,
	},
})
export { Focus }
