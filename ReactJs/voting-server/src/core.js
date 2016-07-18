/*jshint esversion: 6 */
import {List, Map} from 'immutable';

/**
 * https://facebook.github.io/immutable-js/docs/#/Map/set
 */
export function setEntries(state, entries) {
    return state.set('entries', List(entries));
}

/**
 * https://facebook.github.io/immutable-js/docs/#/Map/get
 * https://facebook.github.io/immutable-js/docs/#/Map/merge
 */
export function next(state) {
    const entries = state.get('entries');
    return state.merge({
        vote: Map({pair: entries.take(2)}),
        entries: entries.skip(2)
    });
}

/**
* https://facebook.github.io/immutable-js/docs/#/Map/updateIn
*/
export function vote(state, entry) {
    return state.updateIn(
        ['vote', 'tally', entry],
        0,
        tally => tally + 1
    )
}
