function createForm() {
  var form = FormApp.openByUrl(
    "https://docs.google.com/forms/d/1Kb9Hl82I9kPJhqS_3bQDbWWvzCxPDTZBaI7_Eo6339E/edit"
  );
  var items = form.getItems();
  while (items.length > 0) {
    form.deleteItem(items.pop());
  }

  var item = "Justice 40 Data Set Submission";
  var form = form.setTitle(item);

  var description =
    "Thank you for participating in the Justice40 open data roadmap! Use this form to submit individual data sets to be considered for the data roadmap of the Justice40 Climate and Environmental Justice Screening Tool. Once the data set is submitted, you can view it in our submission tracking spreadsheet here (https://docs.google.com/spreadsheets/d/14Zwja62gbrZErhf70lo-I2ode85O-XZC1NKA7bEV6Bk/edit?resourcekey#gid=546636493).\n\nPlease try to fill out as many of the details below as possible for the data set you are submitting. If you do not know the value for a given field, you can leave it blank, and someone from our team or from the open source community will help research to figure it out and will update the spreadsheet accordingly. Instructions for suggesting updates to the spreadsheet are available in the second tab of the spreadsheet. Once a data set has been fully researched, the White House Environment Justice Advisory Council (WHEJAC) will collaborate to determine whether and how to prioritize the data set for inclusion in the tool.\n\nIf you have any questions, please email us at justice40open@usds.gov.";
  form.setDescription(description);

  var item = "Data Set Name";
  var description = "A short name for the data set.";
  form.addTextItem().setTitle(item).setHelpText(description).setRequired(true);

  var item = "Data Set Source Full URL";
  var description = "The URL / website where this data set can be found.";
  form.addTextItem().setTitle(item).setHelpText(description).setRequired(true);

  var item = "Relevance to Environmental Justice";
  var description =
    "Reason(s) why this data set is important for the environmental justice community (e.g. helps identify an EJ community)";
  form.addTextItem().setTitle(item).setHelpText(description).setRequired(false);

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
    "Not Sure",
    "Other",
  ];
  form
    .addMultipleChoiceItem()
    .setTitle(item)
    .setChoiceValues(choices)
    .setRequired(false);

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
  var description = "How specific does this data set get?";
  form
    .addMultipleChoiceItem()
    .setTitle(item)
    .setChoiceValues(choices)
    .setHelpText(description)
    .setRequired(false);

  var item = "Public Status";
  var choices = [
    "Not Released",
    "Public",
    "Public for certain audiences",
    "Other",
  ];
  var description = "Has this data set gone through a public release process?";
  form
    .addMultipleChoiceItem()
    .setTitle(item)
    .setChoiceValues(choices)
    .setHelpText(description)
    .setRequired(false);

  var item = "Sponsor";
  var description =
    "Who is providing and maintaining this data? (e.g. a federal agency, a specific organization)";
  form.addTextItem().setTitle(item).setHelpText(description).setRequired(false);

  var item = "Subjective Rating of Data Quality";
  var description = "Has this data set been vetted?";
  var choices = ["Low Quality", "Medium Quality", "High Quality"];
  form
    .addMultipleChoiceItem()
    .setTitle(item)
    .setHelpText(description)
    .setChoiceValues(choices)
    .setRequired(false);

  var item = "Estimated Margin of Error";
  var description =
    "Estimated margin of error on measurement, if known. (1-100)";
  var textItem = form
    .addTextItem()
    .setTitle(item)
    .setHelpText(description)
    .setRequired(false);
  var textValidation = FormApp.createTextValidation()
    .setHelpText("Input was not a number between 1 and 100.")
    .requireNumberBetween(1, 100)
    .build();
  textItem.setValidation(textValidation);

  var item = "Known Data Quality Issues";
  var description = "Are there any known issues with this data set?";
  form
    .addParagraphTextItem()
    .setTitle(item)
    .setHelpText(description)
    .setRequired(false);

  var item = "Geographic Coverage Percent (1-100)";
  var description =
    "What percentage of the United States and US territories does this data set cover? This can be an estimate.";
  var textItem = form
    .addTextItem()
    .setTitle(item)
    .setHelpText(description)
    .setRequired(false);
  var textValidation = FormApp.createTextValidation()
    .setHelpText("Input was not a number between 1 and 100.")
    .requireNumberBetween(1, 100)
    .build();
  textItem.setValidation(textValidation);

  var item = "Geographic Coverage Description";
  var description = "Tell us more about the geographic coverage.";
  form
    .addParagraphTextItem()
    .setTitle(item)
    .setHelpText(description)
    .setRequired(false);

  var item = "Last Updated Date";
  var description = "When was the data last updated or refreshed?";
  form.addDateItem().setTitle(item).setHelpText(description).setRequired(false);

  var item = "Frequency of Updates";
  var description = "How often is this data updated?";
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
    .setHelpText(description)
    .setChoiceValues(choices)
    .setRequired(false);

  var item = "Documentation";
  var description = "Please include any links to documentation.";
  form
    .addParagraphTextItem()
    .setTitle(item)
    .setHelpText(description)
    .setRequired(false);

  var item = "Can data go in the cloud?";
  var choices = ["Yes", "No"];
  var description = "Some datasets can not legally go in the cloud";
  form
    .addMultipleChoiceItem()
    .setTitle(item)
    .setHelpText(description)
    .setChoiceValues(choices)
    .setRequired(false);

  var item = "Additional Information";
  var description =
    "Please include additional information around peer review, data availability (is it available from multiple sources?), any legal considerations, accreditation, etc.";
  form
    .addParagraphTextItem()
    .setTitle(item)
    .setHelpText(description)
    .setRequired(false);

  var item = "Email address of submitter";
  var description =
    "If you would like for us to contact you for any followups. Note: your email will be visible by others.";
  form
    .addParagraphTextItem()
    .setTitle(item)
    .setHelpText(description)
    .setRequired(false);

  var ss = SpreadsheetApp.openByUrl(
    "https://docs.google.com/spreadsheets/d/14Zwja62gbrZErhf70lo-I2ode85O-XZC1NKA7bEV6Bk/edit"
  );
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
}
