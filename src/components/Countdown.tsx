/** @format */

import React, { FC, useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../utils/colors'
import { sizes, spacing } from '../utils/sizes'

interface Props {
	minutes: number
	isPaused?: boolean
	onProgress: (progress: number) => void
	onEnd: () => void
}

const minutesToMilliSeconds = (min: number): number => min * 60 * 1000

const formatTime = (time: number): string | number => (time < 10 ? `0${time}` : time)

const Countdown: FC<Props> = ({ minutes, isPaused, onProgress, onEnd }) => {
	// Use State Hook and Interval
	const [milliseconds, setMilliseconds] = useState<number>(minutesToMilliSeconds(minutes))
	const interval = useRef(NaN)
	const countDown = () => {
		setMilliseconds((time) => {
			if (time === 0) {
				// Do a lot here
				clearInterval(interval.current)
				return time
			}
			const timeLeft = time - 1000
			// Reporting Progress in Another UseEffect Hook
			return timeLeft
		})
	}
	// UseEffect for updating every single time we update
	useEffect(() => {
		onProgress(milliseconds / minutesToMilliSeconds(minutes))
		if (milliseconds === 0) {
			onEnd()
		}
	}, [milliseconds])
	useEffect(() => {
		setMilliseconds(minutesToMilliSeconds(minutes))
	}, [minutes])
	useEffect(() => {
		if (isPaused || interval.current === 0) {
			return clearInterval(interval.current)
		}
		interval.current = setInterval(countDown, 1000)
		return () => clearInterval(interval.current)
	}, [isPaused])

	// Time Variables
	const minutesInTime = Math.floor(milliseconds / 1000 / 60) % 60
	const secondsInTime = Math.floor(milliseconds / 1000) % 60

	return (
		<View style={styles.container}>
			<Text style={styles.text}>
				{formatTime(minutesInTime)}:{formatTime(secondsInTime)}
			</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {},
	text: {
		color: colors.white,
		padding: spacing.lg,
		fontWeight: 'bold',
		fontSize: sizes.xxxl,
		backgroundColor: 'rgba(94,132,226,0.3)',
	},
})
export { Countdown }
