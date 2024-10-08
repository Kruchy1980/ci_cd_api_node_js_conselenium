// 1. Import pactum to project -- new attitude
import pkg from 'pactum'; // -- import pkg from pactum for later reassign it to the npm 
const { spec } = pkg// 2. Import chai yo ptojrvcy fot test
import { expect } from 'chai';
import { baseURL, userID, userName, secretPassword } from '../helpers/data.js';
let token;
let bookISBN;

describe('API tests', () => {
    it.skip('Get All Books', async () => {
        const response = await spec().get(`${baseURL}/BookStore/v1/Books`).inspect();
        // console.log(response.body);
        expect(response.statusCode).to.eql(200);
        for (let i = 0; i < response.body.books.length; i++) {
            expect(response.body[0].books[i].author).to.eql("Kyle Simpson");
        }
    });
    it.skip('first test', async () => {
        const response = await spec()
            .post(`${baseURL}/Account/v1/User`)
            .inspect()
            .withBody({
                userName: userName,
                password: secretPassword,
            });
        expect(response.statusCode).to.eql(201);
    });
    it.skip('Add User', async () => {
        const response = await spec()
            .post(`${baseURL}/Account/v1/User`)
            .withBody({
                userName: userName,
                password: secretPassword,
            });
        expect(response.statusCode).to.eql(201);
    });
    it('generate Token', async () => {
        const response = await spec()
            .post(`${baseURL}/Account/v1/GenerateToken`)
            // .inspect()
            .withBody({
                userName: userName,
                password: secretPassword,
            });
        token = response.body.token;
        // console.log(token);
        expect(response.statusCode).to.eql(200)
    });

    it('Authorized', async () => {
        // console.log(token);
        const response = await spec()
            .post(`${baseURL}/Account/v1/Authorized`)
            // .inspect()
            .withBody({
                userName: userName,
                password: secretPassword,
            });
        // console.log(response.body);
        expect(response.statusCode).to.eql(200)
    });

    it('Get UserId', async () => {
        // console.log(token);
        const response = await spec()
            .get(`${baseURL}/Account/v1/User/${userID}`)
            // .inspect()
            .withBearerToken(token);
        // console.log(response.body);
        expect(response.statusCode).to.eql(200)
    });

    it('Get All Books', async () => {
        // console.log(token);
        const response = await spec()
            .get(`${baseURL}/Account/v1/User/${userID}`)
            // .inspect()
            .withBearerToken(token);
        // console.log(response.body);
        expect(response.statusCode).to.eql(200)
    });

    it('Add The Book', async () => {
        // console.log(token);
        const response = await spec()
            .post(`${baseURL}/BookStore/v1/Books`)
            // .inspect()
            .withBearerToken(token)
            .withBody({
                userId: userID,
                collectionOfIsbns: [
                    {
                        isbn: "9781449331818"
                    }
                ]
            });

        bookISBN = response.body.isbn;
        console.log(bookISBN);
        expect(response.statusCode).to.eql(201)
    });
    it('Get the book', async () => {
        console.log(bookISBN);
        const response = await spec()
            .get(`${baseURL}/BooksStore/v1/Book`)
            // .inspect()
            .withBearerToken(token)
            .withBody({
                isbn: `${bookISBN}`,
            });
        console.log(response.body);
        expect(response.statusCode).to.eql(200)
    });

    it('Delete the user\s book', async () => {
        console.log(bookISBN);
        const response = await spec()
            .delete(`${baseURL}/BooksStore/v1/Book`)
            // .inspect()
            .withBearerToken(token)
            .withBody({
                isbn: bookISBN,
                userId: userID,
            });
        console.log(response.body);
        expect(response.statusCode).to.eql(200)
    });
    it('Delete user books', async () => {
        // console.log(bookISB);
        const response = await spec()
            .delete(`${baseURL}/BooksStore/v1/Books`)
            .withQueryParams('UserId', userID)
            .inspect()
            .withBearerToken(token)

        console.log(response.body);
        expect(response.statusCode).to.eql(204)
    });


})
