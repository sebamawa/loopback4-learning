import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Payment,
  Customer,
} from '../models';
import {PaymentRepository} from '../repositories';

export class PaymentCustomerController {
  constructor(
    @repository(PaymentRepository)
    public paymentRepository: PaymentRepository,
  ) { }

  @get('/payments/{id}/customer', {
    responses: {
      '200': {
        description: 'Customer belonging to Payment',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Customer)},
          },
        },
      },
    },
  })
  async getCustomer(
    @param.path.number('id') id: typeof Payment.prototype.id,
  ): Promise<Customer> {
    return this.paymentRepository.customer(id);
  }
}
