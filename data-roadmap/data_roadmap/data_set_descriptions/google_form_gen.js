function createForm() {
  var item = "Justice 40 Data Set Submission";
  var form = FormApp.create(item).setTitle(item);

  var item = "Data Set Name";
  form.addTextItem().setTitle(item).setRequired(true);

  var item = "Data Set Source Full URL";
  form.addTextItem().setTitle(item).setRequired(true);

  var item = "Relevance to Environmental Justice";
  form.addTextItem().setTitle(item).setRequired(false);

  var item = "Data Formats";
  choices = [
    "GeoJSON",
    "Esri Shapefile (SHP, DBF, SHX)",
    "GML",
    "KML/KMZ",
    "GPX",
    "CSV/XLSX",
    "GDB",
    "MBTILES",
    "LAS",
    "Other",
  ];
  form
    .addMultipleChoiceItem()
    .setTitle(item)
    .setChoiceValues(choices)
    .setRequired(true);

  var item = "Spatial Resolution";
  var choices = [
    "State/territory",
    "County",
    "Zip code",
    "Census tract",
    "Census block group",
    "Exact address or lat/long",
    "Other",
  ];
  form
    .addMultipleChoiceItem()
    .setTitle(item)
    .setChoiceValues(choices)
    .setRequired(true);

  var item = "Public Status";
  var choices = [
    "Not Released",
    "Public",
    "Public for certain audiences",
    "Other",
  ];
  form
    .addMultipleChoiceItem()
    .setTitle(item)
    .setChoiceValues(choices)
    .setRequired(true);

  var item = "Sponsor";
  form.addTextItem().setTitle(item).setRequired(true);

  var item = "Subjective Rating of Data Quality";
  var choices = ["Low Quality", "Medium Quality", "High Quality"];
  form
    .addMultipleChoiceItem()
    .setTitle(item)
    .setChoiceValues(choices)
    .setRequired(false);

  var item = "Estimated Margin of Error";
  var textItem = form.addTextItem().setTitle(item).setRequired(false);
  var textValidation = FormApp.createTextValidation()
    .setHelpText("Input was not a number between 1 and 100.")
    .requireNumberBetween(1, 100)
    .build();
  textItem.setValidation(textValidation);

  var item = "Known Data Quality Issues";
  form.addParagraphTextItem().setTitle(item).setRequired(false);

  var item = "Geographic Coverage Percent";
  var textItem = form.addTextItem().setTitle(item).setRequired(false);
  var textValidation = FormApp.createTextValidation()
    .setHelpText("Input was not a number between 1 and 100.")
    .requireNumberBetween(1, 100)
    .build();
  textItem.setValidation(textValidation);

  var item = "Geographic Coverage Description";
  form.addParagraphTextItem().setTitle(item).setRequired(false);

  var item = "Last Updated Date";
  form.addDateItem().setTitle(item).setRequired(true);

  var item = "Frequency of Updates";
  var choices = [
    "Less than annually",
    "Approximately annually",
    "Once very 1-6 months",
    "Daily or more frequently than daily",
    "Unknown",
  ];
  form
    .addMultipleChoiceItem()
    .setTitle(item)
    .setChoiceValues(choices)
    .setRequired(true);

  var item = "Documentation";
  form.addParagraphTextItem().setTitle(item).setRequired(false);

  var item = "Data can go in Cloud";
  var choices = ["Yes", "No"];
  form
    .addMultipleChoiceItem()
    .setTitle(item)
    .setChoiceValues(choices)
    .setRequired(false);

  var item = "Discussion";
  form.addParagraphTextItem().setTitle(item).setRequired(false);

  var random_id = Utilities.getUuid();
  var ss = SpreadsheetApp.create(
    "Justice 40 Data Set Subnmissions - version: " + random_id
  );
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
}
