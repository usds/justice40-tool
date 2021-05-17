import unittest
from unittest import mock

import yamale
from data_roadmap.utils.utils_data_set_description_schema import (
    load_data_set_description_schema,
    load_data_set_description_field_descriptions,
    validate_descriptions_for_schema,
    validate_all_data_set_descriptions,
    write_data_set_description_template_file,
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

    def test_validate_all_data_set_descriptions(self):
        # Setup a few examples of `yamale` data *before* we mock the `make_data`
        # function.
        valid_data = yamale.make_data(
            content="""
        name: Bill
        age: 26
        height: 6.2
        awesome: True
        field: option 1
        """
        )

        invalid_data_1 = yamale.make_data(
            content="""
                name: Bill
                age: asdf
                height: 6.2
                awesome: asdf
                field: option 1
                """
        )

        invalid_data_2 = yamale.make_data(
            content="""
                age: 26
                height: 6.2
                awesome: True
                field: option 1
                """
        )

        # Mock `make_data`.
        with mock.patch.object(
            yamale, "make_data", return_value=None
        ) as yamale_make_data_mock:
            schema = yamale.make_schema(
                content="""
            name: str()
            age: int(max=200)
            height: num()
            awesome: bool()
            field: enum('option 1', 'option 2')
            """
            )

            # Make the `make_data` method return valid data.
            yamale_make_data_mock.return_value = valid_data

            # Should pass.
            validate_all_data_set_descriptions(data_set_description_schema=schema)

            # Make some of the data invalid.
            yamale_make_data_mock.return_value = invalid_data_1

            # Should fail because of the invalid field values.
            with self.assertRaises(yamale.YamaleError) as context_manager:
                validate_all_data_set_descriptions(data_set_description_schema=schema)

            self.assertEqual(
                str(context_manager.exception),
                """Error validating data
	age: 'asdf' is not a int.
	awesome: 'asdf' is not a bool.""",
            )

            # Make some of the data missing.
            yamale_make_data_mock.return_value = invalid_data_2

            # Should fail because of the missing fields.
            with self.assertRaises(yamale.YamaleError) as context_manager:
                validate_all_data_set_descriptions(data_set_description_schema=schema)

            self.assertEqual(
                str(context_manager.exception),
                """Error validating data
	name: Required field missing""",
            )

    @mock.patch("builtins.open", new_callable=mock.mock_open)
    def test_write_data_set_description_template_file(self, builtins_writelines_mock):
        schema = yamale.make_schema(
            content="""
                    name: str()
                    age: int(max=200)
                    height: num()
                    awesome: bool()
                    field: enum('option 1', 'option 2')
                    """
        )

        data_set_description_field_descriptions = {
            "name": "The name of the thing.",
            "age": "The age of the thing.",
            "height": "The height of the thing.",
            "awesome": "The awesome of the thing.",
            "field": "The field of the thing.",
        }

        write_data_set_description_template_file(
            data_set_description_schema=schema,
            data_set_description_field_descriptions=data_set_description_field_descriptions,
            template_file_path="mock_template.yaml",
        )

        call_to_writelines = builtins_writelines_mock.mock_calls[2][1][0]

        self.assertListEqual(
            call_to_writelines,
            [
                "# Note: This template is automatically generated by the function\n"
                "# `write_data_set_description_template_file` from the schema\n"
                "# and field descriptions files. Do not manually edit this file.\n\n",
                "name: \n",
                "# Description: The name of the thing.\n",
                "# Required field: True\n",
                "# Field type: str\n",
                "\n",
                "age: \n",
                "# Description: The age of the thing.\n",
                "# Required field: True\n",
                "# Field type: int\n",
                "\n",
                "height: \n",
                "# Description: The height of the thing.\n",
                "# Required field: True\n",
                "# Field type: num\n",
                "\n",
                "awesome: \n",
                "# Description: The awesome of the thing.\n",
                "# Required field: True\n",
                "# Field type: bool\n",
                "\n",
                "field: \n",
                "# Description: The field of the thing.\n",
                "# Required field: True\n",
                "# Field type: enum\n",
                "# Valid choices are one of the following: ('option 1', 'option 2')\n",
                "\n",
            ],
        )
