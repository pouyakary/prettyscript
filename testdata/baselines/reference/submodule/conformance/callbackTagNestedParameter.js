//// [tests/cases/conformance/jsdoc/callbackTagNestedParameter.ts] ////

//// [cb_nested.js]
/**
 * @callback WorksWithPeopleCallback
 * @param {Object} person
 * @param {string} person.name
 * @param {number} [person.age]
 * @returns {void}
 */

/**
 * For each person, calls your callback.
 * @param {WorksWithPeopleCallback} callback
 * @returns {void}
 */
function eachPerson(callback) {
    callback({ name: "Empty" });
}




//// [cb_nested.d.ts]
export type WorksWithPeopleCallback = (person: {
    name: string;
    age?: number;
}) => void;
