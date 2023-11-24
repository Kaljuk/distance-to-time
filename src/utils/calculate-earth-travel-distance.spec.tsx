import dayjs from 'dayjs';
import calculateEarthTravelDistance, { earthOrbitalVelocityKmPerMs } from './calculate-earth-travel-distance';

describe('calculateEarthTravelDistance', () => {
    it('calculates the correct distance for a given number of days', () => {
			const earthSunOrbitDistanceInADay = earthOrbitalVelocityKmPerMs * 1000 * 60 * 60 * 24;

			const startDate = dayjs();
			const endDate = startDate.add(1, 'day'); // One day later
			const distance = calculateEarthTravelDistance({ startDate, endDate });
			expect(distance).toBeCloseTo(earthSunOrbitDistanceInADay, 0); // Use toBeCloseTo for floating point comparison
    });

    it('Add 1 year when endDate if before startDate', () => {
        const startDate = dayjs();
				const endDate = startDate.add(-1, 'year').add(1, 'day');
				const distance = calculateEarthTravelDistance({ startDate, endDate });
				expect(distance).toBeCloseTo(2573482.606308189, 0); // Use toBeCloseTo for floating point comparison
    });
});