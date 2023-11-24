import dayjs, { Dayjs, UnitType } from "dayjs";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useInterval } from "usehooks-ts";
import calculateEarthTravelDistance from "../utils/calculate-earth-travel-distance";



const MainScreen = () => {
	const [currentTime, setCurrentTime] = useState<Dayjs>(dayjs());
	const [date, setDate] = useState<Dayjs>(dayjs().add(1, "day"));

	const handleDateChange = useCallback((value?: number, dateSection?: UnitType) => {
		if (value === undefined || !dateSection) return;
		setDate((previousDate) => {
			const newDate = previousDate.set(dateSection, value).set('year', currentTime.year());
			// Check if is in the future
			if (newDate.isBefore(currentTime)) {
				return newDate.add(1, "year");
			}
			return newDate;
		});
	}, [currentTime])

	useInterval(
		() => setCurrentTime(dayjs()),
		1000
	)

	const monthOptions = useMemo(() => Array(12).fill(1).map((_, index) => ({
		value: index,
		label: dayjs().month(index).format("MMMM")
	})), [])

	const distanceTraveledKm = useMemo(() => calculateEarthTravelDistance({
		startDate: currentTime,
		endDate: date,
		precise: true
	}), [currentTime, date])

	return (
		<div className="h-full w-full bg-gray-700 grid grid-flow-row-reverse grid-rows-auto-min sm:grid-rows-1 sm:grid-cols-2">
			<div className="w-full h-full bg-space-purple-600 p-4 z-30 flex flex-col order-2 sm:order-1">
				<div>
					<h1 className="text-lg sm:text-2xl text-white">
						Welcome to measuring the distance to your birthday!
					</h1>
				</div>
				<div className="flex grow flex-col justify-center">
					<div>
						<span className="text-base sm:text-xl font-semibold text-white">
							Set your birth date
						</span>
					</div>
					<div className="grid grid-cols-2 gap-4 text-xl sm:text-3xl">
						{/* Day */}
						<div className="flex flex-col w-full">
							<span className="text-white font-semibold">
								Day
							</span>
							<input
								type="number"
								min={1}
								max={date?.daysInMonth?.() ?? 30}
								className="w-full h-12 bg-gray-700 text-white border border-white rounded-md"
								value={date?.date() ?? 1}
								onChange={(event) => {
									handleDateChange(Number(event.target.value), "date");
								}}
							/>
						</div>
						{/* Month */}
						<div className="flex flex-col w-full">
							<span className="text-white font-semibold">
								Month
							</span>
							<select
								className="w-full h-12 bg-gray-700 text-white border border-white rounded-md"
								value={date?.month() ?? 0}
								onChange={(event) => {
									handleDateChange(Number(event.target.value), "month");
								}}
							>
								{monthOptions.map((month) => (
									<option key={['selectable-month', month.value].join('-')} value={month.value}>
										{month.label}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>
			</div>
			<div className="w-full h-full bg-blue-950 z-10 relative flex flex-col order-1 sm:order-2 overflow-hidden">
				{/* BG IMAGE */}
				<img src="/img/result_background.jpg.webp" alt="background" className="absolute left-0 top-0 w-full h-full object-cover z-10" />
				{/* RESULTS CONTENT */}
				<div className="z-20 h-full w-full grid place-items-center">
					<div className="w-full h-full flex flex-col justify-center items-center">
						<span className="text-white text-4xl font-bold w-full">
							<Countdown targetNumber={distanceTraveledKm} />
						</span>
						<span id="Units" className="text-white text-2xl font-semibold">
							Kilometers
						</span>
						<span className="text-white text-xl font-semibold py-4">
							Until {date.format("DD. MMMM YYYY")}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}

type CountdownProps = {
	targetNumber: number;
};
const Countdown: FC<CountdownProps> = ({ targetNumber }) => {
	const [currentNumber, setCurrentNumber] = useState(10000);

	useEffect(() => {
			// Reset the countdown when the target number changes
			setCurrentNumber(targetNumber);

			// Interval for smooth counting
			const interval = setInterval(() => {
					setCurrentNumber((prevNumber) => {
							// Calculate the new number with 5 decimal places
							const newNumber = Math.max(prevNumber - 0.0001, 0);

							if (newNumber > 0) {
									return newNumber; // Decrease the number
							} else {
									clearInterval(interval); // Stop the countdown
									return newNumber; // Ensure it doesn't go below zero
							}
					});
			}, 1000 / 60); // 60 updates per second for smoothness

			return () => clearInterval(interval);
	}, [targetNumber]);

	return (
		<div className="flex items-center justify-center h-16 text-3xl border border-gray-700 shadow-outline shadow-green-400">
			{currentNumber.toFixed(4).split('').map((oneDigit) => (
				<span className={oneDigit === '.' ? '' : "w-7 flex items-center justify-center"}>
					{oneDigit}
				</span>
			))}
		</div>
	);
};

export default MainScreen;