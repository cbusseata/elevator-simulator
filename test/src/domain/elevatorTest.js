'use strict';

const chai = require('chai');
const expect = chai.expect;

const elevator = require('../../../src/domain/elevator');

describe('elevator', () => {
    it ('will add a new stop to an empty stop queue', function () {
        let result = elevator.addStopToQueue(1, 'idle', [], 2);

        expect(result).to.eql([2]);
    });

    it ('will not add a new stop if the queue already contains the stop', function () {
        let result = elevator.addStopToQueue(1, 'idle', [2], 2);

        expect(result).to.eql([2]);
    });

    it ('will not add a new stop if the car is at that floor', function () {
        let result = elevator.addStopToQueue(1, 'idle', [], 1);

        expect(result).to.eql([]);
    });

    it ('will add a stop to the beginning of the queue if going that direction', function () {
        let result = elevator.addStopToQueue(1, 'idle', [4, 5], 2);

        expect(result).to.eql([2, 4, 5]);
    });

    it ('will add a stop to the end of the queue', function () {
        let result = elevator.addStopToQueue(1, 'idle', [3, 4], 5);

        expect(result).to.eql([3, 4, 5]);
    });

    it ('will add another stop before the turnaround going up', function () {
        let result = elevator.addStopToQueue(1, 'idle', [3, 4, 2], 5);

        expect(result).to.eql([3, 4, 5, 2]);
    });

    it ('will add another stop before the turnaround going down', function () {
        let result = elevator.addStopToQueue(6, 'idle', [4, 3, 5], 1);

        expect(result).to.eql([4, 3, 1, 5]);
    });

    it ('will move a stop earlier in the queue if intended direction matches the direction of the car', function () {
        let result = elevator.addStopToQueue(1, 'idle', [3, 5, 4], 4, 'up');

        expect(result).to.eql([3, 4, 5]);
    });

    it ('will arrange stops earlier in the queue if intended direction matches the direction of the car', function () {
        let result = elevator.addStopToQueue(1, 'idle', [], 3);
        result = elevator.addStopToQueue(1, 'idle', result, 5);
        result = elevator.addStopToQueue(1, 'idle', result, 4, 'down');
        result = elevator.addStopToQueue(1, 'idle', result, 4, 'up');

        expect(result).to.eql([3, 4, 5]);
    });

    it ('will add a stop if the car is moving and the "current floor" is equal to the new stop', function () {
        let result = elevator.addStopToQueue(1, 'moving', [2], 1);

        expect(result).to.eql([2, 1]);
    });

    it ('will not add the same stop twice if the car is moving and the stops have different intended directions', function () {
        let result = elevator.addStopToQueue(1, 'idle', [], 2, 'down');
        result = elevator.addStopToQueue(1, 'moving', [2], 2, 'up');

        expect(result).to.eql([2]);
    });
});
