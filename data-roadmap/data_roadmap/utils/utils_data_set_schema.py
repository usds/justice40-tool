import glob
import os

import yamale

UTILS_DIRECTORY = os.path.dirname(os.path.realpath(__file__))
DATA_SET_DESCRIPTIONS_DIRECTORY = os.path.join(UTILS_DIRECTORY,
                                               "../data_set_descriptions")

def load_data_set_schema():
    schema = yamale.make_schema(
        # TODO: This is hacky for now. Add some safety around loading this, e.g. by
        # using `importlib_resources`. - Lucas
        os.path.join(UTILS_DIRECTORY, "../data_set_schema.yaml"))

    return schema

def validate_all_data_set_descriptions(data_set_schema):
    all_combined_file_paths = sorted(
            glob.glob(os.path.join(DATA_SET_DESCRIPTIONS_DIRECTORY, "*.yaml"))
        )

    # Validate each file
    for file_path in sorted(all_combined_file_paths):
        print(f"Validating {file_path}...")

        # Create a yamale Data object
        data_set_description = yamale.make_data(file_path)

        yamale.validate(schema=data_set_schema, data=data_set_description)


if __name__ == "__main__":
    data_set_schema = load_data_set_schema()
    validate_all_data_set_descriptions(data_set_schema=data_set_schema)