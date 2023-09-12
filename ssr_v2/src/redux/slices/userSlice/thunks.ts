/* Instruments */
import { createAppAsyncThunk } from '@/redux/createAppAsyncThunk'
import UserService from '@/services/UserService'
import { IQueryProducts, IUserData } from '@/types'

// export const loginAsync = createAppAsyncThunk('user/loginAsync', async ({ email, password }: IUserData, thunkAPI) => {
//   try {
//     const response = await UserService.login(email, password)
//     Cookies.set('token', response.data.accessToken, {expires: 7})
//     return response.data.user
//     return response.data
//   } catch (error: any) {
//     return thunkAPI.rejectWithValue(`Error: ${error}`)
//   }
// })
// export const registrationAsync = createAppAsyncThunk('user/registrationAsync', async (, thunkAPI) => {
//     try {

//       return response.data
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(`Error: ${error}`)
//     }
//   })

//   export const refreshAsync = createAppAsyncThunk('user/refreshAsync', async (, thunkAPI) => {
//     try {

//       return response.data
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(`Error: ${error}`)
//     }
//   })

//   export const logoutAsync = createAppAsyncThunk('user/logoutAsync', async (, thunkAPI) => {
//     try {

//       return response.data
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(`Error: ${error}`)
//     }
//   })

export const getAllCategoryAsync = createAppAsyncThunk('user/getAllCategoryAsync', async (_, thunkAPI) => {
  try {
    const categories = await UserService.getAllCategory()
    console.log('getAllCategoryAsync', categories)

    return categories
  } catch (error: any) {
    return thunkAPI.rejectWithValue(`Error: ${error}`)
  }
})

export const getAllBrandAsync = createAppAsyncThunk('user/getAllBrandAsync', async (_, thunkAPI) => {
  try {
    const brands = await UserService.getAllBrand()

    return brands
  } catch (error: any) {
    return thunkAPI.rejectWithValue(`Error: ${error}`)
  }
})

export const getAllProductAsync = createAppAsyncThunk(
  'user/getAllProductAsync',
  async (query: IQueryProducts, thunkAPI) => {
    try {
      const products = await UserService.getAllProduct(query)

      return products
    } catch (error: any) {
      return thunkAPI.rejectWithValue(`Error: ${error}`)
    }
  },
)

export const getOneProductAsync = createAppAsyncThunk('user/getOneProductAsync', async (id: number, thunkAPI) => {
  try {
    const product = await UserService.getOneProduct(id)

    return product
  } catch (error: any) {
    return thunkAPI.rejectWithValue(`Error: ${error}`)
  }
})
