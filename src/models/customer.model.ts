import {Entity, model, property, hasMany} from '@loopback/repository';
import {Payment} from './payment.model';

@model()
export class Customer extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  phone?: string;

  @property({
    type: 'string',
  })
  address?: string;

  @hasMany(() => Payment)
  payments: Payment[];

  constructor(data?: Partial<Customer>) {
    super(data);
  }
}

export interface CustomerRelations {
  // describe navigational properties here
}

export type PruebaEliminarWithRelations = Customer & CustomerRelations;


