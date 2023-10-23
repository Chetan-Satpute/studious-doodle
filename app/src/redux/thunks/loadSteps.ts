import {apiCall} from '../../api';
import {SideBarView} from '../../components/SideBar/types';
import {IStep} from '../../lib/step';
import {changeSidebarView, setErrorMessage} from '../base/baseSlice';
import {TAppThunk} from '../store';
import {setSteps} from '../explore/exploreSlice';

interface GetStepsRequestBody {
  steps: IStep[];
}

export function loadSteps(id: string, totalSteps: number): TAppThunk {
  return async (dispatch, getState) => {
    for (let i = 10; i <= totalSteps; i += 10) {
      const {status, data} = (await apiCall(
        `/step/?id=${id}&start=${i}&end=${i + 9}`,
        'GET',
        null,
        dispatch
      )) as {
        status: number;
        data: GetStepsRequestBody;
      };

      if (status === 404) {
        dispatch(setErrorMessage('Session Expired! Please try again'));
        dispatch(changeSidebarView(SideBarView.Structure));
        return;
      }

      const {steps} = data;

      if (getState().explore.id === id) {
        dispatch(setSteps({steps, startIndex: i}));
      } else {
        return;
      }
    }
  };
}
