export const NotesSchema = {
  name:'NotesSchema',
  primaryKey:'id',
  properties:{
    id:'int',
    name:'string',
    content:'string',
    time:'date',
    colors:'string'
  }
};
