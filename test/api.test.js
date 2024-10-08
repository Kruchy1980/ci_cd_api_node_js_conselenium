// 1. Import pactum to project -- new attitude
import pkg from 'pactum'; // -- import pkg from pactum for later reassign it to the npm 
const {spec} = pkg// 2. Import chai yo ptojrvcy fot test
import {expect} from 'chai';

describe('API tests', () => {
    it('first test', async () => {
        const response = await spec().get('https://demoqa.com/BookStore/v1/Books');
        console.log(response.body);
        expect(response.statusCode).to.eql(200); 
    })
})
