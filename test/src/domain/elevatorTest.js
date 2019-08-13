'use strict';

const chai = require('chai');
const expect = chai.expect;

const elevator = require('../../../src/domain/elevator');

describe('elevator', () => {
    it ('it will add a new stop to an empty stop queue', function () {
        let result = elevator.addStopToQueue(1, [], 2);

        expect(result).to.eql([2]);
    });

    it ('it will not add a new stop if the queue already contains the stop', function () {
        let result = elevator.addStopToQueue(1, [2], 2);

        expect(result).to.eql([2]);
    });

    it ('it will not add a new stop if the car is at that floor', function () {
        let result = elevator.addStopToQueue(1, [], 1);

        expect(result).to.eql([]);
    });

    it ('it will add a stop to the beginning of the queue if going that direction', function () {
        let result = elevator.addStopToQueue(1, [4, 5], 2);

        expect(result).to.eql([2, 4, 5]);
    });

    it ('it will add a stop to the end of the queue', function () {
        let result = elevator.addStopToQueue(1, [3, 4], 5);

        expect(result).to.eql([3, 4, 5]);
    });

    it ('it will add another stop before the turnaround going up', function () {
        let result = elevator.addStopToQueue(1, [3, 4, 2], 5);

        expect(result).to.eql([3, 4, 5, 2]);
    });

    it ('it will add another stop before the turnaround going down', function () {
        let result = elevator.addStopToQueue(6, [4, 3, 5], 1);

        expect(result).to.eql([4, 3, 1, 5]);
    });
});
