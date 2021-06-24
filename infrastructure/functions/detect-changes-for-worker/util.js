/**
 * Create a luxon object representing a cutoff based on the `age`
 * passed int from the event.
 */
function getTimestampCutoff(options) {
    const { event } = options;
    const { DateTime } = options.deps;

    return DateTime.now().minus({ seconds: event.age });
}

/**
 * Given a collection of key/value input variables, replace
 * occurences of ${key} in the input with the corresponding
 * values
 */
function applyVariableSubstitution(options, vars, input) {
    let result = input;
    for (const [key, value] of Object.entries(vars)) {
        const token = '${' + key + '}';

        // Use the split-join-method because the tokens have special characters which
        // confuses the Regular Expression constructor
        //  @see https://stackoverflow.com/a/17606289/332406
        result = result.split(token).join(value);
    }

    return result;
}

module.exports = {
    applyVariableSubstitution,
    getTimestampCutoff
};