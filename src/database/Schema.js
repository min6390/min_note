import Realm from 'realm';
import {NotesSchema} from './NotesSchema';

const SCHEMA_VERSION = 0;
export default class Schema {
  constructor() {
    this.realm = new Realm({
      schema: [NotesSchema],
      schemaVersion: SCHEMA_VERSION,
      migration: ((oldRealm, newRealm) => {
      }),
    });
  }
}
