import {SideBarView} from '../../components/SideBar/types';
import {changeSidebarView} from '../base/baseSlice';
import {resetExplore} from '../explore/exploreSlice';
import {TAppThunk} from '../store';

export function stopExplore(): TAppThunk {
  return async dispatch => {
    dispatch(changeSidebarView(SideBarView.Structure));
    dispatch(resetExplore());
  };
}
