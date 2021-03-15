/** @format */

import React, { FC } from 'react'
import 'react-native-get-random-values'
import { nanoid } from 'nanoid'
import { StyleSheet, View, Text, SafeAreaView, FlatList } from 'react-native'
import { FocusSubject, Status } from '../../../App'
import { RoundedButton } from '../../components/RoundedButton'
import { colors } from '../../utils/colors'
import { sizes, spacing } from '../../utils/sizes'

interface Props {
	focusHistory: {
		subject: FocusSubject
		status: Status
	}[]
	onClear: () => void
}
const FocusHistory: FC<Props> = ({ focusHistory, onClear }) => {
	const HistoryItem = (item: { subject: FocusSubject; status: Status }): JSX.Element => {
		return (
			<Text key={nanoid()} style={styles(item.status).historyItem}>
				{item.subject}
			</Text>
		)
	}
	return (
		<>
			<View style={{ flex: 6, alignItems: 'center' }}>
				{!!focusHistory.length && (
					<>
						<Text style={styles(NaN).title}>Things we have focused on</Text>
						<FlatList
							key={nanoid()}
							keyExtractor={(item, index) => index.toString()}
							style={{ flex: 1 }}
							contentContainerStyle={{ alignItems: 'center' }}
							data={focusHistory}
							renderItem={({ item, index }) => HistoryItem(item)}
						/>
						<View style={staticStyles.clearContainer}>
							<RoundedButton size={75} title='Clear' onPress={() => onClear()} />
						</View>
					</>
				)}
			</View>
		</>
	)
}

const styles = (status: number) =>
	StyleSheet.create({
		historyItem: {
			color: status > 1 ? 'red' : 'green',
			fontSize: sizes.md,
			marginBottom: 2,
		},
		title: {
			color: colors.white,
			fontSize: sizes.xl,
			textAlign: 'center',
		},
	})
const staticStyles = StyleSheet.create({
	clearContainer: {
		alignItems: 'center',
		padding: spacing.md,
	},
})
export { FocusHistory }
