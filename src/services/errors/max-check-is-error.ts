
export class MaxCheckInsError extends Error {
    constructor () {
        super ('Max numbers of checkins reached.')
    }
}
