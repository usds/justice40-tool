# pylint: disable=protected-access
from unittest import mock
import pathlib
from data_pipeline.etl.base import ValidGeoLevel

from data_pipeline.etl.sources.eamlis.etl import (
    AbandonedMineETL,
)
from data_pipeline.tests.sources.example.test_etl import TestETL
from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)


def _fake_add_tracts_for_geometries(df):
    """The actual geojoin is too slow for tests. Use precomputed results."""
    lookups = {
        (-117.1177285688382, 36.25161281807095): "06027000800",
        (-121.0070599015156, 36.5498780497345): "06069000802",
        (-121.40564726784282, 38.84602113669345): "06061021322",
        (-155.10321769858746, 19.49784370888389): "15001021010",
        (-154.89548634140738, 19.446650238354696): "15001021101",
        (-159.43665201302525, 21.9044122609682): "15007040603",
        (-159.52362041178708, 21.94208315793464): "15007040700",
        (-156.14177664396527, 20.72796381691298): "15009030100",
        (-156.2497797752935, 20.86486713282688): "15009030201",
        (-155.91378867633992, 19.516629328900667): "15001021402",
        (-155.81110884967674, 20.164406070883054): "15001021800",
        (-156.33064622489087, 20.825369670478302): "15009030402",
        (-156.54289869319305, 20.9170439162332): "15009030800",
        (-157.89225964427064, 21.556464980367483): "15003010201",
        (-159.48416846823164, 21.90754283544759): "15007040604",
    }
    df["GEOID10_TRACT"] = df.geometry.apply(
        lambda point: lookups[(point.x, point.y)]
    )
    return df


class TestAbandondedLandMineETL(TestETL):
    """Tests the Abandoned Mine Dataset ETL

    This uses pytest-snapshot.
    To update individual snapshots: $ poetry run pytest
            data_pipeline/tests/sources/eamlis/test_etl.py::TestClassNameETL::<testname>
            --snapshot-update
    """

    _ETL_CLASS = AbandonedMineETL

    _SAMPLE_DATA_PATH = pathlib.Path(__file__).parents[0] / "data"
    _SAMPLE_DATA_FILE_NAME = "eAMLIS export of all data.tsv"
    _SAMPLE_DATA_ZIP_FILE_NAME = "eAMLIS export of all data.tsv.zip"
    _EXTRACT_TMP_FOLDER_NAME = "AbandonedMineLandInventorySystem"

    def setup_method(self, _method, filename=__file__):
        """Invoke `setup_method` from Parent, but using the current file name.

        This code can be copied identically between all child classes.
        """
        super().setup_method(_method=_method, filename=filename)

    def test_init(self, mock_etl, mock_paths):
        """Tests that the mock NationalRiskIndexETL class instance was
        initiliazed correctly.
       """
        # setup
        etl = self._ETL_CLASS()
        # validation
        assert etl.GEOID_FIELD_NAME == "GEOID10"
        assert etl.GEOID_TRACT_FIELD_NAME == "GEOID10_TRACT"
        assert etl.NAME == "eamlis"
        assert etl.GEO_LEVEL == ValidGeoLevel.CENSUS_TRACT
        assert etl.COLUMNS_TO_KEEP == [
            etl.GEOID_TRACT_FIELD_NAME,
            etl.AML_BOOLEAN,
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
            "data_pipeline.etl.sources.eamlis.etl.add_tracts_for_geometries",
            new=_fake_add_tracts_for_geometries,
        ):
            return super().test_fixtures_contain_shared_tract_ids_base(
                mock_etl, mock_paths
            )

    def test_transform_base(self, snapshot, mock_etl, mock_paths):
        with mock.patch(
            "data_pipeline.etl.sources.eamlis.etl.add_tracts_for_geometries",
            new=_fake_add_tracts_for_geometries,
        ):
            super().test_transform_base(
                snapshot=snapshot, mock_etl=mock_etl, mock_paths=mock_paths
            )

    def test_transform_sets_output_df_base(self, mock_etl, mock_paths):
        with mock.patch(
            "data_pipeline.etl.sources.eamlis.etl.add_tracts_for_geometries",
            new=_fake_add_tracts_for_geometries,
        ):
            super().test_transform_sets_output_df_base(
                mock_etl=mock_etl, mock_paths=mock_paths
            )

    def test_validate_base(self, mock_etl, mock_paths):
        with mock.patch(
            "data_pipeline.etl.sources.eamlis.etl.add_tracts_for_geometries",
            new=_fake_add_tracts_for_geometries,
        ):
            super().test_validate_base(mock_etl=mock_etl, mock_paths=mock_paths)

    def test_full_etl_base(self, mock_etl, mock_paths):
        with mock.patch(
            "data_pipeline.etl.sources.eamlis.etl.add_tracts_for_geometries",
            new=_fake_add_tracts_for_geometries,
        ):
            return super().test_full_etl_base(mock_etl, mock_paths)

    def test_get_data_frame_base(self, mock_etl, mock_paths):
        with mock.patch(
            "data_pipeline.etl.sources.eamlis.etl.add_tracts_for_geometries",
            new=_fake_add_tracts_for_geometries,
        ):
            return super().test_get_data_frame_base(mock_etl, mock_paths)

    def test_tracts_without_fuds_not_in_results(self, mock_etl, mock_paths):
        with mock.patch(
            "data_pipeline.etl.sources.eamlis.etl.add_tracts_for_geometries",
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
