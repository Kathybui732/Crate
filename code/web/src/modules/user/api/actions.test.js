import { getUserProducts } from './actions'
import axios from 'axios'

jest.mock('axios')

describe('actions', () => {
    it.skip('creates GET_USER_PRODUCTS after successfully fetching products', async () => {
        const userProducts = [
            {
                name: 'Belt for Women',
                slug: 'belt-for-women',
                description: 'A very nice belt for women.',
                type: 1,
                gender: 1,
                image: '/images/stock/belt-female.jpg',
                createdAt: '1/1/2020',
                updatedAt: '1/1/2020'
            },
            {
                name: 'Watch for Women',
                slug: 'watch-for-women',
                description: 'A very nice watch for women.',
                type: 1,
                gender: 1,
                image: '/images/stock/watch-female.jpg',
                createdAt: '1/1/2020',
                updatedAt: '1/1/2020'
            },
        ];
        axios.post.mockImplementationOnce(() => Promise.resolve(userProducts))

        const expectedAction = {
            type: 'GET_USER_PRODUCTS',
            userProducts: userProducts
        }
        
        const result = getUserProducts('asdf12345')

        expect(result).toEqual(expectedAction)
    })
})