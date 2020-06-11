import Realm from 'realm';
import {NotesSchema} from './NotesSchema';

const SCHEMA_VERSION = 1;
export default class Schema {
  constructor() {
    this.realm = new Realm({
      schema: [NotesSchema],
      schemaVersion: SCHEMA_VERSION,
      migration: ((oldRealm, newRealm) => {
      }),
    });
  }

  create(schema, array, callback) {
    try {
      if (array && !Array.isArray(array)) {
        array = [array];
      }
      this.realm.write(() => {
        for (let i = 0; i < array.length; i++) {
          this.realm.create(schema, array[i], Realm.UpdateMode.All);
        }
      });
      callback(true);
    } catch (e) {
      callback(false);
    }
  }

  read(schema, filter, sort) {
    let array = this.realm.objects(schema);
    if (filter) {
      array = array.filtered(filter);
    }
    if (sort) {
      array = array.sorted(sort);
    }
    return Array.from(array);
  }

  update(callback) {
    this.realm.write(() => {
      callback();
    });
  }

  delete(schema, filter, sort) {
    this.realm.write(() => {
      let array = this.realm.objects(schema);
      if (filter) {
        array = array.filtered(filter);
      }
      if (sort) {
        array = array.sorted(sort);
      }
      this.realm.delete(array);
    });
  }

  clear() {
    this.realm.write(() => {
      this.realm.deleteAll();
    });
  }

  count(schema, filter) {
    return this.read(schema, filter).length;
  }

  remove(object, callback) {
    try {
      this.realm.write(() => {
        this.realm.delete(object);
      });
      callback(true);
    } catch (e) {
      callback(false);
    }
  }
}

