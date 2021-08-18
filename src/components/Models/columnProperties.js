import AutoFieldSerializer from "components/Models/fieldSerializers/AutoFieldSerializer.jsx";
import BooleanFieldSerializer from "components/Models/fieldSerializers/BooleanFieldSerializer.jsx";
import CharFieldSerializer from "components/Models/fieldSerializers/CharFieldSerializer.jsx";
import DateFieldSerializer from "components/Models/fieldSerializers/DateFieldSerializer.jsx";
import DateTimeFieldSerializer from "components/Models/fieldSerializers/DateTimeFieldSerializer.jsx";
import DecimalFieldSerializer from "components/Models/fieldSerializers/DecimalFieldSerializer.jsx";
import DefaultFieldSerializer from "components/Models/fieldSerializers/DefaultFieldSerializer.jsx";
import FileFieldSerializer from "components/Models/fieldSerializers/FileFieldSerializer.jsx";
import IntegerFieldSerializer from "components/Models/fieldSerializers/IntegerFieldSerializer.jsx";
import OneToOneFieldSerializer from "components/Models/fieldSerializers/OneToOneFieldSerializer.jsx";
import React from "react";

/**
 * Serializing from Django field types to React components (in idle and editable state)
 */
export const columnProperties = {
    'IntegerField' : {
        width: 150,
        padding: 0,
        fieldToComponentSerializer: IntegerFieldSerializer
    },
    'DecimalField' : {
        width: 250,
        padding: 0,
        fieldToComponentSerializer: DecimalFieldSerializer
    },
    'CharField' : {
        width: 250,
        padding: 0,
        fieldToComponentSerializer: CharFieldSerializer
    },
    'BooleanField' : {
        width: 120,
        padding: 0,
        fieldToComponentSerializer: BooleanFieldSerializer
    },
    'FileField' : {
        width: 120,
        padding: 20,
        fieldToComponentSerializer: FileFieldSerializer
    },
    'DateTimeField': {
        width: 300,
        padding: 20,
        fieldToComponentSerializer: DateTimeFieldSerializer
    },
    'DateField': {
        width: 200,
        padding: 0,
        fieldToComponentSerializer: DateFieldSerializer
    },
    'AutoField': {
        width: 50,
        padding: 0,
        fieldToComponentSerializer: AutoFieldSerializer
    },
    'OneToOneField': {
        width: 100,
        padding: 0,
        fieldToComponentSerializer: OneToOneFieldSerializer
    },
    'Default' : {
        width: 300,
        padding: 20,
        fieldToComponentSerializer: DefaultFieldSerializer
    }
}

export const getColumnProperties = ((type) => columnProperties[type in columnProperties ? type : 'Default']);