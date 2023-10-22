import {apiCall} from '../../api';
import {SideBarView} from '../../components/SideBar/types';
import {IFrame} from '../../lib/frame';
import {IStep} from '../../lib/step';
import {changeSidebarView} from '../base/baseSlice';
import {initExploreFunction} from '../explore/exploreSlice';
import {TAppThunk} from '../store';
import {updateStructure} from '../structure/structureSlice';
import {loadSteps} from './loadSteps';

interface PostRunFunctionRequestBody {
  id: string;
  structureFrame: IFrame;
  structureData: unknown;
  steps: IStep[];
  totalSteps: number;
  codeMap: Record<string, string>;
}

export function runFunction(functionId: string, animated: boolean): TAppThunk {
  return async (dispatch, getState) => {
    dispatch(changeSidebarView(SideBarView.Loading));

    const state = getState();
    const {structure, structureData, functionList} = state.structure;
    const func = functionList.find(f => f.id === functionId);

    if (!func) {
      return;
    }

    const body = {
      structure: structure,
      structureData: structureData,
      functionId: functionId,
      args: func.args,
      animated: animated,
    };

    const {data} = (await apiCall('/', 'POST', body, dispatch)) as {
      status: number;
      data: PostRunFunctionRequestBody;
    };

    dispatch(
      updateStructure({
        structureData: data.structureData,
        structureFrame: data.structureFrame,
      })
    );

    if (animated) {
      dispatch(
        initExploreFunction({
          id: data.id,
          totalSteps: data.totalSteps,
          steps: data.steps,
          codeMap: data.codeMap,
        })
      );

      dispatch(loadSteps(data.id, data.totalSteps));

      dispatch(changeSidebarView(SideBarView.Explore));
    } else {
      dispatch(changeSidebarView(SideBarView.Structure));
    }
  };
}
