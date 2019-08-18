// ---------------- Building config constants --------------------

/**
 * Number of floors in this building.
 * 
 * @type {number}
 */
export const NUM_FLOORS = 5;

/**
 * Number of rooms per floor in this building.
 * 
 * @type {number}
 */
export const ROOMS_PER_FLOOR = 3;

// ---------------------- CSS constants --------------------------

/**
 * Width, in pixels, of each room.
 * 
 * @type {number}
 */
export const ROOM_WIDTH = 100;

/**
 * Height, in pixels, of each room.
 * 
 * @type {number}
 */
export const ROOM_HEIGHT = 100;

/**
 * Which grid column the elevator shaft should appear in.
 * 
 * @type {number}
 */
export const ELEVATOR_SHAFT_COLUMN = 2;

// ------------------------ Animation ----------------------------

/**
 * Number of pixels per animation frame the car should move.
 * 
 * @type {number}
 */
export const CAR_SPEED = 2;

/**
 * Number of pixels per animation frame the doors should move.
 * 
 * @type {number}
 */
export const DOOR_SPEED = 1;

/**
 * Time in milliseconds that the doors should stay open for.
 * 
 * @type {number}
 */
export const DISEMBARKMENT_TIME = 1000;
