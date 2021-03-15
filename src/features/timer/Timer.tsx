/** @format */

import { useKeepAwake } from 'expo-keep-awake'
import React, { FC, useState } from 'react'
import { Platform, StyleSheet, Text, Vibration, View } from 'react-native'
import { ProgressBar } from 'react-native-paper'
import { Countdown } from '../../components/Countdown'
import { RoundedButton } from '../../components/RoundedButton'

import { colors } from '../../utils/colors'
import { spacing } from '../../utils/sizes'
import { Timing } from './Timing'

interface Props {
	focusSubject: string
	onTimerEnd: () => void
	onCancel: () => void
}
const DEFAULT_TIME = 0.1
const Timer: FC<Props> = ({ onCancel: clearSubject, focusSubject, onTimerEnd }) => {
	useKeepAwake()
	const [minutes, setMinutes] = useState(DEFAULT_TIME)
	const [isStarted, setIsStarted] = useState<boolean>(false)
	const [progress, setProgress] = useState<number>(1)
	const onProgress = (currentProgress: number): void => {
		setProgress(currentProgress)
	}

	const vibrate = (): void => {
		if (Platform.OS === 'ios') {
			const interval = setInterval(() => Vibration.vibrate(), 1000)
			setTimeout(() => {
				clearInterval(interval)
			}, 10000)
		} else if (Platform.OS === 'android') {
			Vibration.vibrate(2000)
		}
	}

	const onEnd = () => {
		vibrate()
		setMinutes(DEFAULT_TIME)
		setProgress(1)
		setIsStarted(false)
		onTimerEnd()
	}
	const changeTime = (min: number): void => {
		setMinutes(min)
		setProgress(1)
		setIsStarted(false)
	}
	return (
		<View style={styles.container}>
			<View style={styles.countDownContainer}>
				<Countdown isPaused={!isStarted} onProgress={onProgress} minutes={minutes} onEnd={onEnd} />
			</View>
			{/* Focus Container */}
			<View style={styles.focusContainer}>
				<Text style={styles.title}>Focusing On</Text>
				<Text style={styles.task}>{focusSubject}</Text>
			</View>
			{/* Progress Bar */}
			<ProgressBar
				color='#5e84e2'
				style={{ height: 10, marginTop: spacing.md }}
				progress={progress}
			/>
			{/* Changing Time */}
			<View style={styles.buttonWrapper}>
				<Timing changeTime={changeTime} />
			</View>
			{/* Button */}
			<View style={styles.buttonWrapper}>
				{!isStarted ? (
					<RoundedButton title='start' onPress={() => setIsStarted(true)} />
				) : (
					<RoundedButton title='Pause' onPress={() => setIsStarted(false)} />
				)}
			</View>
			{/* Cancellation */}
			<View style={styles.clearButton}>
				<RoundedButton title='-C-' size={50} onPress={clearSubject} />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	countDownContainer: {
		flex: 0.5,
		alignItems: 'center',
		justifyContent: 'center',
	},
	focusContainer: {
		paddingTop: spacing.xxl,
	},
	title: {
		color: colors.white,
		textAlign: 'center',
	},
	task: {
		color: colors.white,
		textAlign: 'center',
		fontWeight: 'bold',
	},
	buttonWrapper: {
		flex: 0.3,
		padding: 15,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
	},
	clearButton: {
		marginBottom: 25,
		marginLeft: 25,
	},
})
export { Timer }
