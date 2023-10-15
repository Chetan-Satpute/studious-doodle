import {useDispatch} from 'react-redux';

import {TAppDispatch} from '../redux/store';

export const useAppDispatch: () => TAppDispatch = useDispatch;
