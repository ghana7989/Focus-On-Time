/** @format */

import React, { FC } from 'react'
import {
	GestureResponderEvent,
	StyleSheet,
	Text,
	TouchableOpacity,
} from 'react-native'
import { colors } from '../utils/colors'

interface Props {
	style?: {}
	textStyle?: {}
	size?: number
	title: string
	onPress: ((event: GestureResponderEvent) => void) | undefined
}
const RoundedButton: FC<Props> = ({
	style,
	textStyle,
	size,
	title,
	onPress,
}) => {
	return (
		<TouchableOpacity
			style={[size ? styles(size).radius : styles().radius, style]}
			onPress={onPress}>
			<Text style={[styles(size).text, textStyle]}>{title}</Text>
		</TouchableOpacity>
	)
}

const styles = (size: number = 125) =>
	StyleSheet.create({
		radius: {
			borderRadius: size / 2,
			width: size,
			height: size,
			alignItems: 'center',
			justifyContent: 'center',
			borderColor: 'white',
			borderWidth: 2,
		},
		text: {
			color: colors.white,
			fontSize: size / 3,
		},
	})
export { RoundedButton }
