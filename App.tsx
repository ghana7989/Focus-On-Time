/** @format */

import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import { Focus } from './src/features/focus/Focus'
import { FocusHistory } from './src/features/focus/FocusHistory'
import { Timer } from './src/features/timer/Timer'
import { colors } from './src/utils/colors'
import { spacing } from './src/utils/sizes'

export type FocusSubject = string

export enum Status {
	completed = 1,
	cancelled = 2,
}
export default function App() {
	const [focusSubject, setFocusSubject] = useState<FocusSubject | undefined>(undefined)
	const [focusHistory, setFocusHistory] = useState<{ subject: FocusSubject; status: Status }[]>([])
	const addFocusHistorySubjectWithState = (subject: FocusSubject, status: Status): void => {
		setFocusHistory([...focusHistory, { subject, status }])
	}
	const onClear = () => {
		setFocusHistory([])
	}
	const saveFocusHistory = async () => {
		try {
			AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory))
		} catch (e) {
			console.log(e)
		}
	}
	const loadFocusHistory = async () => {
		try {
			const history = await AsyncStorage.getItem('focusHistory')

			if (history && JSON.parse(history).length) {
				setFocusHistory(JSON.parse(history))
			}
		} catch (e) {
			console.log(e)
		}
	}

	useEffect(() => {
		loadFocusHistory()
	}, [])

	useEffect(() => {
		saveFocusHistory()
	}, [focusHistory])
	return (
		<View style={styles.container}>
			{!focusSubject ? (
				<>
					<Focus addSubject={setFocusSubject} />
					<FocusHistory focusHistory={focusHistory} onClear={onClear} />
				</>
			) : (
				<Timer
					focusSubject={typeof focusSubject === 'string' ? focusSubject : ''}
					onTimerEnd={() => {
						addFocusHistorySubjectWithState(focusSubject, Status.completed)
						setFocusSubject(undefined)
					}}
					onCancel={() => {
						addFocusHistorySubjectWithState(focusSubject, Status.cancelled)
						setFocusSubject(undefined)
					}}
				/>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.darkBlue,
		flex: 1,
		paddingTop: Platform.OS === 'android' ? spacing.lg : spacing.md,
	},
})
