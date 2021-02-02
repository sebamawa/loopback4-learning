import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Customer,
  Payment,
} from '../models';
import {CustomerRepository} from '../repositories';

export class CustomerPaymentController {
  constructor(
    @repository(CustomerRepository) protected customerRepository: CustomerRepository,
  ) { }

  @get('/customers/{id}/payments', {
    responses: {
      '200': {
        description: 'Array of Customer has many Payment',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Payment)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Payment>,
  ): Promise<Payment[]> {
    return this.customerRepository.payments(id).find(filter);
  }

  @post('/customers/{id}/payments', {
    responses: {
      '200': {
        description: 'Customer model instance',
        content: {'application/json': {schema: getModelSchemaRef(Payment)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Customer.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Payment, {
            title: 'NewPaymentInCustomer',
            exclude: ['id'],
            optional: ['customerId']
          }),
        },
      },
    }) payment: Omit<Payment, 'id'>,
  ): Promise<Payment> {
    return this.customerRepository.payments(id).create(payment);
  }

  @patch('/customers/{id}/payments', {
    responses: {
      '200': {
        description: 'Customer.Payment PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Payment, {partial: true}),
        },
      },
    })
    payment: Partial<Payment>,
    @param.query.object('where', getWhereSchemaFor(Payment)) where?: Where<Payment>,
  ): Promise<Count> {
    return this.customerRepository.payments(id).patch(payment, where);
  }

  @del('/customers/{id}/payments', {
    responses: {
      '200': {
        description: 'Customer.Payment DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Payment)) where?: Where<Payment>,
  ): Promise<Count> {
    return this.customerRepository.payments(id).delete(where);
  }
}
