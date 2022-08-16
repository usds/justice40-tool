# pylint: disable=protected-access
from unittest import mock
import pathlib
from data_pipeline.etl.base import ValidGeoLevel

from data_pipeline.etl.sources.us_army_fuds.etl import (
    USArmyFUDS,
)
from data_pipeline.tests.sources.example.test_etl import TestETL
from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)


def _fake_add_tracts_for_geometries(df):
    """The actual geojoin is too slow for tests. Use precomputed results."""
    lookups = {
        (-121.39361572299998, 38.87463378900003): "06061021322",
        (-121.40020751999998, 38.897583008000026): "06061021322",
        (-121.40020751999998, 38.75158691400003): "06061021322",
        (-157.84301757799997, 21.53619384800004): "15003010201",
        (-157.85168456999997, 21.553405762000068): "15003010201",
        (-157.90679931599996, 21.554199219000054): "15003010201",
        (-159.52191162099996, 21.976623535000044): "15007040700",
        (-159.52996826199998, 21.93762207000003): "15007040700",
        (-159.52111816399997, 21.922607422000056): "15007040700",
        (-156.14270019499997, 20.840393066000047): "15009030100",
        (-155.85968017599998, 20.26519775400004): "15001021800",
        (-155.73327636699997, 20.166809082000043): "15001021800",
        (-155.89270019499997, 20.23522949200003): "15001021800",
        (-156.26019287099996, 20.899414062000062): "15009030201",
        (-156.22076415999996, 20.91241455100004): "15009030201",
        (-156.20739746099997, 20.890991211000028): "15009030201",
        (-159.46496581999997, 21.90460205100004): "15007040603",
        (-159.46441650399998, 21.905212402000075): "15007040603",
        (-154.82519531299997, 19.49182128900003): "15001021101",
        (-121.06768798799999, 36.61480712900004): "06069000802",
        (-117.391601563, 36.33343505900007): "06027000800",
        (-117.85546874999994, 36.46960449200003): "06027000800",
        (-117.23529052699996, 36.387634277000075): "06027000800",
        (-118.15270996099997, 36.725219727000024): "06027000800",
        (-118.13891601599994, 36.56683349600007): "06027000800",
        (-117.311096191, 36.783386230000076): "06027000800",
        (-118.00030517599998, 36.283813477000024): "06027000800",
        (-116.86248779299996, 36.46124267600004): "06027000800",
        (-117.16418456999997, 36.60681152300003): "06027000800",
        (-117.06939697299998, 36.158386230000076): "06027000800",
        (-117.873596191, 36.487609863000046): "06027000800",
        (-116.82971191399997, 36.283386230000076): "06027000800",
        (-117.21667480499997, 35.95843505900007): "06027000800",
        (-118.04998779299996, 36.59478759800004): "06027000800",
        (-117.03576660199997, 36.27801513700007): "06027000800",
        (-116.10028076199995, 35.83380127000004): "06027000800",
        (-117.86499023399995, 36.14422607400007): "06027000800",
        (-155.10320912843935, 19.497857096442765): "15001021010",
        (-155.91378674587037, 19.516632121497878): "15001021402",
        (-156.3306524489697, 20.825377142028497): "15009030402",
        (-156.5429023670438, 20.917074254751412): "15009030800",
        (-159.48416820625405, 21.907546119100093): "15007040604",
    }
    df["GEOID10_TRACT"] = df.geometry.apply(
        lambda point: lookups[(point.x, point.y)]
    )
    return df


class TestUSArmyFUDSETL(TestETL):
    """Tests the FUDS ETL.

    This uses pytest-snapshot.
    To update individual snapshots: $ poetry run pytest
            data_pipeline/tests/sources/us_army_fuds/test_etl.py::TestClassNameETL::<testname>
            --snapshot-update
    """

    _ETL_CLASS = USArmyFUDS

    _SAMPLE_DATA_PATH = pathlib.Path(__file__).parents[0] / "data"
    _SAMPLE_DATA_FILE_NAME = "fuds.geojson"
    _SAMPLE_DATA_ZIP_FILE_NAME = "fuds.geojson"
    _EXTRACT_TMP_FOLDER_NAME = "USArmyFUDS"

    def setup_method(self, _method, filename=__file__):
        """Invoke `setup_method` from Parent, but using the current file name.

        This code can be copied identically between all child classes.
        """
        super().setup_method(_method=_method, filename=filename)

    def test_init(self, mock_etl, mock_paths):
        """Tests that the mock NationalRiskIndexETL class instance was
        initiliazed correctly.

        Validates the following conditions:
        - self.DATA_PATH points to the "data" folder in the temp directory
        - self.TMP_PATH points to the "data/tmp" folder in the temp directory
        - self.INPUT_PATH points to the correct path in the temp directory
        - self.OUTPUT_PATH points to the correct path in the temp directory
        """
        # setup
        etl = self._ETL_CLASS()
        # validation
        assert etl.GEOID_FIELD_NAME == "GEOID10"
        assert etl.GEOID_TRACT_FIELD_NAME == "GEOID10_TRACT"
        assert etl.NAME == "us_army_fuds"
        assert etl.GEO_LEVEL == ValidGeoLevel.CENSUS_TRACT
        assert etl.COLUMNS_TO_KEEP == [
            etl.GEOID_TRACT_FIELD_NAME,
            etl.ELIGIBLE_FUDS_COUNT_FIELD_NAME,
            etl.INELIGIBLE_FUDS_COUNT_FIELD_NAME,
            etl.ELIGIBLE_FUDS_BINARY_FIELD_NAME,
        ]

    def test_get_output_file_path(self, mock_etl, mock_paths):
        """Tests the right file name is returned."""
        etl = self._ETL_CLASS()
        data_path, tmp_path = mock_paths

        output_file_path = etl._get_output_file_path()
        expected_output_file_path = (
            data_path / "dataset" / self._ETL_CLASS.NAME / "usa.csv"
        )
        assert output_file_path == expected_output_file_path

    def test_fixtures_contain_shared_tract_ids_base(self, mock_etl, mock_paths):
        with mock.patch(
            "data_pipeline.etl.sources.us_army_fuds.etl.add_tracts_for_geometries",
            new=_fake_add_tracts_for_geometries,
        ):
            return super().test_fixtures_contain_shared_tract_ids_base(
                mock_etl, mock_paths
            )

    def test_transform_base(self, snapshot, mock_etl, mock_paths):
        with mock.patch(
            "data_pipeline.etl.sources.us_army_fuds.etl.add_tracts_for_geometries",
            new=_fake_add_tracts_for_geometries,
        ):
            super().test_transform_base(
                snapshot=snapshot, mock_etl=mock_etl, mock_paths=mock_paths
            )

    def test_transform_sets_output_df_base(self, mock_etl, mock_paths):
        with mock.patch(
            "data_pipeline.etl.sources.us_army_fuds.etl.add_tracts_for_geometries",
            new=_fake_add_tracts_for_geometries,
        ):
            super().test_transform_sets_output_df_base(
                mock_etl=mock_etl, mock_paths=mock_paths
            )

    def test_validate_base(self, mock_etl, mock_paths):
        with mock.patch(
            "data_pipeline.etl.sources.us_army_fuds.etl.add_tracts_for_geometries",
            new=_fake_add_tracts_for_geometries,
        ):
            super().test_validate_base(mock_etl=mock_etl, mock_paths=mock_paths)

    def test_full_etl_base(self, mock_etl, mock_paths):
        with mock.patch(
            "data_pipeline.etl.sources.us_army_fuds.etl.add_tracts_for_geometries",
            new=_fake_add_tracts_for_geometries,
        ):
            return super().test_full_etl_base(mock_etl, mock_paths)

    def test_get_data_frame_base(self, mock_etl, mock_paths):
        with mock.patch(
            "data_pipeline.etl.sources.us_army_fuds.etl.add_tracts_for_geometries",
            new=_fake_add_tracts_for_geometries,
        ):
            return super().test_get_data_frame_base(mock_etl, mock_paths)

    def test_tracts_without_fuds_not_in_results(self, mock_etl, mock_paths):
        with mock.patch(
            "data_pipeline.etl.sources.us_army_fuds.etl.add_tracts_for_geometries",
            new=_fake_add_tracts_for_geometries,
        ):
            etl = self._setup_etl_instance_and_run_extract(
                mock_etl=mock_etl, mock_paths=mock_paths
            )
            etl.transform()
            etl.validate()
            etl.load()
            df = etl.get_data_frame()
            assert len(df[etl.GEOID_TRACT_FIELD_NAME]) == len(
                self._FIXTURES_SHARED_TRACT_IDS
            )
