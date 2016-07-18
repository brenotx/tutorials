/*jshint esversion: 6 */
import {List, Map} from 'immutable';

/**
 * https://facebook.github.io/immutable-js/docs/#/Map/set
 */
export function setEntries(state, entries) {
    return state.set('entries', List(entries));
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

/**
 * https://facebook.github.io/immutable-js/docs/#/Map/get
 * https://facebook.github.io/immutable-js/docs/#/Map/getIn
 */
function getWinners(vote) {
    if (!vote) {
        return [];
    }

    const [a, b] = vote.get('pair');
    const aVotes = vote.getIn(['tally', a], 0);
    const bVotes = vote.getIn(['tally', b], 0);

    if (aVotes > bVotes) {
        return [a];
    } else if (aVotes < bVotes) {
        return [b];
    } else {
        return [a, b];
    }
}

/**
 * https://facebook.github.io/immutable-js/docs/#/Map/get
 * https://facebook.github.io/immutable-js/docs/#/Map/concat
 * https://facebook.github.io/immutable-js/docs/#/Map/delete
 * https://facebook.github.io/immutable-js/docs/#/Map/set
 * https://facebook.github.io/immutable-js/docs/#/Map/first
 * https://facebook.github.io/immutable-js/docs/#/Map/size
 * https://facebook.github.io/immutable-js/docs/#/Map/merge
 * https://facebook.github.io/immutable-js/docs/#/Map/take
 * https://facebook.github.io/immutable-js/docs/#/Map/skip
 */
export function next(state) {
    const entries = state.get('entries').concat(getWinners(state.get('vote')));

    if (entries.size === 1) {
        return state.delete('vote')
                    .delete('entries')
                    .set('winner', entries.first());
    } else {
        return state.merge({
            vote: Map({pair: entries.take(2)}),
            entries: entries.skip(2)
        });
    }
}
