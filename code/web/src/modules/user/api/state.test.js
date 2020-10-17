import userReducer from './state'
import { GET_USER_PRODUCTS } from './actions'

describe('UserReducer', () => {
    it('Should return the initial state', () => {
        const expected = [];

        const result = userReducer(undefined, {})
        
        expect(result.userProducts).toEqual(expected)
    })
    
    it('Should return updated state', () => {
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
        
        const action = { 
            type: GET_USER_PRODUCTS,
            userProducts 
        }
        const expected = userProducts
        const result = userReducer(undefined, action)

        expect(result.userProducts).toEqual(expected)
    })
})