export interface Coordinate {
    latitude: number;
    longitude: number;
}

export function getDistanceBetweenCoordinates(
    from: Coordinate,
    to: Coordinate
): number {
    const R = 6371; // Raio da Terra em quilômetros
    const dLat = deg2rad(to.latitude - from.latitude);
    const dLon = deg2rad(to.longitude - from.longitude);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(from.latitude)) * Math.cos(deg2rad(to.latitude)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distância em quilômetros
    return distance;
}

function deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
}

