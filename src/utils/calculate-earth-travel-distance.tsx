import dayjs, { Dayjs } from "dayjs";

// Constants
const orbitalPeriodDays: number = 365.25;
const averageDistanceToSunKm: number = 149600000; // 1 Astronomical Unit in kilometers
const circumferenceKm: number = 2 * Math.PI * averageDistanceToSunKm;

/**
 * @description The average velocity of the earth in its orbit around the sun in kilometers per millisecond
 */
export const earthOrbitalVelocityKmPerMs: number = circumferenceKm / (orbitalPeriodDays * 24 * 60 * 60 * 1000);

type CalculateEarthTravelDistanceProps = {
	startDate?: Dayjs,
	endDate?: Dayjs,
	/** @description Should be more precise */
	precise?: boolean
}

/**
 * @description Calculates the distance between two dates in kilometers
 * @returns {number} The distance between the two dates in kilometers
 */
type CalculateEarthTravelDistance = (
	props: CalculateEarthTravelDistanceProps
) => number;

const calculateEarthTravelDistance: CalculateEarthTravelDistance = ({
	startDate = dayjs(),
	endDate
}) => {
	if (!endDate) return -1;
	// If end date is before start date, add 1 year
	const futureEndDate = endDate.isBefore(startDate) ? endDate.add(1, "year") : endDate;
	const timeDiff: number = futureEndDate.diff(startDate, "ms");
	return timeDiff * earthOrbitalVelocityKmPerMs
}

export default calculateEarthTravelDistance;