/**
 * Load an ECS Task Definition template and apply variable substitution
 */
async function createECSTaskDefinition(options, templateName, taskVars) {
    const { fs, path } = options.deps;
    const { util } = options.deps.local;

    // Load the task template
    const templatePath = path.join(__dirname, 'taskDefinitions', `${templateName}.json`);
    const rawTaskTemplate = await fs.promises.readFile(templatePath, 'utf8');

    // Perform variable substitution
    const taskTemplate = util.applyVariableSubstitution(options, taskVars, rawTaskTemplate);

    // Parse into a JSON object and return
    return JSON.parse(taskTemplate);
}


/**
 * Takes the event parameters and performs some variable substitution for the
 * SQL query based on the actual S3 items being processed.
 */
 function createECSTaskVariablesFromS3Record(options, record) {
    const { event } = options;
    const { REGION } = options.env;
    const { util } = options.deps;

    // Create substituion variables from the S3 record
    const vars = util.createSubstitutionVariablesFromS3Record(options, record, 's3');

    // Apply them to the SQL clause
    const sql = util.applyVariableSubstitution(options, vars, event.sql);

    // Return the modified event record
    return {
        ...event,
        REGION,
        sql
    };
}


/**
 * Take an array of commands and modify it with a list of pre- and post-
 * command to run in the image.  This is primarily used to move files in 
 * and out of the container ephemeral storage.
 */
 function wrapContainerCommand(options, pre, command, post) {
    // We will run all of the commands as a chained bash command, so merge everything
    // together using '&&' chaining.
    //
    // We expect the pre/post arrays to be full commands, while the command array is a list
    // on individual pieces of a single command.
    if (!pre && !post) {
        return command;
    }

    const allCommands = [];

    // Pre-commands come first
    allCommands.push(...(pre || []));

    // Turn the primart array of command line arguments into a single command line string
    allCommands.push(command.join(' '));

    // And add in the post-commands last
    allCommands.push(...(post || []));

    // Return a new array of commands with everything chained using '&&' so that execution will terminate
    // as soon as any command in the chain fails.
    return ['/bin/sh', '-c', allCommands.join(' && ')];
}

/**
 * Returns the appropriate ECS Task Definition name based on the current action
 */
function getTaskDefinitionName(options, event) {
    const { GDAL_TASK_DEFINITION, TIPPECANOE_TASK_DEFINITION } = options.env;
    const { action } = event;

    switch (action) {
        case 'gdal':
        case 'ogr2ogr':
        case 'enrichment':
                return GDAL_TASK_DEFINITION;
        case 'tippecanoe':
            return TIPPECANOE_TASK_DEFINITION;
    }

    throw new Error(`No Fargate Task Definition defined for ${action}`);
}

/**
 * Returns the appropriate ECS Container Definition name based on the current action
 */
function getFargateContainerDefinitionName(options, event) {
    const { GDAL_CONTAINER_DEFINITION, TIPPECANOE_CONTAINER_DEFINITION } = options.env;
    const { action } = event;

    switch (action) {
        case 'gdal':
        case 'ogr2ogr':
        case 'enrichment':
                return GDAL_CONTAINER_DEFINITION;
        case 'tippecanoe':
            return TIPPECANOE_CONTAINER_DEFINITION
    }

    throw new Error(`No Fargate Container Definition Name defined for ${action}`);
}

/**
 * Executes a (known) container in Fargate with the provided command line parameters.
 */
async function executeRawCommand(options, event) {
    const { ecs, logger } = options.deps;
    const { env } = options;
    const { ECS_CLUSTER, VPC_SUBNET_ID } = env;

    // If there are pre- or post- commands defined, wrap up the primary command
    const containerCommand = wrapContainerCommand(options, event.pre, event.command, event.post);

    // Get the name of the container that we are using
    const containerDefinitionName = getFargateContainerDefinitionName(options, event);

    // Create the full Task parameter object and execute
    const params = {
        taskDefinition: getTaskDefinitionName(options, event),
        cluster: ECS_CLUSTER,
        launchType: 'FARGATE',
        count: 1,
        networkConfiguration: { // Must be specified for tasks with `awsvpc` networking and awsvpc networking is required for FARGATE launch types
            awsvpcConfiguration: {
                subnets: [
                    VPC_SUBNET_ID
                ],
                assignPublicIp: 'DISABLED',
                securityGroups: []
            }
        },
        overrides: {
            containerOverrides: [
                {
                    name: containerDefinitionName,
                    command: containerCommand
                }
            ]
        }
    };

    logger.info(`Executing ECS Task...`, JSON.stringify(params, null, 2));
    return await ecs.runTask(params).promise();
}

module.exports = {
    createECSTaskDefinition,
    createECSTaskVariablesFromS3Record,
    executeRawCommand,
    getFargateContainerDefinitionName,
    getTaskDefinitionName,
    wrapContainerCommand
};