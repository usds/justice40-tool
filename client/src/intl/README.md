# Translating content to Spanish

## Keys without curly brackets
Navigate to the `es.json` file. This JSON file is grouped into pairs of keys. Namely an english key and regular key. Below we can see the first two keys of the `es.json` file.

```json
{
	"about.page.sub.header.1.text.1_english" : "On January 27, 2021, President Biden directed the Council on Environmental Quality (CEQ) to create a climate and economic justice screening tool. The purpose of the tool is to help Federal agencies identify disadvantaged communities and provide socioeconomic, environmental, and climate information and data to inform decisions that may affect these communities. The tool identifies disadvantaged communities as communities of focus through publicly available, nationally consistent, high-quality data.",
	"about.page.sub.header.1.text.1" : "El 27 de enero de 2021, President Biden directed the Council on Environmental Quality (CEQ) to create a climate and economic justice screening tool. The purpose of the tool is to help Federal agencies identify disadvantaged communities and provide socioeconomic, environmental, and climate information and data to inform decisions that may affect these communities. The tool identifies disadvantaged communities as communities of focus through publicly available, nationally consistent, high-quality data.",
}
```

The first key is the english key suffixed with `_english`. The second key has no suffix and is meant to hold the Spanish translation. These translations are WYSIWYG.

## Keys with curly brackets

There are some keys with curly brackets, for example, line 176 of `es.json`:

```json
{
	"download.draft.ptag.1_english" : "{downloadDraft} of communities of focus and datasets used. Last updated: {dateUpdated}.",
	"download.draft.ptag.1" : "",
}
```

In this case, this first step is find out what the English sentence is:

![image info](/client/src/images/downloadDraftLink.png)

The reason the `{downloadDraft}` and `{dateUpdated}` are in curly brackets is because something special happens with that text. In the former it's a link in the latter it's a variable that being used in multiple places. 

Let's assume that this sentence translates to Spanish as

_Descargue la lista preliminar de comunidades de interés y conjuntos de datos utilizados. Última actualización: 01/10/21._

And let's say we want `Descargue la lista preliminar` to be a link. Then, we would place the following as the translated content:

```json
{
	"download.draft.ptag.1_english" : "{downloadDraft} of communities of focus and datasets used. Last updated: {dateUpdated}.",
	"download.draft.ptag.1" : "`{downloadDraftEs} de comunidades de interés y conjuntos de datos utilizados. Última actualización: {dateUpdatedEs}.`",
}
```

Where `downloadDraftEs` = _Descargue la lista preliminar_ and `dateUpdatedEs`= _01/10/21_

TBD: How should these curly bracket variables be communicated to the dev team?
