import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authReducer';
import slideReducer from '../features/slideReducer';
import counterReducer from '../features/counter/counterSlice';
import CategoriesSlice from './categories-slice';
import { newsReducer } from '../features/newsReducer';

import { activitiesReducer } from '../features/activitiesReducer';

//Members
import { membersReducer } from '../features/membersReducer';

export default configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    slides: slideReducer,
    activities: activitiesReducer,
    members: membersReducer,
    categories: CategoriesSlice.reducer,
    news: newsReducer
  },
});
