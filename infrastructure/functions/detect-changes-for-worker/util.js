/**
 * Create a luxon object representing a cutoff based on the `age`
 * passed in from the event.
 * 
 * A null or zero value for age returns the current time.
 */
function getTimestampCutoff(options) {
    const { event } = options;
    const { DateTime } = options.deps;
    
    if (!event.age) {
        return DateTime.fromMillis(0);
    }

    return DateTime.now().minus({ seconds: event.age });
}

/**
 * Create a set of substitution variables from an S3 record
 */
function createSubstitutionVariablesFromS3Record(options, record, prefix) {
    const { path } = options.deps;

    const fullKey = record.Key;
    const baseKey = path.basename(fullKey);
    const baseKeyExt = path.extname(baseKey);
    const baseKeyNoExt = path.basename(baseKey, baseKeyExt);

    // Define all of the valid substitution variables
    const vars = {};
    vars[`${prefix}.Key:full`] = fullKey;
    vars[`${prefix}.Key`] = baseKey;
    vars[`${prefix}.Key:base`] = baseKeyNoExt;
    vars[`${prefix}.Key:ext`] = baseKeyExt;

    return vars;
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

/**
 * Generaliztion of the previsou function.
 */
function applyVariableSubstitutionToArray(options, vars, inputs) {
    return (inputs || []).map(input => applyVariableSubstitution(options, vars, input));
}

module.exports = {
    applyVariableSubstitution,
    applyVariableSubstitutionToArray,
    createSubstitutionVariablesFromS3Record,
    getTimestampCutoff
};