import unittest
from unittest import mock

import yamale
from data_roadmap.utils.utils_data_set_description_schema import (
    load_data_set_description_schema,
    load_data_set_description_field_descriptions,
    validate_descriptions_for_schema,
)


class UtilsDataSetDescriptionSchema(unittest.TestCase):
    @mock.patch("yamale.make_schema")
    def test_load_data_set_description_schema(self, make_schema_mock):
        load_data_set_description_schema(file_path="mock.yaml")

        make_schema_mock.assert_called_once_with(path="mock.yaml")

    @mock.patch("yaml.safe_load")
    def test_load_data_set_description_field_descriptions(self, yaml_safe_load_mock):
        # Note: this isn't a great test, we could mock the actual YAML to
        # make it better. - Lucas
        mock_dict = {
            "name": "The name of the thing.",
            "age": "The age of the thing.",
            "height": "The height of the thing.",
            "awesome": "The awesome of the thing.",
            "field": "The field of the thing.",
        }

        yaml_safe_load_mock.return_value = mock_dict

        field_descriptions = load_data_set_description_field_descriptions()

        yaml_safe_load_mock.assert_called_once()

        self.assertDictEqual(field_descriptions, mock_dict)

    def test_validate_descriptions_for_schema(self):

        # Test when all descriptions are present.
        field_descriptions = {
            "name": "The name of the thing.",
            "age": "The age of the thing.",
            "height": "The height of the thing.",
            "awesome": "The awesome of the thing.",
            "field": "The field of the thing.",
        }

        schema = yamale.make_schema(
            content="""
name: str()
age: int(max=200)
height: num()
awesome: bool()
field: enum('option 1', 'option 2')
"""
        )

        # Should pass.
        validate_descriptions_for_schema(
            schema=schema, field_descriptions=field_descriptions
        )

        field_descriptions_missing_one = {
            "name": "The name of the thing.",
            "age": "The age of the thing.",
            "height": "The height of the thing.",
            "awesome": "The awesome of the thing.",
        }

        # Should fail because of the missing field description.
        with self.assertRaises(ValueError) as context_manager:
            validate_descriptions_for_schema(
                schema=schema, field_descriptions=field_descriptions_missing_one
            )

        # Using `assertIn` because the file path is returned in the error
        # message, and it varies based on environment.
        self.assertIn(
            "Field `field` does not have a description. Please add one to file",
            str(context_manager.exception),
        )

        field_descriptions_extra_one = {
            "name": "The name of the thing.",
            "age": "The age of the thing.",
            "height": "The height of the thing.",
            "awesome": "The awesome of the thing.",
            "field": "The field of the thing.",
            "extra": "Extra description.",
        }

        # Should fail because of the extra field description.
        with self.assertRaises(ValueError) as context_manager:
            validate_descriptions_for_schema(
                schema=schema, field_descriptions=field_descriptions_extra_one
            )

        # Using `assertIn` because the file path is returned in the error
        # message, and it varies based on environment.
        self.assertEquals(
            "Field `extra` has a description but is not in the schema.",
            str(context_manager.exception),
        )
