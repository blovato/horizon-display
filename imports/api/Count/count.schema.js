import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const CountSchema = new SimpleSchema({
  _id: {
    type: SimpleSchema.RegEx.Id,
    optional: true,
  },
  count: {
    type: Number,
  },
  createdAt: {
    type: Date,
    label: 'Created At',
  },
  modifiedAt: {
    type: Date,
    label: 'Modified At',
    optional: true,
  },
});
