import { Schema, Document, model } from 'mongoose'
import * as mongoose from 'mongoose'

export interface IOrganization {
  name: string
  description: string
  structure?: string
  customerId: string
}

export default interface IOrganizationModel extends Document, IOrganization {}

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
    },
    description: {
      type: String,
      required: true,
      maxlength: 500,
    },
    structure: {
      type: String,
      required: false,
    },
    customerId: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer'},
  },
  {
    timestamps: true,
  },
)

export const Organization = model<IOrganizationModel>('Organization', schema)
