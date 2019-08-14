'use strict';

function addStopToQueue(currentFloor, stops = [], newStop, intendedDirectionFromStop = null) {
    if (currentFloor === newStop) {
        // We are already at this floor
        return stops;
    }

    if (stops.includes(newStop) && intendedDirectionFromStop === null) {
        // This stop is already queued up, and there is no intended direction, so we do not
        //  need to look into moving it up in the queue, do nothing
        return stops;
    }

    if (stops.length === 0) {
        // Empty?  Just add it and we are done
        stops.push(newStop);

        return stops;
    }

    // Add the current floor to the beginning of the array of stops, it is much
    //  easier to process this way
    stops.unshift(currentFloor);

    // We will start at what is essentially the first stop
    let i = 1;

    while (i < stops.length) {
        let direction = getDirectionFromStopToStop(stops[i - 1], stops[i]);

        if (intendedDirectionFromStop !== null && stops[i] === newStop) {
            // In the case we have an intended direction, we might be trying to queue the stop
            //  up for earlier in the queue, so we need to check and bail if we've arrived at the
            //  index that the stop is queued up at
            return stops;
        }

        if (
            (intendedDirectionFromStop === null || intendedDirectionFromStop === direction) &&
            (
                (direction === 'up' && stops[i - 1] < newStop && newStop < stops[i]) ||
                (direction === 'down' && stops[i - 1] > newStop && newStop > stops[i])
            )
        ) {
            break;
        }

        // Is this a "turning point"?
        if (
            i + 1 < stops.length && 
            getDirectionFromStopToStop(stops[i], stops[i + 1]) !== direction
        ) {
            if (
                (direction === 'up' && newStop > stops[i]) ||
                (direction === 'down' && newStop < stops[i])
            ) {
                i++;
                break;
            }
        }

        i++;
    }

    // Add the new stop wherever i ended up at
    stops.splice(i, 0, newStop);

    if (intendedDirectionFromStop !== null && stops.lastIndexOf(newStop) > i) {
        // In the case we have an intended direction, we have queued the stop up for earlier 
        //  in the queue, so now we need to remove the later instance
        stops.splice(
            stops.lastIndexOf(newStop),
            1
        );
    }

    // Remove the current floor from the beginning of the queue
    stops.shift();

    //console.log('addStopToQueue', stops);

    return stops;
}

function getDirectionFromStopToStop(stop1, stop2) {
    let direction = 'up';
    if (stop2 - stop1 < 0) {
        direction = 'down';
    }

    return direction;
}

module.exports = {
    addStopToQueue: addStopToQueue,
};
