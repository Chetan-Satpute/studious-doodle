import {TypedUseSelectorHook, useSelector} from 'react-redux';

import {TReduxState} from '../redux/store';

export const useAppSelector: TypedUseSelectorHook<TReduxState> = useSelector;
