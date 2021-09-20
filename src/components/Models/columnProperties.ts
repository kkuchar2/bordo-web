import AutoFieldSerializer from "components/Models/fieldSerializers/AutoFieldSerializer";
import BooleanFieldSerializer from "components/Models/fieldSerializers/BooleanFieldSerializer";
import CharFieldSerializer from "components/Models/fieldSerializers/CharFieldSerializer";
import DateFieldSerializer from "components/Models/fieldSerializers/DateFieldSerializer";
import DateTimeFieldSerializer from "components/Models/fieldSerializers/DateTimeFieldSerializer";
import DecimalFieldSerializer from "components/Models/fieldSerializers/DecimalFieldSerializer";
import DefaultFieldSerializer from "components/Models/fieldSerializers/DefaultFieldSerializer";
import FileFieldSerializer from "components/Models/fieldSerializers/FileFieldSerializer";
import IntegerFieldSerializer from "components/Models/fieldSerializers/IntegerFieldSerializer";
import OneToOneFieldSerializer from "components/Models/fieldSerializers/OneToOneFieldSerializer";

/**
 * Serializing from Django field types to React components (in idle and editable state)
 */
export const columnProperties: { [index: string]: any } = {
    'IntegerField': {
        width: 150,
        padding: 0,
        fieldToComponentSerializer: IntegerFieldSerializer
    },
    'DecimalField': {
        width: 250,
        padding: 0,
        fieldToComponentSerializer: DecimalFieldSerializer
    },
    'CharField': {
        width: 300,
        padding: 0,
        fieldToComponentSerializer: CharFieldSerializer
    },
    'BooleanField' : {
        width: 220,
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
};

export const getColumnProperties = ((type: string) => columnProperties[type in columnProperties ? type : 'Default']);